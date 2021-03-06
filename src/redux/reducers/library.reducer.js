// holds all books in library for current user
const libraryReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_LIBRARY":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default libraryReducer;
