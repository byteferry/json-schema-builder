import React, { Component } from 'react'
import { Segment, Header } from 'semantic-ui-react'
import Builder from './Builder'
import Result from './Result'
import '../styles/App.css'

class App extends Component {
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
      <div className='App'>
        <Segment attached='top'>
          <Header as='h1'>JSON Schema Builder</Header>
        </Segment>
        <Builder setSchema={this.setSchema} />
        <Result schema={this.state.schema} />
      </div>
    )
  }
}

export default App
