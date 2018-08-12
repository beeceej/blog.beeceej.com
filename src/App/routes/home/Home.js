import React from 'react'
import ReactMarkdown from 'react-markdown'
import homeStyles from './Home.scss'
import styles from '../../Style.scss'
const about = `
Software engineer from North Carolina, Working in Chicago for **[Label Insight](https://labelinsight.com)**

Lately I've been enjoying Go, Javascript, Python, Functional Programming, AWS and Serverless

![asdf](https://static.beeceej.com/posts/IMG_1023-2.jpg)
`

const Home = () => (
  <div className={`${homeStyles.home}`}>
    <ReactMarkdown source={about} />
  </div>
)
export default Home
