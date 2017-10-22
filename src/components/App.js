import React, { Component } from 'react'
import { Segment, Header } from 'semantic-ui-react'
import Builder from './Builder'
import Result from './Result'
import '../styles/App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Segment attached='top'>
          <Header as='h1'>JSON Schema Builder</Header>
        </Segment>
        <Builder />
        <Result />
      </div>
    )
  }
}

export default App
