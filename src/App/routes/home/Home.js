import React from 'react'
import styles from './Home.scss'
import blurb from './blurb.js'

const imageURI = 'https://static.beeceej.com/posts/IMG_1023-2.jpg'
const Home = () => (
  <div className={`${styles.flexContainer} ${styles.home}`}>
    <div className={`${styles.row}`}>
      <span className={`${styles.flexItem}`}>{blurb}</span>
    </div>

    <div className={`${styles.row}`}>
      <span className={`${styles.flexItem}`}>
        <img src={imageURI} />
      </span>
    </div>
  </div>
)

export default Home
