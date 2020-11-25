import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class Sender extends Component {
  
  getBook = () => {
    if (this.props.data !== "Searching for ISBN...") {
      this.props.dispatch({
        type: "GET_BOOK",
        payload: this.props.data,
      });
    } else {
      alert("ISBN not found, try again.");
    }
  };

  render() {
    return (
      <>
        <p>{this.props.data}</p>

        <button className="button is-fullwidth" onClick={this.getBook}>
          <span className="hint--bottom" aria-label="Click to search OpenLibrary's API">
            Search
          </span>
        </button>
      </>
    );
  }
}

export default connect(mapStoreToProps)(Sender);
