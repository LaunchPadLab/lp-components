import React from 'react'
import { InputError } from 'src'

export default {
  title: 'InputError',
}

export const WithASingleError = () => (
  <InputError error="An error occurred" invalid={true} touched={true} />
)

WithASingleError.story = {
  name: 'with a single error',
}

export const WithMultipleErrors = () => (
  <InputError
    error={['An error occurred', 'Another error occurred']}
    invalid={true}
    touched={true}
  />
)

WithMultipleErrors.story = {
  name: 'with multiple errors',
}
