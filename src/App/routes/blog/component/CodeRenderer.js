import React from 'react'
import PropTypes from 'prop-types'
import Lowlight from 'react-lowlight'
import shallowCompare from 'react-addons-shallow-compare'
import python from 'highlight.js/lib/languages/python'
import lisp from 'highlight.js/lib/languages/lisp'
import go from 'highlight.js/lib/languages/go'

Lowlight.registerLanguage('python', python)
Lowlight.registerLanguage('lisp', lisp)
Lowlight.registerLanguage('go', go)

class CodeRenderer extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    return (
      <Lowlight
        language={this.props.language || 'lisp' || 'go'}
        value={this.props.literal || 'go'}
        inline={this.props.inline}
      />
    )
  }
}

export default CodeRenderer
