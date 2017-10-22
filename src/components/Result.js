import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { Segment, Header } from 'semantic-ui-react'
import highlight from 'highlight.js'

class Result extends Component {
  constructor () {
    super()

    this.convertToString = this.convertToString.bind(this)

    this.state = {
      resultString: ''
    }
  }

  componentDidMount () {
    if (this.props.result) {
      this.convertToString()
      highlight.highlightBlock(findDOMNode(this.refs.code))
    }
  }

  componentDidUpdate () {
    highlight.initHighlighting.called = false
    highlight.highlightBlock(findDOMNode(this.refs.code))
  }

  convertToString (resultObj) {
    var resultString = JSON.stringify(resultObj, null, 4)
    this.setState({resultString: resultString})
  }

  render () {
    console.log(this.resultString)
    return (
      <Segment attached='bottom' className='Result'>
        <Header as='h3'>Result</Header>
        {this.props.result ? (
          <pre className='codeBlock'>
            <code className='json' ref='code'>
              {this.state.resultString}
            </code>
          </pre>
        ) : (
          <p>Configure some options to see your schema.</p>
        )}
      </Segment>
    )
  }
}

Result.propTypes = {
  result: PropTypes.object
}

export default Result
