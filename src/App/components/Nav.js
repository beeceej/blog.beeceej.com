import { NavLink } from 'react-router-dom'
import baseStyles from '../Style.scss'
import styles from './Nav.scss'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

const navItems = [
  {
    link: '/',
    text: 'About',
  },
  {
    link: '/blog',
    text: 'Thoughts',
  },
]

const icons = [
  {
    href: 'https://www.linkedin.com/in/beeceej/',
    icon: faLinkedin,
  },
  {
    href: 'https://www.twitter.com/_beeceej',
    icon: faTwitter,
  },
  {
    href: 'https://github.com/beeceej',
    icon: faGithub,
  },
]

const renderNavItem = ({ link, text }) => (
  <div className={`${styles.row}`}>
    <NavLink className={`${baseStyles.clickable} ${styles.flexItem}`} to={link}>
      {text}
    </NavLink>
  </div>
)

const renderIcon = ({ href, icon }) => (
  <a className={baseStyles.clickable} href={href}>
    <FontAwesomeIcon
      className={`${styles.flexIcon} ${styles.fa}`}
      icon={icon}
    />
  </a>
)

const Nav = () => (
  <nav>
    <div
      className={`
      ${styles.flexContainer} 
      ${styles.nav} 
      ${baseStyles.biggest} 
      ${styles.stack}`}
    >
      {navItems.map(renderNavItem)}
    </div>
    <div className={`${styles.flexContainer}`}>{icons.map(renderIcon)}</div>
  </nav>
)

export default Nav
