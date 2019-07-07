import axios from 'axios'
import domains from "../../../domains"

const extractResponse = r => r.data
export const getPost = id => axios.get(`${domains.posts}/posts/${id}.json`).then(extractResponse)

export const getAllPosts = () => axios.get(`${domains.posts}/posts/all.json`).then(extractResponse)
