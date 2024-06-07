import React from 'react'
import { InputError } from 'src'

export default {
  title: 'InputError',
}

export const WithASingleError = {
  render: () => (
    <InputError error="An error occurred" invalid={true} touched={true} />
  ),

  name: 'with a single error',
}

export const WithMultipleErrors = {
  render: () => (
    <InputError
      error={['An error occurred', 'Another error occurred']}
      invalid={true}
      touched={true}
    />
  ),

  name: 'with multiple errors',
}
