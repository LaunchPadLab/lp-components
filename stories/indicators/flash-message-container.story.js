import React from 'react'
import { storiesOf } from '@storybook/react'
import { FlashMessageContainer } from 'src'

const successMessage = { id: '0', message: 'Success!', isError: false, props: {} }
const failureMessage = { id: '1', message: 'Failure!', isError: true, props: {} }

storiesOf('FlashMessageContainer', module)
  .add('with one message', () => (
    <FlashMessageContainer messages={[ successMessage ]} />
  ))
  .add('with many messages', () => (
    <FlashMessageContainer messages={[ successMessage, failureMessage, successMessage ]}  />
  ))
  .add('with no messages (blank)', () => (
    <FlashMessageContainer messages={[]}  />
  ))