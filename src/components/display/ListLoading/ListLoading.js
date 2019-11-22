import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const LoadingList = props => {
  return (
    <Segment basic style={{ minHeight: '300px' }}>
      <Dimmer active inverted>
        <Loader inverted>{'Loading'}</Loader>
      </Dimmer>
    </Segment>
  )
}
export default LoadingList
