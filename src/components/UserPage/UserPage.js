import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import BookItem from "../BookItem/BookItem";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Library extends Component {
  state = {
    friendSearch: "",
  };
  //// gets all data for render on mount
  componentDidMount = () => {
    this.getLibrary();
    this.clearFriendSearch();
    this.getFriendList();
  };
  //// add function for friend search
  addFriend = () => {
    this.props.dispatch({
      type: "ADD_FRIEND",
      payload: this.props.store.friend,
    });
    alert("Friend Added.");
  };
  //// clears friend search results
  clearFriendSearch = () => {
    this.props.dispatch({
      type: "GET_FRIEND",
      payload: {},
    });
  };
  //// gets friend list from DB
  getFriendList = () => {
    this.props.dispatch({ type: "GET_FRIEND_LIST" });
  };
  //// get library from DB
  getLibrary = () => {
    this.props.dispatch({ type: "GET_LIBRARY" });
  };
  //// listens to friend search input
  handleChange = (event) => {
    this.setState({
      friendSearch: event.target.value,
    });
  };
  //// checks friend search input for empty string and dispatches to DB to
  // search user table for matches
  handleSubmit = () => {
    if (this.state.friendSearch !== "") {
      this.props.dispatch({
        type: "GET_FRIEND",
        payload: this.state.friendSearch,
      });
    } else {
      alert("Please enter a username.");
    }
  };

  render() {
    return (
      <>
        <div id="friendSearch">
          <input
            placeholder="Search for user"
            onChange={(event) => this.handleChange(event)}
          />
          <button
            className="button is-small is-light"
            onClick={this.handleSubmit}
          >
            Search
          </button>
          {this.props.store.friend.username ? (
            <>
              <p>Is this the user you were looking for?</p>
              <p>
                {this.props.store.friend.username}{" "}
                <button
                  className="button is-primary is-small is-light"
                  onClick={this.addFriend}
                >
                  Add
                </button>
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
        {/* <div id="friendList">
          {this.props.store.friendList[0] ?
          <>
          {this.props.store.friendList.map((friend) => {
            return <p>{friend.username}</p>;
          })}
          </>
          :
          <></>
        }
        </div> */}
        <div>
          <p>{this.props.store.user.username}'s Library</p>
          <br />
          <br />
          <br />
          {this.props.store.library[0] ? (
            <ul>
              {this.props.store.library.map((book) => {
                return <BookItem id={book.id} book={book} />;
              })}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

// If you needed to add local state or other things,
// you can make it a class component like:

/*
class InfoPage extends React.Component {

  render() {
    return (
      <div>
        <p>Info Page</p>
      </div>
    )
  }
}
*/
export default connect(mapStoreToProps)(Library);
