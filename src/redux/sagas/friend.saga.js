import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";


// fires on GET_FRIEND to search "user" table for searched user
function* fetchFriend(action) {    
    try {
    const response = yield axios.get(`/api/friend/${action.payload}`)
    yield put({ type: 'SET_FRIEND', payload: response.data });
    } catch (error) {
    console.log("Friend get from DB failed", error);
  }

}
// fires on ADD_FRIEND to write friend relation to DB
function* addFriend(action) {    
  try {
    yield axios.post("/api/friend", action.payload);
    yield put({ type: 'SET_FRIEND', payload: {}});
    yield put({type: "GET_FRIEND_LIST"});
  } catch (error) {
    console.log("item post failed", error);
  }
}
// fires on GET_FRIEND_LIST to get friends list from DB
function* fetchFriendList() {  
    console.log('fetch friends');
  try {
    const response = yield axios.get("/api/friendlist");
    yield console.log(response);
    yield put({ type: "SET_FRIEND_LIST", payload: response.data });
  } catch (error) {
    console.log("Friend get from DB failed", error);
  }
}




function* friendSaga() {
  yield takeLatest("GET_FRIEND", fetchFriend);
  yield takeLatest("ADD_FRIEND", addFriend);
  yield takeLatest("GET_FRIEND_LIST", fetchFriendList);
}

export default friendSaga;
