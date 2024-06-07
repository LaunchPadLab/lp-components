import React from 'react'
import { action } from '@storybook/addon-actions'
import { FlashMessage } from 'src'

export default {
  title: 'FlashMessage',
}

export const Success = () => <FlashMessage>Success!</FlashMessage>

Success.story = {
  name: 'success',
}

export const Failure = () => <FlashMessage isError>Failure!</FlashMessage>

Failure.story = {
  name: 'failure',
}

export const Dismissable = () => (
  <FlashMessage onDismiss={action('Dismiss')}>Success!</FlashMessage>
)

Dismissable.story = {
  name: 'dismissable',
}
