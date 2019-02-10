import React from 'react'
import Home from './routes/home/Home'
import { Route } from 'react-router-dom'
import BlogContainer from './routes/blog/containers/BlogContainer'
import Nav from './components/Nav'

const App = () => (
  <div>
    <Nav />
    <Route exact path="/" component={Home} />
    <Route path="/blog/:id?/" component={BlogContainer} />
  </div>
)

export default App
