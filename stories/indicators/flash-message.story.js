import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { FlashMessage } from 'src'

const successMessage = { id: '0', message: 'Success!', isError: false, props: {} }
const failureMessage = { id: '1', message: 'Failure!', isError: true, props: {} }

storiesOf('FlashMessage', module)
  .add('success', () => (
    <FlashMessage message={ successMessage } />
  ))
  .add('failure', () => (
    <FlashMessage message={ failureMessage }  />
  ))
  .add('dismissable', () => (
    <FlashMessage message={ successMessage } onDismiss={ action('Dismiss') }  />
  ))
  .add('with custom prop ("hidden")', () => (
    <FlashMessage message={ { ...successMessage, props: { hidden: true } }} />
  ))