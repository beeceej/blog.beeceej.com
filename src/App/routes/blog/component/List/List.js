import React from 'react'
import { NavLink } from 'react-router-dom'
import { fetchPost } from '../../module/blog'
import styles from '../../../../Style.scss'
import blogStyles from '../../Blog.scss'

const List = ({ posts }) => {
  const sortByID = (a, b) => a.id < b.id
  if (!posts) {
    return <div />
  } else {
    return <div>{posts.sort(sortByID).map(render)}</div>
  }
}
const render = p => {
  return p.visible ? (
    <div key={p.id} style={{ margin: '1em' }}>
      <NavLink
        className={`${styles.big} ${blogStyles.title} ${styles.clickable}`}
        onClick={dispatchFetchPost(p.id)}
        to={`blog/${p.id}`}
      >
        {p.title} ({p.author})
      </NavLink>
      <i className={`${styles.smaller} ${styles.mainColor}`}> {p.postedAt}</i>
    </div>
  ) : null
}

const dispatchFetchPost = id => () => fetchPost(id)

export default List
