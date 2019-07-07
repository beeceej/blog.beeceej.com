const domains = {
  dev: {
    posts: 'https://posts-dev.beeceej.com'
  },
  prod: {
    posts: 'https://posts-prod.beeceej.com'
  }
}

export default domains[process.env.DEPLOY_ENV] || {
  posts: 'https://posts-dev.beeceej.com'
}