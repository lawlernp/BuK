import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class BookItem extends Component {
  state = {
    editToggle: false,
    book: {
      title: this.props.book.title,
      author: this.props.book.author,
      comments: this.props.book.comments,
      imageUrl: this.props.book.imageUrl,
      publish_date: this.props.book.publish_date,
      id: this.props.book.id,
    },
  };
  //// listens to edit book inputs and sets changes to state
  handleChange = (event, eventType) => {
    this.setState({
      book: {
        ...this.state.book,
        [eventType]: event.target.value,
      },
    });
    console.log(this.state.book);
  };
  //// dispatches any changes to checkout dropdown for record in DB
  handleCheckoutChange = (event) => {
    const checkout = {
      id: this.props.book.id,
      user: event.target.value,
    };
    if (event.target.value !== "") {
      this.props.dispatch({
        type: "CHECKOUT_BOOK",
        payload: checkout,
      });
    }
  };
  //// toggles edit inputs
  handleEditToggle = () => {
    this.setState({
      editToggle: !this.state.editToggle,
    });
  };
  //// dispatches a delete for current book
  handleDelete = () => {
    this.props.dispatch({ type: "DELETE_BOOK", payload: this.props.book.id });
  };
  //// returns book to user's library
  returnBook = () => {
    const checkout = {
      id: this.props.book.id,
      user: this.props.store.user.id,
    };
    this.props.dispatch({
      type: "CHECKOUT_BOOK",
      payload: checkout,
    });
  };
  //// checks for empty inputs and submits edits to book to DB
  submitEdit = () => {
    if (
      this.state.book.title !== "" &&
      this.state.book.author !== "" &&
      this.state.book.imageUrl !== ""
    ) {
      this.props.dispatch({
        type: "EDIT_BOOK",
        payload: this.state.book,
      });
      alert("Book Updated");
      this.setState({
        editToggle: false,
      });
    } else {
      alert("Please fill out all required fields");
    }
  };

  render() {
    return (
      <>
        <li id={this.props.book.id}>
          <div className="card">
            <div className="checkout">
              <img
                width="100px"
                src={this.props.book.imageUrl}
                alt={this.props.book.title}
              />
              <label htmlFor="users">Checkout to user:</label>
              <select
                onChange={(event) => this.handleCheckoutChange(event)}
                name="users"
                id="users"
              >
                <optgroup label="Users">
                  <option value="">Select here</option>
                  {this.props.store.friendList[0] ? (
                    <>
                      {this.props.store.friendList.map((friend) => {
                        return (
                          <option value={friend.id}>{friend.username}</option>
                        );
                      })}
                      {/* <button onClick= */}
                    </>
                  ) : (
                    <></>
                  )}
                </optgroup>
              </select>
            </div>
            {this.state.editToggle ? (
              <></>
            ) : (
              <>
                <p>
                  <h1 className="title">{this.props.book.title}</h1>
                  <h1 className="subtitle">
                    <span className="subtitle is-6">by: </span>
                    {this.props.book.author}
                  </h1>
                </p>
                <button
                  className="button is-small is-light"
                  onClick={this.handleEditToggle}
                >
                  Edit
                </button>
              </>
            )}

            {this.state.editToggle ? (
              <>
              <div>
                <input
                  name="title"
                  onChange={(event) => this.handleChange(event, "title")}
                  value={this.state.book.title}
                />
                <input
                  name="imageUrl"
                  onChange={(event) => this.handleChange(event, "imageUrl")}
                  value={this.state.book.imageUrl}
                />
                </div>
                <label className="subtitle is-6" htmlFor="author">
                  by:
                </label>
                <input
                  name="author"
                  onChange={(event) => this.handleChange(event, "author")}
                  value={this.state.book.author}
                />
                <button
                  className="button is-small is-light"
                  onClick={this.submitEdit}
                >
                  Confirm Edit
                </button>
                <button
                  className="button is-small is-light"
                  onClick={this.handleEditToggle}
                >
                  Cancel
                </button>
              </>
            ) : (
              <></>
            )}
            <button
              className="button is-small is-danger is-light"
              onClick={this.handleDelete}
            >
              Remove
            </button>
            {this.props.book.checkout_id &&
            this.props.book.checkout_id !== this.props.store.user.id ? (
              <>
                <p>
                  This book is currently checked out by <b>{this.props.book.username}</b>.
                </p>
                <p>
                  <button
                    className="button is-info is-small is-light"
                    onClick={this.returnBook}
                  >
                    Return
                  </button>
                </p>
              </>
            ) : (
              <>
                <p>
                  This book is currently <b>in your library</b>.
                </p>
              </>
            )}
            <br />
          </div>
        </li>
        <br />
      </>
    );
  }
}

export default connect(mapStoreToProps)(BookItem);
