import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { InputError } from '../src'

storiesOf('InputError', module)
  .add('with a single error', () => (
    <InputError 
      error="An error occurred"
      invalid={true}
      touched={true}
    />
  ))
  .add('with multiple errors', () => (
    <InputError 
      error={['An error occurred', 'Another error occurred']}
      invalid={true}
      touched={true}
    />
  ))