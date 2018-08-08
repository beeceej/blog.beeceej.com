import { combineReducers } from 'redux'
import blogReducer, {
  FETCH_ALL_POSTS,
  FETCH_POST,
  onFetchPost,
  onFetchAllPosts,
} from '../routes/blog/module/blog'

import { takeLatest } from 'redux-saga/effects'

export function* mainSaga() {
  yield takeLatest(FETCH_POST, onFetchPost)
  yield takeLatest(FETCH_ALL_POSTS, onFetchAllPosts)
}

export default combineReducers({
  blogReducer,
})
