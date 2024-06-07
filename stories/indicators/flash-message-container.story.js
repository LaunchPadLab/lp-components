import React from 'react'
import { FlashMessageContainer } from 'src'

const successMessage = {
  id: '0',
  message: 'Success!',
  isError: false,
  props: {},
}
const failureMessage = {
  id: '1',
  message: 'Failure!',
  isError: true,
  props: {},
}

export default {
  title: 'FlashMessageContainer',
}

export const WithOneMessage = {
  render: () => <FlashMessageContainer messages={[successMessage]} />,

  name: 'with one message',
}

export const WithManyMessages = {
  render: () => (
    <FlashMessageContainer
      messages={[successMessage, failureMessage, successMessage]}
    />
  ),

  name: 'with many messages',
}

export const WithNoMessagesBlank = {
  render: () => <FlashMessageContainer messages={[]} />,
  name: 'with no messages (blank)',
}
