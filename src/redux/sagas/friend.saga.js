import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";



function* fetchFriend(action) {    
    try {
    const response = yield axios.get(`/api/friend/${action.payload}`)
    yield put({ type: 'SET_FRIEND', payload: response.data });
    } catch (error) {
    console.log("Friend get from DB failed", error);
  }

}

function* addFriend(action) {    
  try {
    yield axios.post("/api/friend", action.payload);
    yield put({ type: 'SET_FRIEND', payload: {}});
  } catch (error) {
    console.log("item post failed", error);
  }
}

function* friendSaga() {
  yield takeLatest("GET_FRIEND", fetchFriend);
  yield takeLatest("ADD_FRIEND", addFriend);
}

export default friendSaga;
