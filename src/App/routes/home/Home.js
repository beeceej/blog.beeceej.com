import React from 'react'
import styles from './Home.scss'

const blurb = `My name is Brian Jones, I'm originally from North Carolina but now I reside in Chicago. I'm a software engineer who enjoys digging into tough problems. Some of the languages I enjoy writing on a regular basis are Go, Javascript, bash, Java, Kotlin, python. I also enjoy functional programming and have dabbled in Haskell and multiple dialects of lisp. On the dev-ops side I do a lot of work with AWS, docker, terraform, serverless (the framework) and am always on the lookout for new tools. I'm primarily a linux user, but cut my teeth on mac and windows when I need to. When I'm not sinking my teeth into a tough problem I'm usually outdoors; hiking, fishing or playing with my dog, Kona (check out the favicon). Anyway, this is my blog, mostly tech... but to be honest you never know what you could find in here...`

const imageURI = 'https://static.beeceej.com/posts/IMG_1023-2.jpg'
const Home = () => (
  <div className={`${styles.flexContainer} ${styles.home}`}>
    <div>
      <span className={`${styles.flexItem}`}>{blurb}</span>
    </div>
    <div>
      <span className={`${styles.flexItem}`}>
        <img src={imageURI} />
      </span>
    </div>
  </div>
)

export default Home
