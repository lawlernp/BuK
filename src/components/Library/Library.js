import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
  componentDidMount = () => {
    this.getLibrary();
  };

  getLibrary = () => {
    this.props.dispatch({ type: "GET_LIBRARY" });
  }

  render() {
    return (
      <div>
        <p>My Library</p>
        <ul>
          {this.props.store.library[0] ? (
            <>
              {this.props.store.library.map((book) => {
                return <li>{book.title}</li>;
              })}
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
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
export default connect(mapStoreToProps)(InfoPage);
