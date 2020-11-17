import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchBook(isbn) {
  console.log("hello from book saga", isbn.payload);
  try {
    const response = yield axios.get(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn.payload}&format=json&jscmd=data`
    );
    yield put({ type: 'SET_BOOK', payload: response.data[`ISBN:${isbn.payload}`] });

} catch (error) {
    console.log("API get failed", error);
  }
}

function* bookSaga() {
  yield takeLatest("GET_BOOK", fetchBook);
}

export default bookSaga;
