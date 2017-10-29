import React, { Component } from 'react'
import { Form, Header, Checkbox } from 'semantic-ui-react'
import { stringFormats } from '../../enums'
import '../../styles/options.css'

class StringOptions extends Component {
  constructor () {
    super()

    // bind functions
    this.handleChange = this.handleChange.bind(this)
    this.extractOptions = this.extractOptions.bind(this)
    this.toggleInputs = this.toggleInputs.bind(this)

    // create intial state
    this.state = {
      type: 'string',
      options: {
        minLength: null,
        maxLength: null,
        pattern: null,
        format: null
      },
      enabled: {
        minLength: false,
        maxLength: false,
        pattern: false,
        format: false
      }
    }
  }

  /**
   * This function updates state when an input is changed
   * @param  {object} e     The native event emitted by the input
   * @param  {string} name  The name of the input which was changed
   * @param  {any} value The new value of the input which was changed
   */
  handleChange (e, { name, value }) {
    // TODO: Make numbers actually be numbers
    this.setState(prevState => {
      let options = Object.assign({}, prevState.options)
      if (value) {
        options[name] = value
      } else {
        options[name] = null
      }
      return {options}
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
        <Header as='h4'>String Options</Header>
        <Form.Group widths='equal'>
          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-minLength' onChange={this.toggleInputs} />
              <span className='label'>Minimum Length</span>
            </div>
            {
              this.state.enabled.minLength &&
              <Form.Input placeholder='Min Length' type='number' min='1' name='minLength' value={this.state.options.minLength || ''} onChange={this.handleChange} />
            }
          </Form.Field>
          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-maxLength' onChange={this.toggleInputs} />
              <span className='label'>Maximum Length</span>
            </div>
            {
              this.state.enabled.maxLength &&
              <Form.Input placeholder='Max Length' type='number' min='1' name='maxLength' value={this.state.options.maxLength || ''} onChange={this.handleChange} />
            }
          </Form.Field>
          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-pattern' onChange={this.toggleInputs} />
              <span className='label'>Pattern</span>
            </div>
            {
              this.state.enabled.pattern &&
              <Form.Input placeholder='Regex Pattern' name='pattern' value={this.state.options.pattern || ''} onChange={this.handleChange} />
            }
          </Form.Field>
          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-format' onChange={this.toggleInputs} />
              <span className='label'>Format</span>
            </div>
            {
              this.state.enabled.format &&
              <Form.Select placeholder='Choose format' name='format' options={stringFormats} value={this.state.options.format || ''} onChange={this.handleChange} />
            }
          </Form.Field>
        </Form.Group>
      </div>
    )
  }
}

export default StringOptions
