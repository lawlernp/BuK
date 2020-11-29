import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
// fires on GET_BOOK to send ISBN's to DB and save results to book reducer
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
// fires on ADD_BOOK and adds current book to DB
function* addBook(action) {
  console.log(action.payload);
  try {
    yield axios.post("/api/book", action.payload);
  } catch (error) {
    console.log("item post failed", error);
  }
}
// fires on GET_LIBRARY to fetch all books from DB for current user
function* fetchLibrary() {
  try {
    const response = yield axios.get('/api/book');
    yield put({ type: 'SET_LIBRARY', payload: response.data });

} catch (error) {
    console.log("Library get from DB failed", error);
  }

}
// fires on EDIT_BOOK to update DB with new book info
function* editBook(action) {
  // console.log('hello from edit book');
  try {
    yield axios.put('/api/book', action.payload);
    yield put({type: "GET_LIBRARY"});
  } catch (error) {
    console.log("Edit Book Failed", error);
  }
}
// fires on DELETE_BOOK to remove book from DB
function* deleteBook(action) {
  try {
    yield axios.delete(`/api/book/${action.payload}`);
    yield put({type: "GET_LIBRARY"});
  } catch (error) {
    console.log("book delete failed", error);
  }
}
// fires on CHECKOUT_BOOK to update book with which user currently holds it
function* checkoutBook(action) {
  try {
    yield axios.put('/api/book/checkout', action.payload);
    yield put({type: "GET_LIBRARY"});
  } catch (error) {
    console.log("Edit Book Failed", error);
  }
}



function* bookSaga() {
  yield takeLatest("GET_BOOK", fetchBook);
  yield takeLatest("ADD_BOOK", addBook);  
  yield takeLatest("GET_LIBRARY", fetchLibrary);
  yield takeLatest("EDIT_BOOK", editBook);
  yield takeLatest("DELETE_BOOK", deleteBook);
  yield takeLatest("CHECKOUT_BOOK", checkoutBook);
}

export default bookSaga;
