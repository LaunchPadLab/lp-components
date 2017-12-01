import React from 'react'
import { storiesOf } from '@storybook/react'
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