// holds friends for checkout feature
const friendListReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FRIEND_LIST":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default friendListReducer;
