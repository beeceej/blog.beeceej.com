import React from 'react'
import { NavLink } from 'react-router-dom'
import { fetchPost } from '../../module/blog'
import baseStyles from '../../../../Style.scss'
import styles from '../../Blog.scss'

const List = ({ posts }) => {
  const sortByID = (a, b) => a.id > b.id
  if (!posts) {
    return <div />
  } else {
    return (
      <div>
        {posts.sort(sortByID).map(p => {
          return p.visible ? (
            <div key={p.id} style={{ margin: '1em' }}>
              <NavLink
                className={`${baseStyles.big}
                ${styles.title}
                ${baseStyles.clickable}`}
                onClick={fetchPost}
                to={`blog/${p.id}`}
              >
                {p.title} ({p.author})
              </NavLink>
              <i
                className={`
                ${baseStyles.smaller}
                ${baseStyles.mainColor}
                ${styles.date}`}
              >
                {p.postedAt}
              </i>
            </div>
          ) : null
        })}
      </div>
    )
  }
}

export default List
