import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment, Header, Button } from 'semantic-ui-react'
import SchemaForm from './SchemaForm'

class Builder extends Component {
  constructor () {
    super()

    // bind functions
    this.generateSchemaObject = this.generateSchemaObject.bind(this)
  }

  generateSchemaObject () {
    this.refs._schema.generateSchemaObject()
  }

  render () {
    return (
      <Segment attached className='Builder'>
        <Header as='h3'>Builder</Header>
        <SchemaForm ref='_schema' setSchema={this.props.setSchema} />
        <Button primary onClick={this.generateSchemaObject}>Build</Button>
      </Segment>
    )
  }
}

Builder.propTypes = {
  setSchema: PropTypes.func.isRequired
}

export default Builder
