import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { HiddenInput } from 'src'

const inputProps = {
  name: 'person.firstName'
}

storiesOf('HiddenInput', module)
  .add('in default state (hidden)', () => (
    <HiddenInput 
      input={inputProps} 
      meta={{}}
    />
  ))