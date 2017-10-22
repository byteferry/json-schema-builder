import React, { Component } from 'react'
import { Segment, Header } from 'semantic-ui-react'
import Builder from './Builder'
import Result from './Result'
import '../styles/App.css'

class App extends Component {
  constructor () {
    super()

    this.addSchemaObject = this.addSchemaObject.bind(this)

    this.state = {
      schemaObjects: {}
    }
  }

  addSchemaObject (name, newSchemaObject) {
    this.setState(prevState => {
      let newSchemaObjects = Object.assign({}, prevState.schemaObjects)
      newSchemaObjects[name] = newSchemaObject
      return {schemaObjects: newSchemaObjects}
    })
  }

  render () {
    return (
      <div className='App'>
        <Segment attached='top'>
          <Header as='h1'>JSON Schema Builder</Header>
        </Segment>
        <Builder addSchemaObject={this.addSchemaObject} />
        <Result schemaObjects={this.state.schemaObjects} />
      </div>
    )
  }
}

export default App
