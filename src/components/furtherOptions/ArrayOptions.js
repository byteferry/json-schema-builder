import React, { Component } from 'react'
import { Form, Header, Checkbox, Segment, Button } from 'semantic-ui-react'
import { arrayTypeOptions, dataTypeOptions } from '../../enums'

import StringOptions from './StringOptions'
import NumberOptions from './NumberOptions'
import ObjectOptions from './ObjectOptions'
import EnumsOptions from './EnumsOptions'
import MultipleOptions from './MultipleOptions'

class ArrayOptions extends Component {
  constructor () {
    super()

    // bind functions
    this.handleChange = this.handleChange.bind(this)
    this.toggleInputs = this.toggleInputs.bind(this)
    this.extractOptions = this.extractOptions.bind(this)
    this.renderValidators = this.renderValidators.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)

    // create intial state
    this.state = {
      type: 'array',
      options: {
        minItems: null,
        maxItems: null,
        uniqueItems: null,
        additionalItems: null
      },
      enabled: {
        minItems: false,
        maxItems: false,
        uniqueItems: false,
        additionalItems: false // QUESTION: Can this be an object?
      },
      arrayType: null,
      single: null,
      collection: []
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
      if (name === 'single-type') {
        return {single: value}
      }

      if (name.indexOf('collection') > -1) {
        let index = name.split('-')[1]
        let collection = prevState.collection
        collection[index] = value
        return {collection}
      }

      let options = Object.assign({}, prevState.options)
      let enabled = Object.assign({}, prevState.enabled)
      if (name === 'uniqueItems' || name === 'additionalItems') {
        options[name] = checked
        enabled[name] = checked
      } else {
        options[name] = value
      }
      return {options, enabled}
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
        switch (key) {
          case 'minItems':
          case 'maxItems':
            options[key] = parseInt(this.state.options[key], 10)
            break
          default:
            options[key] = this.state.options[key]
        }
      }
    })

    if (this.state.arrayType === 'single') {
      options = Object.assign(options, {items: this.refs._further.extractOptions()})
    } else if (this.state.arrayType === 'collection') {
      let items = this.state.collection.map((item, index) => {
        return this.refs[`_further-${index}`].extractOptions()
      })
      options = Object.assign(options, {items: items})
    }

    return options
  }

  /**
   * Thie function adds a new item to the collections array so that a new
   * segment is rendered
   */
  addItem () {
    this.setState(prevState => {
      let collection = prevState.collection
      collection.push(null)
      return {collection}
    })
  }

  /**
   * This function removes the item at the specified index from the collections
   * array
   * @param  {number} index The index of the item to remove
   */
  removeItem (index) {
    this.setState(prevState => {
      let collection = prevState.collection
      collection.splice(index, 1)
      return {collection}
    })
  }

  /**
   * This function renders the validation section of the ArrayOptions based
   * on the arrayType in state
   * @return {object} A JSX object representing the validation section
   */
  renderValidators () {
    let content = null
    if (this.state.arrayType === 'single') {
      content = (
        <div>
          <Form.Field>
            <label>Type</label>
            <Form.Select
              placeholder='Choose type...'
              name='single-type'
              options={dataTypeOptions}
              onChange={this.handleChange} />
          </Form.Field>
          {
            this.state.single && (
              <Segment>
                {this.renderFurtherOptions(this.state.single)}
              </Segment>
            )
          }
        </div>
      )
    } else if (this.state.arrayType === 'collection') {
      content = (
        <div>
          {
            !!this.state.collection.length && (
              <Segment.Group>
                {
                  this.state.collection.map((item, index) => (
                    <Segment key={index}>
                      <Form.Field>
                        <label>Type</label>
                        <Form.Select
                          placeholder='Choose type...'
                          name={`collection-${index}`}
                          value={this.state.collection[index] || ''}
                          options={dataTypeOptions}
                          onChange={this.handleChange} />
                      </Form.Field>
                      {this.renderFurtherOptions(this.state.collection[index], index)}
                      <Button color='red' onClick={() => this.removeItem(index)}>Remove</Button>
                    </Segment>
                  ))
                }
              </Segment.Group>
            )
          }
          <Button secondary onClick={this.addItem}>Add</Button>
        </div>
      )
    }
    return content
  }

  /**
   * This function render further options based on the type passed in as an input
   * @return {object} A JSX object to be rendered
   */
  renderFurtherOptions (type, index = null) {
    let content = null
    let ref = '_further'
    if (index !== null) ref += `-${index}`
    switch (type) {
      case 'string':
        content = <StringOptions ref={ref} />
        break
      case 'number':
        content = <NumberOptions ref={ref} />
        break
      case 'object':
        content = <ObjectOptions ref={ref} />
        break
      case 'array':
        content = <ArrayOptions ref={ref} />
        break
      case 'enums':
        content = <EnumsOptions ref={ref} />
        break
      case 'multiple':
        content = <MultipleOptions ref={ref} />
        break
      default:
        break
    }
    return content
  }

  render () {
    // TODO: Make sure additionalItems can be set to false
    return (
      <div>
        <Header as='h4'>Array Options</Header>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Array Type</label>
            <Form.Select placeholder='Choose Type' name='enable-type' options={arrayTypeOptions} onChange={(e, {value}) => this.setState({arrayType: value})} />
            {
              this.state.arrayType === 'collection' &&
              <div className='labelContainer'>
                <Form.Checkbox name='additionalItems' onChange={this.handleChange} />
                <span className='label'>additionalItems?</span>
              </div>
            }
          </Form.Field>
          <Form.Field>
            <div className='labelContainer'>
              <Form.Checkbox name='uniqueItems' onChange={this.handleChange} />
              <span className='label'>Unique Items?</span>
            </div>
          </Form.Field>
          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-minItems' onChange={this.toggleInputs} />
              <span className='label'>Minimum Length</span>
            </div>
            {
              this.state.enabled.minItems &&
              <Form.Input placeholder='Min Length' type='number' min='1' name='minItems' value={this.state.options.minItems || ''} onChange={this.handleChange} />
            }
          </Form.Field>
          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-maxItems' onChange={this.toggleInputs} />
              <span className='label'>Maximum Length</span>
            </div>
            {
              this.state.enabled.maxItems &&
              <Form.Input placeholder='Max Items' name='maxItems' value={this.state.options.maxItems || ''} onChange={this.handleChange} />
            }
          </Form.Field>
        </Form.Group>
        <div>
          {this.renderValidators()}
        </div>
      </div>
    )
  }
}

export default ArrayOptions
