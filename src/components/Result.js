import React, { Component } from 'react'
import { Segment, Header } from 'semantic-ui-react'

class Result extends Component {
  render () {
    return (
      <Segment attached='bottom' className='Result'>
        <Header as='h3'>Result</Header>
      </Segment>
    )
  }
}

export default Result
