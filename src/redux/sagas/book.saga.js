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

function* addBook(action) {
  console.log(action.payload);
  
  try {
    yield axios.post("/api/book", action.payload);
  } catch (error) {
    console.log("item post failed", error);
  }
}

function* fetchLibrary() {
  try {
    const response = yield axios.get('/api/book');
    yield put({ type: 'SET_LIBRARY', payload: response.data });

} catch (error) {
    console.log("Library get from DB failed", error);
  }

}

function* editBook(action) {
  // console.log('hello from edit book');
  
  try {
    yield axios.put('/api/book', action.payload);
    yield put({type: "GET_LIBRARY"});
  } catch (error) {
    console.log("Edit Book Failed", error);
  }
}

function* deleteBook(action) {
  try {
    yield axios.delete(`/api/book/${action.payload}`);
    yield put({type: "GET_LIBRARY"});
  } catch (error) {
    console.log("book delete failed", error);
  }
}



function* bookSaga() {
  yield takeLatest("GET_BOOK", fetchBook);
  yield takeLatest("ADD_BOOK", addBook);  
  yield takeLatest("GET_LIBRARY", fetchLibrary);
  yield takeLatest("EDIT_BOOK", editBook);
  yield takeLatest("DELETE_BOOK", deleteBook);
}

export default bookSaga;
