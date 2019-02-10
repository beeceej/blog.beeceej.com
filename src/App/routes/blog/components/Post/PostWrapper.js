import React from 'react'
import Post from './Post'
import isEmpty from 'lodash/isEmpty'

class PostWrapper extends React.Component {
  componentDidMount() {
    const { fetchPost, match, post } = this.props
    const pathId = match.params.id

    const isPostLoaded = p => !isEmpty(p)
    const newPostRequested = ({ normalizedTitle }, pathId) => normalizedTitle !== pathId
    const shouldFetchPost = !isPostLoaded(post) || newPostRequested(post, pathId)
  
    if(pathId && shouldFetchPost) {
      fetchPost(pathId)
    }
  }

  render() {
    return <Post {...this.props} />
  }
}

export default PostWrapper
