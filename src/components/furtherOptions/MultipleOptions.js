import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class MultipleOptions extends Component {
  constructor () {
    super()

    // bind functions
    this.handleChange = this.handleChange.bind(this)

    // create intial state
    this.state = {
      type: {}
    }
  }

  handleChange (e, { name, checked }) {
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

  /**
   * This function returns an object containing the options defined within the
   * component. It is called by the parent form when trying to generate a schema
   * @return {object} An object containing the options defined within the component
   */
  extractOptions () {
    let types = Object.keys(this.state.type).map(type => type)
    return {type: types}
  }

  render () {
    return (
      <Form.Group grouped>
        <label>Select types...</label>
        <Form.Checkbox label='String' name='type-string' onChange={this.handleChange} />
        <Form.Checkbox label='Number' name='type-number' onChange={this.handleChange} />
        <Form.Checkbox label='Object' name='type-objecy' onChange={this.handleChange} />
        <Form.Checkbox label='Array' name='type-array' onChange={this.handleChange} />
        <Form.Checkbox label='Boolean' name='type-boolean' onChange={this.handleChange} />
        <Form.Checkbox label='Null' name='type-null' onChange={this.handleChange} />
      </Form.Group>
    )
  }
}

export default MultipleOptions
