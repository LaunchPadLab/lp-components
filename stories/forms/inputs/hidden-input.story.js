import React from 'react'
import { HiddenInput } from 'src'

const inputProps = {
  name: 'person.firstName',
}

export default {
  title: 'HiddenInput',
}

export const InDefaultStateHidden = {
  render: () => <HiddenInput input={inputProps} meta={{}} />,

  name: 'in default state (hidden)',
}
