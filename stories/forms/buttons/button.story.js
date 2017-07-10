import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Button } from 'src'

const onClick = action('clicked')

storiesOf('Button', module)
  .add('default', () => (
    <Button
      {...{
        onClick
      }}
    >
      Click Me
    </Button>
  ))
  .add('style: small', () => (
    <Button
      {...{
        onClick,
        style: 'small'
      }}
    >
      Click Me
    </Button>
  ))
  .add('disabled', () => (
    <Button
      {...{
        onClick,
        pristine: true
      }}
    >
      Click Me
    </Button>
  ))
  .add('submitting', () => (
    <Button
      {...{
        onClick,
        submitting: true
      }}
    >
      Click Me
    </Button>
  ))