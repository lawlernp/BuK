import React, { Component } from "react";
import { connect } from "react-redux";
// import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from "../../redux/mapStoreToProps";
import Scanner from "../Scanner/Scanner";

class AddBook extends Component {
  state = {
    search: false,
    camera: false,
    newBook: {
      title: "",
      author: "",
      comments: "",
      imageUrl: "",
      publish_date: "",
    },
    isbn: "",
  };
  //// this bundles up the data from the OpenLibrary API get and sends it off to
  // save in the DB
  handleCameraAdd = () => {
    const book = this.props.store.book;
    const newBook = {
      title: book.title,
      author: book.authors[0].name,
      imageUrl: book.cover.large,
      publish_date: book.publish_date,
    };
    this.props.dispatch({ type: "ADD_BOOK", payload: newBook });
    alert("Book Added");
    this.props.dispatch({ type: "UNSET_BOOK" });
  };
  //// this listens for changes in the manual input section and assigns
  // them to state
  handleChange = (event, eventType) => {
    this.setState({
      newBook: {
        ...this.state.newBook,
        [eventType]: event.target.value,
      },
    });
    console.log(this.state.newBook);
  };
  //// handles dispatching isbn manual search to hit the OpenLibrary API
  handleSearch = () => {
    if (this.state.isbn !== "") {
      this.props.dispatch({
        type: "GET_BOOK",
        payload: this.state.isbn,
      });
    } else {
      alert("Please enter a number.");
    }
  };
  //// listens to the manual ISBN seach input and sets changes to state
  handleSearchChange = (event) => {
    this.setState({
      isbn: event.target.value,
    });
  };
  //// handles dispatching for manual book add, checking for empty values
  handleSubmit = () => {
    if (
      this.state.newBook.title !== "" &&
      this.state.newBook.author !== "" &&
      this.state.newBook.imageUrl !== ""
    ) {
      this.props.dispatch({ type: "ADD_BOOK", payload: this.state.newBook });
      alert("Book Added");
      this.props.history.push("/user");
    } else {
      alert("Please fill out all required fields");
    }
  };
  //// handles toggle of camera search
  toggleCamera = () => {
    this.setState({
      camera: !this.state.camera,
    });
  };
  //// handles toggle of search function
  toggleSearch = () => {
    this.setState({
      search: !this.state.search,
      camera: false,
    });
  };

  render() {
    return (
      <div className="body">
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <br />
        <p>Add Books Here</p>
        <br />
        {!this.state.search ? (
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
                required
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
            </form>
            <button
              className="button"
              type="submit"
              value="Add Book"
              onClick={this.handleSubmit}
            >
              Add Book Directly
            </button>
          </>
        ) : (
          <></>
        )}
        <br />
        <br />
        {!this.state.search ? (
          <>
            <p>OR</p>
            <br />
            <button className="button" onClick={this.toggleSearch}>
              Search By ISBN?
            </button>
          </>
        ) : (
          <></>
        )}
        {this.state.search ? (
          <>
            <p>Searching by ISBN</p>
            <br />
          </>
        ) : (
          <></>
        )}

        {this.state.search && !this.state.camera ? (
          <>
            <input placeholder="ISBN" onChange={this.handleSearchChange} />

            <button className="button" onClick={this.handleSearch}>
              Search
            </button>

            <button id="camera" className="button" onClick={this.toggleCamera}>
              Use Camera?
            </button>
          </>
        ) : (
          <></>
        )}

        {this.state.search && this.state.camera ? (
          <>
            <Scanner />{" "}
            <button id="camera" className="button" onClick={this.toggleCamera}>
              Disable Camera
            </button>
          </>
        ) : (
          <></>
        )}
        <br />

        {this.props.store.book.title && this.state.search ? (
          <>
            <p>Is this the book you are looking for?</p>
            <p>{this.props.store.book.title}</p>
            <p>By: {this.props.store.book.authors[0].name}</p>
            {this.props.store.book.cover ? (
              <img
                width="150px"
                alt={this.props.store.book.title}
                src={this.props.store.book.cover.large}
              ></img>
            ) : (
              <></>
            )}
            <button className="button" onClick={this.handleCameraAdd}>
              Add Book
            </button>
            <br />
          </>
        ) : (
          <></>
        )}

        {this.state.search ? (
          <footer>
            <p> Want to add book manually?</p>
            <button className="button" onClick={this.toggleSearch}>
              Go Back
            </button>
          </footer>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AddBook);
