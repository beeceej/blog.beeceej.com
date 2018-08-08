import { NavLink } from 'react-router-dom'
import styles from '../Style.scss'
import navHeaderstyles from './NavHeader.scss'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

const NavBar = ({}) => {
  return (
    <div>
      <nav
        className={`${navHeaderstyles.parent} ${navHeaderstyles.nav} ${
          styles.biggest
        } `}
      >
        <div className={`${navHeaderstyles.subParent}`}>
          <NavLink
            className={`${styles.clickable} ${navHeaderstyles.child}`}
            to="/"
          >
            About
          </NavLink>
          <span className={`${navHeaderstyles.lightGray}`}>|</span>
          <NavLink
            className={`${styles.clickable} ${navHeaderstyles.child}`}
            to="/blog"
          >
            Thoughts
          </NavLink>
        </div>
        <div className={`${navHeaderstyles.subParent} `}>
          <a className={styles.clickable} href="https://www.github.com/beeceej">
            <FontAwesomeIcon
              className={`${navHeaderstyles.child} ${navHeaderstyles.fa}`}
              icon={faGithub}
            />
          </a>
          <a
            className={styles.clickable}
            href="https://www.twitter.com/_beeceej"
          >
            <FontAwesomeIcon
              className={`${navHeaderstyles.child} ${navHeaderstyles.fa} `}
              icon={faTwitter}
            />
          </a>
          <a
            className={styles.clickable}
            href="https://www.linkedin.com/in/beeceej/"
          >
            <FontAwesomeIcon
              className={`${navHeaderstyles.child} ${navHeaderstyles.fa} `}
              icon={faLinkedin}
            />
          </a>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
