import React from 'react'
import Post from './Post'
import isEmpty from 'lodash/isEmpty'

class PostWrapper extends React.Component {
  componentDidMount() {
    const { fetchPost, match, post } = this.props
    const postID = match.params.id

    if ((postID && isEmpty(post)) || post.id != postID) {
      fetchPost(postID)
    }
  }

  render() {
    return <Post {...this.props} />
  }
}

export default PostWrapper
