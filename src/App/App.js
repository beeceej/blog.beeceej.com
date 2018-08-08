import React from 'react'
import Home from './routes/home/Home'
import { Route } from 'react-router-dom'
import BlogContainer from './routes/blog/container/BlogContainer'
import NavHeader from './component/NavHeader'

const App = () => (
  <div>
    <NavHeader />
    <Route exact path="/" component={Home} />
    <Route path="/blog/:id?/" component={BlogContainer} />
  </div>
)

export default App
