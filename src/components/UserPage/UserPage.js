import React, { Component } from "react";
import { connect } from "react-redux";
// import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from "../../redux/mapStoreToProps";
import Scanner from "../Scanner/Scanner";

class UserPage extends Component {
  state = {
    camera: false,
    newBook: {
      title: "",
      author: "",
      comments: "",
      imageUrl: "",
    },
  };

  handleChange = (event, eventType) => {
    this.setState({
      newBook: {
        ...this.state.newBook,
        [eventType]: event.target.value,
      },
    });
    console.log(this.state.newBook);
    
  };

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.dispatch({ type: "ADD_BOOK", payload: this.state.newBook });

  }

  toggleCamera = () => {
    this.setState({
      camera: !this.state.camera,
    });
  };

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div className="body">
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        {/* <LogOutButton className="log-in" /> */}
        <button id="camera" className="button" onClick={this.toggleCamera}>
          Use Camera?
        </button>

        {!this.state.camera ? (
          <>
            <form>
              <label htmlFor="addTitle">Title:</label>
              <input
                onChange={(event) => this.handleChange(event, "title")}
                name="addTitle"
                placeholder="Title"
                required
              />
              <br />
              <label htmlFor="addAuthor">Author:</label>
              <input
                onChange={(event) => this.handleChange(event, "author")}
                name="addAuthor"
                placeholder="Author"
                required
              />
              <br />
              <label htmlFor="imageAdd">Link to image of cover:</label>
              <br />
              <input
                onChange={(event) => this.handleChange(event, "imageUrl")}
                name="imageAdd"
                placeholder="Image URL"
              />
              <br />
              <label htmlFor="addTitle">Comments:</label>
              <br />
              <textarea
                className="text"
                onChange={(event) => this.handleChange(event, "comments")}
                id="addTitle"
                name="addTitle"
                placeholder="Comments"
                rows="4"
                cols="35"
              />
              <input type="submit" value="Add Book" onClick={() => this.handleSubmit}></input>
            </form>
          </>
        ) : (
          <Scanner />
        )}
        <br />
        <br />
        {this.props.store.book.cover ? (
          <>
            <p>Is this the book you are looking for?</p>
            <p>{this.props.store.book.title}</p>
            <img src={this.props.store.book.cover.large}></img>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
