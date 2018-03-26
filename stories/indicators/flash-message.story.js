import React from 'react'
import { storiesOf } from '@storybook/react'
import { FlashMessage } from 'src'

const successMessage = { id: 0, message: 'Success!', isError: false }
const failureMessage = { id: 1, message: 'Failure!', isError: true }

storiesOf('FlashMessage', module)
  .add('success', () => (
    <FlashMessage message={ successMessage } />
  ))
  .add('failure', () => (
    <FlashMessage message={ failureMessage }  />
  ))