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

  componentDidMount = () => {
    this.getLibrary();
    this.clearFriendSearch();
  };

  getLibrary = () => {
    this.props.dispatch({ type: "GET_LIBRARY" });
  };

  handleChange = (event) => {
    this.setState({
      friendSearch: event.target.value,
    });
  };

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

  clearFriendSearch = () => {
    this.props.dispatch({
      type: "GET_FRIEND",
      payload: {},
    });
  };

  addFriend = () => {
    this.props.dispatch({
      type: "ADD_FRIEND",
      payload: this.props.store.friend,
    });
    alert("Friend Added.");
  };

  render() {
    return (
      <>
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
