import React from 'react'
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom'
import { fetchPost } from '../../modules/blog'
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
                to={`blog/${p.normalizedTitle}`}
              >
                {p.title} ({p.author})
              </NavLink>
              <i
                className={`
                ${baseStyles.smaller}
                ${baseStyles.mainColor}
                ${styles.date}`}
              >
               <Moment format="YYYY/MM/DD">{p.postedAt}</Moment> 
              </i>
            </div>
          ) : null
        })}
      </div>
    )
  }
}

export default List
