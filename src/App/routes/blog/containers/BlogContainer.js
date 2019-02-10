import { connect } from 'react-redux'
import { fetchPost, fetchAllPosts } from '../modules/blog'
import Blog from '../components/Blog'

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.blogReducer.post,
    posts: state.blogReducer.posts,
    postError: state.blogReducer.error,
    allPostError: state.blogReducer.error,
    ownProps,
  }
}

const mapDispatchToProps = {
  fetchPost,
  fetchAllPosts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
