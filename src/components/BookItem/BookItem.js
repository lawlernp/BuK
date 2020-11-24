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

  componentDidMount = () => {
  };

  handleEditToggle = () => {
    this.setState({
      editToggle: !this.state.editToggle,
    });
  };

  handleChange = (event, eventType) => {
    this.setState({
      book: {
        ...this.state.book,
        [eventType]: event.target.value,
      },
    });
    console.log(this.state.book);
  };

  handleDelete = () => {
    this.props.dispatch({ type: "DELETE_BOOK", payload: this.props.book.id });
  }

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
      <li id={this.props.book.id}>
        <img
          width="100px"
          src={this.props.book.imageUrl}
          alt={this.props.book.title}
        />

        <label htmlFor="users">Checkout to user:</label>
        <select name="users" id="users">
          <optgroup label="Users">
            <option value="1">nick</option>
            <option value="2">bre</option>
            <option value="3">squee</option>
          </optgroup>
        </select>

        {this.state.editToggle ? (
          <></>
        ) : (
          <p>
            {this.props.book.title}
            <br />
            By: {this.props.book.author}
          </p>
        )}

        <button
          className="button is-small is-light"
          onClick={this.handleEditToggle}
        >
          Edit
        </button>
        {this.state.editToggle ? (
          <>
            <input
              name="title"
              onChange={(event) => this.handleChange(event, "title")}
              value={this.state.book.title}
            />
            <input
              name="author"
              onChange={(event) => this.handleChange(event, "author")}
              value={this.state.book.author}
            />
            <input
              name="imageUrl"
              onChange={(event) => this.handleChange(event, "imageUrl")}
              value={this.state.book.imageUrl}
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
          className="button is-small is-light"
          onClick={this.handleDelete}
        >
          Delete
        </button>
      </li>
    );
  }
}

export default connect(mapStoreToProps)(BookItem);
