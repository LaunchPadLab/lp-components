import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { FlashMessage } from 'src'

storiesOf('FlashMessage', module)
  .add('success', () => <FlashMessage>Success!</FlashMessage>)
  .add('failure', () => <FlashMessage isError>Failure!</FlashMessage>)
  .add('dismissable', () => (
    <FlashMessage onDismiss={action('Dismiss')}>Success!</FlashMessage>
  ))
