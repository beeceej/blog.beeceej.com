import { getPost, getAllPosts } from '../api/api'
import { call, put } from 'redux-saga/effects'

export const FETCH_POST = 'FETCH_POST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_ERROR = 'FETCH_POST_ERROR'
export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS'
export const FETCH_ALL_POSTS_SUCCESS = 'FETCH_ALL_POSTS_SUCCESS'
export const FETCH_ALL_POSTS_ERROR = 'FETCH_ALL_POSTS_ERROR'

export function fetchPost(id) {
  return {
    type: FETCH_POST,
    post: {},
    id,
  }
}

function fetchPostSuccess(post) {
  return {
    type: FETCH_POST_SUCCESS,
    post: post,
    error: '',
  }
}

export function fetchPostError(error) {
  return {
    type: FETCH_POST_ERROR,
    post: {},
    error: error,
  }
}

export function* onFetchPost(state) {
  const { id } = state
  try {
    const response = yield call(getPost, id)
    yield put(fetchPostSuccess(response))
  } catch (error) {
    yield put(fetchPostError(`Failure Retrieving post ${id}`))
  }
}

export function fetchAllPosts() {
  return {
    type: FETCH_ALL_POSTS,
  }
}

export function fetchAllPostsSuccess(posts) {
  return {
    type: FETCH_ALL_POSTS_SUCCESS,
    posts: posts.posts,
  }
}

export function fetchAllPostsError(error) {
  return {
    type: FETCH_ALL_POSTS_ERROR,
    posts: [],
    error: error,
  }
}

export function* onFetchAllPosts() {
  try {
    const response = yield call(getAllPosts)
    yield put(fetchAllPostsSuccess(response))
  } catch (error) {
    yield put(fetchAllPostsError(`Failure Retrieving all posts`))
  }
}

const initialState = {
  post: {},
  error: '',
  posts: [],
  id: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        post: {},
        id: action.id,
      }
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        post: action.post,
        error: '',
      }
    case FETCH_POST_ERROR:
      return {
        ...state,
        post: {},
        error: action.error,
      }
    case FETCH_ALL_POSTS:
      return {
        ...state,
        post: action.post,
        posts: [],
        error: '',
      }
    case FETCH_ALL_POSTS_SUCCESS:
      return {
        ...state,
        post: action.post,
        posts: action.posts,
      }
    case FETCH_ALL_POSTS_ERROR:
      return {
        ...state,
        post: action.post,
        posts: [],
        error: action.error,
      }
    default:
      return state
  }
}

export default reducer
