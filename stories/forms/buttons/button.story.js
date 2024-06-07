import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button } from 'src'

const onClick = action('clicked')

export default {
  title: 'Button',
}

export const Default = {
  render: () => (
    <Button
      {...{
        onClick,
      }}
    >
      Click Me
    </Button>
  ),

  name: 'default',
}

export const VariantSmall = {
  render: () => (
    <Button
      {...{
        onClick,
        variant: 'small',
      }}
    >
      Click Me
    </Button>
  ),

  name: 'variant: small',
}

export const Disabled = {
  render: () => (
    <Button
      {...{
        onClick,
        pristine: true,
      }}
    >
      Click Me
    </Button>
  ),

  name: 'disabled',
}

export const Submitting = {
  render: () => (
    <Button
      {...{
        onClick,
        submitting: true,
      }}
    >
      Click Me
    </Button>
  ),

  name: 'submitting',
}
