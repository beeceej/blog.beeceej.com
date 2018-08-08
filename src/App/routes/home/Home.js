import React from 'react'
import ReactMarkdown from 'react-markdown'
import homeStyles from './Home.scss'
const about = `
Software engineer from North Carolina, Working in Chicago for **[Label Insight](https://github.com/labelinsight)**

Lately I've been enjoying Go, Javascript, Python, Haskell, AWS and Serverless

**[@_beeceej](https://www.twitter.com/_beeceej) | [github.com/beeceej](https://github.com/beeceej)**

![asdf](https://static.beeceej.com/posts/IMG_1023-2.png)
`

const Home = () => (
  <div className={`${homeStyles.home}`}>
    <ReactMarkdown source={about} />
  </div>
)
export default Home
