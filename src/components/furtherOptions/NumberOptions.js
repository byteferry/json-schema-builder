import React, { Component } from 'react'
import { Form, Header, Checkbox } from 'semantic-ui-react'

class NumberOptions extends Component {
  constructor () {
    super()

    // bind functions
    this.handleChange = this.handleChange.bind(this)
    this.extractOptions = this.extractOptions.bind(this)
    this.toggleInputs = this.toggleInputs.bind(this)

    // create intial state
    this.state = {
      type: 'number',
      options: {
        multipleOf: null,
        minimum: null,
        maximum: null,
        exclusiveMinimum: null,
        exclusiveMaximum: null
      },
      enabled: {
        multipleOf: false,
        minimum: false,
        maximum: false,
        exclusiveMinimum: false,
        exclusiveMaximum: false
      }
    }
  }

  /**
   * This function updates state when an input is changed
   * @param  {object} e     The native event emitted by the input
   * @param  {string} name  The name of the input which was changed
   * @param  {any} value The new value of the input which was changed
   * @param  {boolean} checked The new value of the checkbox which was changed
   */
  handleChange (e, { name, value, checked }) {
    this.setState(prevState => {
      let options = Object.assign({}, prevState.options)
      let type = prevState.type
      switch (name) {
        case 'integer':
          type = checked ? 'integer' : 'number'
          break
        case 'minimum':
        case 'maximum':
        case 'multipleOf':
          options[name] = value
          break
        case 'exclusiveMinimum':
        case 'exclusiveMaximum':
          options[name] = checked
          break
        default:
          break
      }
      return {options, type}
    })
  }

  /**
   * This function updates state when an checkbox is ticked/unticked
   * @param  {object} e       The native event emitted by the input
   * @param  {string} name    The name of the checkbox which was changed
   * @param  {boolean} checked The value of the checkbox which was changed
   */
  toggleInputs (e, {name, checked}) {
    this.setState(prevState => {
      let enabled = Object.assign({}, prevState.enabled)
      let inputName = name.split('-')[1]

      // set the enabled value to the new one
      enabled[inputName] = checked

      // also get the exclusive inputs
      if (inputName === 'minimum') {
        enabled.exclusiveMinimum = checked
      } else if (inputName === 'maximum') {
        enabled.exclusiveMaximum = checked
      }

      // set the state
      return {enabled}
    })
  }

  /**
   * This function returns an object containing the options defined within the
   * component. It is called by the parent form when trying to generate a schema
   * @return {object} An object containing the options defined within the component
   */
  extractOptions () {
    let options = {
      type: this.state.type
    }

    Object.keys(this.state.options).forEach(key => {
      if (this.state.enabled[key] && this.state.options[key]) {
        options[key] = this.state.options[key]
      }
    })

    return options
  }

  render () {
    return (
      <div>
        <Header as='h4'>Number Options</Header>
        <Form.Group widths='equal'>
          <Form.Field>
            <div className='labelContainer'>
              <Form.Checkbox name='integer' onChange={this.handleChange} />
              <span className='label'>Integer?</span>
            </div>
          </Form.Field>

          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-multipleOf' onChange={this.toggleInputs} />
              <span className='label'>Multiple Of</span>
            </div>
            {
              this.state.enabled.multipleOf &&
              <Form.Input placeholder='Multiple Of' type='number' min='1' name='multipleOf' value={this.state.options.multipleOf || ''} onChange={this.handleChange} />
            }
          </Form.Field>

          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-minimum' onChange={this.toggleInputs} />
              <span className='label'>Minimum</span>
            </div>
            {
              this.state.enabled.minimum &&
              <div>
                <Form.Input placeholder='Minimum Value' type='number' name='minimum' value={this.state.options.minimum || ''} onChange={this.handleChange} />
                <div className='labelContainer'>
                  <Form.Checkbox name='exclusiveMinimum' checked={!!this.state.options.exclusiveMinimum} onChange={this.handleChange} />
                  <span className='label'>Exclusive?</span>
                </div>
              </div>
            }
          </Form.Field>

          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-maximum' onChange={this.toggleInputs} />
              <span className='label'>Maximum</span>
            </div>
            {
              this.state.enabled.maximum &&
              <div>
                <Form.Input placeholder='Maximum Value' type='number' name='maximum' value={this.state.options.maximum || ''} onChange={this.handleChange} />
                <div className='labelContainer'>
                  <Form.Checkbox name='exclusiveMaximum' checked={!!this.state.options.exclusiveMaximum} onChange={this.handleChange} />
                  <span className='label'>Exclusive?</span>
                </div>
              </div>
            }
          </Form.Field>
        </Form.Group>
      </div>
    )
  }
}

export default NumberOptions
