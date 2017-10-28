import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment, Header } from 'semantic-ui-react'
import SchemaForm from './SchemaForm'

class Builder extends Component {
  render () {
    return (
      <Segment attached className='Builder'>
        <Header as='h3'>Builder</Header>
        <SchemaForm setSchema={this.props.setSchema} />
      </Segment>
    )
  }
}

Builder.propTypes = {
  setSchema: PropTypes.func.isRequired
}

export default Builder
