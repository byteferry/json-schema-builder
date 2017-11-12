import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment, Header } from 'semantic-ui-react'
import Builder from './Builder'
import Result from './Result'
import '../styles/SchemaBuilder.css'

class SchemaBuilder extends Component {
  constructor () {
    super()

    this.setSchema = this.setSchema.bind(this)

    this.state = {
      schema: null
    }
  }

  setSchema (newSchema) {
    this.setState(prevState => {
      return {schema: newSchema}
    })
  }

  render () {
    return (
      <div className='SchemaBuilder'>
        <Segment attached='top'>
          <Header as='h1'>JSON Schema Builder</Header>
        </Segment>
        <Builder setSchema={this.setSchema} />
        <Result schema={this.state.schema} highlightStyle={this.props.highlightStyle} />
      </div>
    )
  }
}

SchemaBuilder.propTypes = {
  schema: PropTypes.object,
  highlightStyle: PropTypes.string
}

export default SchemaBuilder
