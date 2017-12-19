import React from 'react'
import { storiesOf } from '@storybook/react'
import { LoadingContainer } from 'src'

storiesOf('LoadingContainer', module)
  .add('is loading', () => (
    <div>
      <LoadingContainer isLoading={true}>
        <div>This text IS loading. </div>
      </LoadingContainer>
    </div>
  ))
storiesOf('LoadingContainer', module)
  .add('is not loading', () => (
    <div>
      <LoadingContainer isLoading={false}>
        <div> This text IS NOT loading. </div>
      </LoadingContainer>
    </div>
  ))