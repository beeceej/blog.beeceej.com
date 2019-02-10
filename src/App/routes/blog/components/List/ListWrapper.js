import React from 'react'
import List from './List'

class ListWrapper extends React.Component {
  componentDidMount() {
    const { fetchAllPosts, posts } = this.props
    if (posts.length == 0) {
      fetchAllPosts()
    }
  }
  render() {
    return <List {...this.props} />
  }
}

export default ListWrapper
