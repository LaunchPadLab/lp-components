import React from 'react'
import { LoadingContainer } from 'src'

export default {
  title: 'LoadingContainer',
}

export const IsLoading = {
  render: () => (
    <div>
      <LoadingContainer isLoading={true}>
        <div>This text IS loading. </div>
      </LoadingContainer>
    </div>
  ),

  name: 'is loading',
}

export const IsNotLoading = {
  render: () => (
    <div>
      <LoadingContainer isLoading={false}>
        <div> This text IS NOT loading. </div>
      </LoadingContainer>
    </div>
  ),

  name: 'is not loading',
}
