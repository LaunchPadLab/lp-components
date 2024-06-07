import React from 'react'
import { ErrorLabel } from 'src'

export default {
  title: 'ErrorLabel',
}

export const WithASingleError = () => <ErrorLabel>An error occurred</ErrorLabel>

WithASingleError.story = {
  name: 'with a single error',
}
