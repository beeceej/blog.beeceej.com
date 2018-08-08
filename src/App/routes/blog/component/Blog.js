import React from 'react'
import { Route } from 'react-router-dom'
import ListWrapper from '../component/List/ListWrapper'
import PostWrapper from '../component/Post/PostWrapper'
class Blog extends React.Component {
  render() {
    const { posts } = this.props

    return (
      <div>
        <Route
          exact
          path="/blog"
          render={() => <ListWrapper posts={posts} {...this.props} />}
        />
        <Route
          path={`/blog/:id`}
          render={() => <PostWrapper {...this.props} />}
        />
      </div>
    )
  }
}

export default Blog
