import React from 'react'
import Markdown from 'react-markdown'
import homeStyles from './Home.scss'

const about = `
Software engineer from North Carolina, Working in Chicago for **[Label Insight](https://labelinsight.com)**

Lately I've been enjoying Go, Javascript, Python, Functional Programming, AWS and Serverless
`
const imageURI = 'https://static.beeceej.com/posts/IMG_1023-2.jpg'
const Home = () => (
  <div>
    <div className={`${homeStyles.home}`}>
      <Markdown escapeHtml source={about} />
    </div>
    <div className={`${homeStyles.home}`}>
      <img src={imageURI} />
    </div>
  </div>
)
export default Home
