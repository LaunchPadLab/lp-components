import React from 'react'
import { action } from '@storybook/addon-actions'
import { FlashMessage } from 'src'

export default {
  title: 'FlashMessage',
}

export const Success = {
  render: () => <FlashMessage>Success!</FlashMessage>,
  name: 'success',
}

export const Failure = {
  render: () => <FlashMessage isError>Failure!</FlashMessage>,
  name: 'failure',
}

export const Dismissable = {
  render: () => (
    <FlashMessage onDismiss={action('Dismiss')}>Success!</FlashMessage>
  ),

  name: 'dismissable',
}
