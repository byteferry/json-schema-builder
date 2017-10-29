import React, { Component } from 'react'
import { Form, Button, Header, Grid } from 'semantic-ui-react'
import { enumValues, booleanOptions } from '../../enums'

class EnumsOptions extends Component {
  constructor () {
    super()

    // bind functions
    this.handleChange = this.handleChange.bind(this)
    this.extractOptions = this.extractOptions.bind(this)
    this.renderListItems = this.renderListItems.bind(this)
    this.addListItem = this.addListItem.bind(this)
    this.removeListItem = this.removeListItem.bind(this)

    // create intial state
    this.state = {
      enum: [],
      items: []
    }
  }

  /**
   * The function is called each time a input changes to update the value in state
   * @param  {object} e     The native change event emitted by the input
   * @param  {[type]} name  The name of the input which is being changed
   * @param  {[type]} value The new value of the input
   */
  handleChange (e, { name, value }) {
    this.setState(prevState => {
      let items = prevState.items

      if (name.indexOf('type') > -1) {
        let index = name.split('-')[1]
        items[index].type = value
        if (value === 'null') {
          items[index].value = null
        }
      }

      if (name.indexOf('value') > -1) {
        let index = name.split('-')[1]
        switch (items[index].type) {
          case 'boolean':
            items[index].value = value === 'true'
            break
          case 'number':
            items[index].value = parseFloat(value)
            break
          case 'string':
          default:
            items[index].value = value
            break
        }
      }
      return {items}
    })
  }

  /**
   * This function returns an object containing the options defined within the
   * component. It is called by the parent form when trying to generate a schema
   * @return {object} An object containing the options defined within the component
   */
  extractOptions () {
    let enumVals = this.state.items.map(item => {
      return item.value
    })
    return {enum: enumVals}
  }

  /**
   * The function renders loops through the array if items in state
   * and creates an element displaying all of the content
   * @return {object} A JSX object containing a list of the enum elements
   */
  renderListItems () {
    let input
    return this.state.items.map((item, index) => {
      switch (item.type) {
        case 'string':
          input = <Form.Input name={`value-${index}`} type='text' value={item.value} onChange={this.handleChange} placeholder='Enter Value' />
          break
        case 'number':
          // TODO: make number inputs take floats
          input = <Form.Input name={`value-${index}`} type='number' value={item.value} onChange={this.handleChange} placeholder='Enter Value' />
          break
        case 'boolean':
          input = <Form.Select options={booleanOptions} name={`value-${index}`} value={String(item.value)} onChange={this.handleChange} placeholder='Choose Value' />
          break
        case 'null':
        default:
          input = null
          break
      }
      return (
        <Grid.Row key={index}>
          <Grid.Column width={6}>
            <Form.Select name={`type-${index}`} options={enumValues} value={item.type} placeholder='Choose type' onChange={this.handleChange} />
          </Grid.Column>
          <Grid.Column width={6}>
            {input}
          </Grid.Column>
          <Grid.Column width={2}>
            <Button color='red' onClick={() => this.removeListItem(index)}>Remove</Button>
          </Grid.Column>
        </Grid.Row>
      )
    })
  }

  /**
   * This function adds a new empty list item in state, triggering a re-render
   */
  addListItem () {
    this.setState(prevState => {
      let items = this.state.items
      items.push({
        type: '',
        value: ''
      })
      return {items}
    })
  }

  /**
   * This function removes from state, the list item at the index specified
   * @param  {number} index The index of the list item to be removed
   */
  removeListItem (index) {
    this.setState(prevState => {
      let items = prevState.items
      items.splice(index, 1)
      return {items}
    })
  }

  render () {
    return (
      <div>
        <Header as='h4'>Enter allowable values...</Header>
        <Grid>
          <Grid.Column width={6}><Header as='h5'>Type</Header></Grid.Column>
          <Grid.Column width={6}><Header as='h5'>Value</Header></Grid.Column>
          {this.renderListItems()}
        </Grid>
        <br />
        <Button secondary onClick={this.addListItem}>Add Value</Button>
      </div>
    )
  }
}

export default EnumsOptions
