import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class ArrayOptions extends Component {
  constructor () {
    super()

    // bind functions
    this.handleChange = this.handleChange.bind(this)
    this.extractOptions = this.extractOptions.bind(this)

    // create intial state
    this.state = {
      type: 'array'
    }
  }

  handleChange (e, { name, checked }) {
    // TODO: write this function
  }

  /**
   * This function returns an object containing the options defined within the
   * component. It is called by the parent form when trying to generate a schema
   * @return {object} An object containing the options defined within the component
   */
  extractOptions () {
    return {type: this.state.type}
  }

  render () {
    return (
      <Form.Group grouped>
        <label>Array Options</label>
        {/* TODO: Create a form where you can add values */}
      </Form.Group>
    )
  }
}

export default ArrayOptions
