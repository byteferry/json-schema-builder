import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment, Header } from 'semantic-ui-react'
import SchemaForm from './SchemaForm'

class Builder extends Component {
  render () {
    return (
      <Segment attached className='Builder'>
        <Header as='h3'>Builder</Header>
        <SchemaForm addSchemaObject={this.props.addSchemaObject} />
      </Segment>
    )
  }
}

Builder.propTypes = {
  addSchemaObject: PropTypes.func.isRequired
}

export default Builder
