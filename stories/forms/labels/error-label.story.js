import React from 'react'
import { ErrorLabel } from 'src'

export default {
  title: 'ErrorLabel',
}

export const WithASingleError = {
  render: () => <ErrorLabel>An error occurred</ErrorLabel>,
  name: 'with a single error',
}
