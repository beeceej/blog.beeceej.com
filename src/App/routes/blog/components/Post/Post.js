import Markdown from 'react-markdown'
import React from 'react'
import isEmpty from 'lodash/isEmpty'
import styles from '../../../../Style.scss'
import blogStyles from '../../Blog.scss'
import CodeRenderer from '../CodeRenderer'

const Post = props => {
  const { post, error } = props
  if (isEmpty(post)) return <div />

  return error ? (
    <div>an error retrieving post</div>
  ) : (
    <div className={`${blogStyles.post}`}>
      <h2 className={`${styles.big} ${blogStyles.title}`}>
        {post.title} ({post.author})
      </h2>
      <Markdown
        source={post.body}
        escapeHtml
        renderers={{
          CodeBlock: CodeRenderer,
          Code: CodeRenderer,
          BlockQuote: CodeRenderer,
          Inline: CodeRenderer,
        }}
      />
    </div>
  )
}
export default Post
