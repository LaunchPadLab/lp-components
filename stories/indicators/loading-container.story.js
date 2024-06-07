import React from 'react'
import { LoadingContainer } from 'src'

export default {
  title: 'LoadingContainer',
}

export const IsLoading = () => (
  <div>
    <LoadingContainer isLoading={true}>
      <div>This text IS loading. </div>
    </LoadingContainer>
  </div>
)

IsLoading.story = {
  name: 'is loading',
}

export const IsNotLoading = () => (
  <div>
    <LoadingContainer isLoading={false}>
      <div> This text IS NOT loading. </div>
    </LoadingContainer>
  </div>
)

IsNotLoading.story = {
  name: 'is not loading',
}
