import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button } from 'src'

const onClick = action('clicked')

export default {
  title: 'Button',
}

export const Default = () => (
  <Button
    {...{
      onClick,
    }}
  >
    Click Me
  </Button>
)

Default.story = {
  name: 'default',
}

export const VariantSmall = () => (
  <Button
    {...{
      onClick,
      variant: 'small',
    }}
  >
    Click Me
  </Button>
)

VariantSmall.story = {
  name: 'variant: small',
}

export const Disabled = () => (
  <Button
    {...{
      onClick,
      pristine: true,
    }}
  >
    Click Me
  </Button>
)

Disabled.story = {
  name: 'disabled',
}

export const Submitting = () => (
  <Button
    {...{
      onClick,
      submitting: true,
    }}
  >
    Click Me
  </Button>
)

Submitting.story = {
  name: 'submitting',
}
