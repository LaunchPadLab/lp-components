import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button } from 'src'

const onClick = action('clicked')

storiesOf('Button', module)
  .add('default', () => (
    <Button
      {...{
        onClick,
      }}
    >
      Click Me
    </Button>
  ))
  .add('variant: small', () => (
    <Button
      {...{
        onClick,
        variant: 'small',
      }}
    >
      Click Me
    </Button>
  ))
  .add('disabled', () => (
    <Button
      {...{
        onClick,
        pristine: true,
      }}
    >
      Click Me
    </Button>
  ))
  .add('submitting', () => (
    <Button
      {...{
        onClick,
        submitting: true,
      }}
    >
      Click Me
    </Button>
  ))
