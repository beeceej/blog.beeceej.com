import axios from 'axios'

const extractResponse = r => r.data

export const getPost = id =>
  axios.get(`https://static.beeceej.com/posts/${id}.json`).then(extractResponse)

export const getAllPosts = () =>
  axios.get(`https://static.beeceej.com/posts/all.json`).then(extractResponse)
