import React from 'react'
import { HiddenInput } from 'src'

const inputProps = {
  name: 'person.firstName',
}

export default {
  title: 'HiddenInput',
}

export const InDefaultStateHidden = () => (
  <HiddenInput input={inputProps} meta={{}} />
)

InDefaultStateHidden.story = {
  name: 'in default state (hidden)',
}
