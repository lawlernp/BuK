import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class Sender extends Component {
  getBook = () => {
    this.props.dispatch({
      type: "GET_BOOK",
      payload: this.props.data,
    });
  };

  render() {
    return (
      <>
        <p>{this.props.data}</p>

        <button className="button is-fullwidth" onClick={this.getBook}>
          <span className="hint--bottom" aria-label="Click to search OpenLibrary's API">
            Search by ISBN
          </span>
        </button>
      </>
    );
  }
}

export default connect(mapStoreToProps)(Sender);
