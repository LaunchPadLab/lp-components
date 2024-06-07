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

export const WithOneMessage = () => (
  <FlashMessageContainer messages={[successMessage]} />
)

WithOneMessage.story = {
  name: 'with one message',
}

export const WithManyMessages = () => (
  <FlashMessageContainer
    messages={[successMessage, failureMessage, successMessage]}
  />
)

WithManyMessages.story = {
  name: 'with many messages',
}

export const WithNoMessagesBlank = () => <FlashMessageContainer messages={[]} />

WithNoMessagesBlank.story = {
  name: 'with no messages (blank)',
}
