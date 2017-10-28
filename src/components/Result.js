import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { Segment, Header } from 'semantic-ui-react'
import highlight from 'highlight.js'

class Result extends Component {
  constructor () {
    super()

    // Bind functions to be used
    this.convertToString = this.convertToString.bind(this)

    // Setup initial state
    this.state = {
      schemaString: null
    }
  }

  /**
   * When the component first mounts, if there is a schema defined, call the
   * function to convert it to a string, add it in state so that it is rendered
   * and highlight the code block
   */
  componentDidMount () {
    if (this.props.schema) {
      this.convertToString(this.props.schema)
      highlight.highlightBlock(findDOMNode(this.refs.code))
    }
  }

  /**
   * When the component recieves new props, update the schema if required
   * @param  {object} nextProps The incoming, updated props
   */
  componentWillReceiveProps (nextProps) {
    // TODO: Don't bother updating if the new schema is the same as the old
    // schema
    if (nextProps.schema) {
      this.convertToString(nextProps.schema)
    }
  }

  /**
   * If the component has updated then update the highlighting in the code block
   */
  componentDidUpdate () {
    if (this.state.schemaString) {
      highlight.initHighlighting.called = false
      highlight.highlightBlock(findDOMNode(this.refs.code))
    }
  }

  /**
   * This function takes a JSON schema object and converts it to a string,
   * with some formatting, to be displayed to the user
   * @param  {object} schemaObject A JSON schema object to be stringified
   */
  convertToString (schemaObject) {
    var schemaString
    schemaString = JSON.stringify(schemaObject, null, 4)
    this.setState({schemaString: schemaString})
  }

  render () {
    console.log(JSON.stringify(this.state.schemaString))
    return (
      <Segment attached='bottom' className='Result'>
        <Header as='h3'>Result</Header>
        {this.state.schemaString ? (
          <div>
            <pre className='codeBlock'>
              <code className='json' ref='code'>
                {this.state.schemaString}
              </code>
            </pre>
          </div>
        ) : (
          <p>Configure some options to see your schema.</p>
        )}
      </Segment>
    )
  }
}

Result.propTypes = {
  schema: PropTypes.object
}

export default Result
