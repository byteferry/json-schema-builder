import React, { Component } from 'react'
import { Segment, Header } from 'semantic-ui-react'

class Builder extends Component {
  render () {
    return (
      <Segment attached className='Builder'>
        <Header as='h3'>Builder</Header>
      </Segment>
    )
  }
}

export default Builder
