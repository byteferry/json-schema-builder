import React, { Component } from 'react'
import { Form, Checkbox, Header, Segment, Button, Grid } from 'semantic-ui-react'
import { dataTypeOptions, propertyTypeOptions } from '../../enums'

import StringOptions from './StringOptions'
import NumberOptions from './NumberOptions'
import ArrayOptions from './ArrayOptions'
import EnumsOptions from './EnumsOptions'
import MultipleOptions from './MultipleOptions'

class ObjectOptions extends Component {
  constructor () {
    super()

    // bind functions
    this.handleChange = this.handleChange.bind(this)
    this.handlePropertiesChange = this.handlePropertiesChange.bind(this)
    this.toggleInputs = this.toggleInputs.bind(this)
    this.extractOptions = this.extractOptions.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.renderFurtherOptions = this.renderFurtherOptions.bind(this)
    this.renderPropertyOptions = this.renderPropertyOptions.bind(this)

    // create intial state
    // items in the properties array have the following form
    // {
    //    propertyType: enums['named', 'pattern']
    //    name: String
    //    type: enums['number', 'string', 'boolean', 'null', 'object', 'array']
    // }
    this.state = {
      type: 'object',
      enabled: {
        minProperties: false,
        maxProperties: false
      },
      options: {
        minProperties: null,
        maxProperties: null
      },
      properties: []
    }
  }

  /**
   * This function updates state when an input is changed
   * @param  {object} e     The native event emitted by the input
   * @param  {string} name  The name of the input which was changed
   * @param  {any} value The new value of the input which was changed
   */
  handleChange (e, { name, value }) {
    this.setState(prevState => {
      let options = Object.assign({}, prevState.options)
      options[name] = value

      return {options}
    })
  }

  /**
   * This function updates state when an input is changed
   * @param  {object} e     The native event emitted by the input
   * @param  {string} name  The name of the input which was changed
   * @param  {any} value The new value of the input which was changed
   * @param  {boolean} checked The new value of the checkbox which was changed
   */
  handlePropertiesChange (e, { name, value, checked }) {
    this.setState(prevState => {
      let properties = this.state.properties
      let index = name.split('-')[1]
      let option = name.split('-')[2]

      if (option === 'required') {
        properties[index][option] = checked
      } else {
        properties[index][option] = value
      }

      return {properties}
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
        options[key] = parseInt(this.state.options[key], 10)
      }
    })

    let properties = {}
    let patternProperties = {}
    let required = []
    for (var i = 0; i < this.state.properties.length; i++) {
      let item = this.state.properties[i]

      if (item.propertyType === 'named') {
        // Add a new property
        properties[item.name] = {
          type: item.type
        }

        // check if the property is required
        if (item.required) {
          required.push(item.name)
        }

        // extract the property options
        Object.assign(properties[item.name], this.refs[`_further-${i}`].extractOptions())
      } else {
        // Add a new patternProperty
        patternProperties[item.name] = {
          type: item.type
        }

        // extract the property options
        Object.assign(patternProperties[item.name], this.refs[`_further-${i}`].extractOptions())
      }
    }

    options.properties = properties
    options.required = required
    options.patternProperties = patternProperties

    return options
  }

  /**
   * Thie function adds a new item to the collections array so that a new
   * segment is rendered.
   */
  addItem () {
    this.setState(prevState => {
      let properties = prevState.properties
      let newItem = {
        type: null,
        propertyType: null,
        required: null
      }
      properties.push(newItem)
      return {properties}
    })
  }

  /**
   * This function removes the item at the specified index from the collections
   * array
   * @param  {number} index The index of the item to remove
   */
  removeItem (index) {
    this.setState(prevState => {
      let properties = prevState.properties
      properties.splice(index, 1)
      return {properties}
    })
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

  /**
   * This function renders a segment containing all of the property options
   * for each of the prop in state
   * @param  {object} item  An object containing the current property data
   * @param  {number} index The index of the given property
   * @return {object}       A JSX element with the property segment
   */
  renderPropertyOptions (item, index) {
    return (
      <Segment key={index}>
        <Grid>
          <Grid.Column width={5}>
            <Form.Field>
              <label>Property Type</label>
              <Form.Select
                placeholder='Choose type...'
                name={`property-${index}-propertyType`}
                value={item.propertyType || ''}
                options={propertyTypeOptions}
                onChange={this.handlePropertiesChange} />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={5}>
            {
              item.propertyType === 'named' &&
              <Form.Field>
                <label>Name</label>
                <Form.Input
                  placeholder='Property name'
                  name={`property-${index}-name`}
                  value={item.name || ''}
                  onChange={this.handlePropertiesChange} />
              </Form.Field>
            }
            {
              item.propertyType === 'pattern' &&
              <Form.Field>
                <label>Pattern</label>
                <Form.Input
                  placeholder='Property pattern'
                  name={`property-${index}-name`}
                  value={item.name || ''}
                  onChange={this.handlePropertiesChange} />
              </Form.Field>
            }
          </Grid.Column>
          {
            item.propertyType === 'named' &&
            <Grid.Column width={5}>
              <Form.Field>
                <label>Required?</label>
                <Form.Checkbox
                  name={`property-${index}-required`}
                  checked={!!item.required}
                  onChange={this.handlePropertiesChange} />
              </Form.Field>
            </Grid.Column>
          }
        </Grid>
        <Form.Field>
          <label>Type</label>
          <Form.Select
            placeholder='Choose type...'
            name={`property-${index}-type`}
            value={item.type || ''}
            options={dataTypeOptions}
            onChange={this.handlePropertiesChange} />
        </Form.Field>
        {this.renderFurtherOptions(item.type, index)}
        <Button color='red' onClick={() => this.removeItem(index)}>Remove</Button>
      </Segment>
    )
  }

  render () {
    return (
      <div>
        <Header as='h4'>Object Options</Header>
        <Form.Group widths='equal'>
          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-minProperties' onChange={this.toggleInputs} />
              <span className='label'>Minimum Properties</span>
            </div>
            {
              this.state.enabled.minProperties &&
              <Form.Input placeholder='Min Properties' type='number' min='1' name='minProperties' value={this.state.options.minProperties || ''} onChange={this.handleChange} />
            }
          </Form.Field>
          <Form.Field>
            <div className='labelContainer'>
              <Checkbox name='enable-maxProperties' onChange={this.toggleInputs} />
              <span className='label'>Maximum Properties</span>
            </div>
            {
              this.state.enabled.maxProperties &&
              <Form.Input placeholder='Max Properties' name='maxProperties' value={this.state.options.maxProperties || ''} onChange={this.handleChange} />
            }
          </Form.Field>
        </Form.Group>
        <Header as='h5'>Properties</Header>
        {
          !!this.state.properties.length &&
          <Segment.Group>
            {
              this.state.properties.map((item, index) => (
                this.renderPropertyOptions(item, index)
            ))
          }
          </Segment.Group>
        }
        <Button secondary onClick={this.addItem}>Add Property</Button>
      </div>
    )
  }
}

export default ObjectOptions
