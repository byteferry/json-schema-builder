import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { Segment, Header } from 'semantic-ui-react'
import highlight from 'highlight.js'

class Result extends Component {
  constructor () {
    super()

    this.convertToStrings = this.convertToStrings.bind(this)

    this.state = {
      schemaStrings: {}
    }
  }

  componentDidMount () {
    if (Object.keys(this.props.schemaObjects).length) {
      this.convertToStrings(this.props.schemaObjects)
      highlight.highlightBlock(findDOMNode(this.refs.code))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (Object.keys(nextProps.schemaObjects).length) {
      this.convertToStrings(nextProps.schemaObjects)
    }
  }

  componentDidUpdate () {
    if (Object.keys(this.state.schemaStrings).length) {
      highlight.initHighlighting.called = false
      highlight.highlightBlock(findDOMNode(this.refs.code))
    }
  }

  convertToStrings (schemaObjects) {
    var schemaStrings = {}
    for (var schemaName of Object.keys(schemaObjects)) {
      schemaStrings[schemaName] = JSON.stringify(schemaObjects[schemaName], null, 4)
    }
    this.setState({schemaStrings: schemaStrings})
  }

  render () {
    return (
      <Segment attached='bottom' className='Result'>
        <Header as='h3'>Result</Header>
        {Object.keys(this.state.schemaStrings).length ? (
          Object.keys(this.state.schemaStrings).map((schemaName, i) => {
            return (
              <div key={i}>
                <Header as='h5'>{schemaName}</Header>
                <pre className='codeBlock'>
                  <code className='json' ref='code'>
                    {this.state.schemaStrings[schemaName]}
                  </code>
                </pre>
              </div>
            )
          })
        ) : (
          <p>Configure some options to see your schema.</p>
        )}
      </Segment>
    )
  }
}

Result.propTypes = {
  schemaObjects: PropTypes.object
}

export default Result
