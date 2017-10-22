import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Message } from 'semantic-ui-react'

class SchemaForm extends Component {
  constructor () {
    super()

    this.generateSchemaObject = this.generateSchemaObject.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateData = this.validateData.bind(this)

    this.state = {
      schema: {},
      type: {},
      warnings: {
        validation: null
      }
    }
  }

  validateData () {
    var msg
    if (typeof this.state.schema.name !== 'string' || this.state.schema.name === 0) {
      msg = 'Please enter a name value'
    } else if (this.state.schema.name.length > 40) {
      msg = 'The maximum allowed length for names is 40 characters'
    } else if (this.state.schema.name.match(/^\s+/) || this.state.schema.name.match(/\s+$/)) {
      msg = 'Leading and trailing spaces are not allowed in the name'
    } else if (!Object.keys(this.state.type).length) {
      msg = 'You must select at least one type'
    }

    this.setState(prevState => {
      let newWarnings = Object.assign({}, this.state.warnings)
      newWarnings.validation = msg
      return {warnings: newWarnings}
    })

    return msg
  }

  handleChange (e, { name, value, checked }) {
    // Handle the schema inputs
    if (name.indexOf('schema') > -1) {
      this.setState(prevState => {
        let newSchema = Object.assign({}, prevState.schema)
        let schemaName = name.split('-')[1]
        newSchema[schemaName] = value
        return {schema: newSchema}
      })
    }

    // Handle the type inputs
    if (name.indexOf('type') > -1) {
      this.setState(prevState => {
        let newType = Object.assign({}, prevState.type)
        let typeName = name.split('-')[1]
        if (checked) {
          newType[typeName] = checked
        } else {
          delete newType[typeName]
        }
        return {type: newType}
      })
    }
  }

  generateSchemaObject (e) {
    e.preventDefault()

    // Validate data and abort if there's a problem
    if (this.validateData()) {
      return
    }

    var schemaObject = {}

    // Set the type
    if (Object.keys(this.state.type).length > 1) {
      schemaObject.type = Object.keys(this.state.type)
    } else {
      schemaObject.type = Object.keys(this.state.type)[0]
    }

    this.props.addSchemaObject(this.state.schema.name, schemaObject)
  }

  render () {
    return (
      <div>
        <Form onSubmit={e => this.generateSchemaObject(e)}>
          <Form.Field>
            <label>Schema Name</label>
            <Form.Input placeholder='Schema Name' name='schema-name' onChange={this.handleChange} />
          </Form.Field>
          <Form.Group grouped>
            <label>Type</label>
            <Form.Checkbox label='String' name='type-string' onChange={this.handleChange} />
            <Form.Checkbox label='Number' name='type-number' onChange={this.handleChange} />
            <Form.Checkbox label='Object' name='type-objecy' onChange={this.handleChange} />
            <Form.Checkbox label='Array' name='type-array' onChange={this.handleChange} />
            <Form.Checkbox label='Boolean' name='type-boolean' onChange={this.handleChange} />
            <Form.Checkbox label='Null' name='type-null' onChange={this.handleChange} />
          </Form.Group>
          <Form.Button primary>Build</Form.Button>
        </Form>
        {
          this.state.warnings.validation &&
          <Message
            warning
            header='There is a problem with your options'
            content={this.state.warnings.validation}
          />
        }
      </div>
    )
  }
}

SchemaForm.propTypes = {
  addSchemaObject: PropTypes.func.isRequired
}

export default SchemaForm
