import React from 'react'
import { mount } from 'enzyme'
import { FlashMessageContainer } from '../../src'

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

test('FlashMessageContainer displays all provided redux-flash messages', () => {
  const wrapper = mount(
    <FlashMessageContainer messages={[successMessage, failureMessage]} />
  )
  expect(wrapper.find('div.flash-message.success').exists()).toBe(true)
  expect(
    wrapper.find('div.flash-message.success > p').first().contains('Success!')
  ).toBe(true)
  expect(wrapper.find('div.flash-message.failure').exists()).toBe(true)
  expect(
    wrapper.find('div.flash-message.failure > p').first().contains('Failure!')
  ).toBe(true)
})

test('FlashMessageContainer passes down additional props to each message', () => {
  const wrapper = mount(
    <FlashMessageContainer
      messages={[successMessage, failureMessage]}
      data-test="flash"
    />
  )
  expect(wrapper.find('div.flash-message[data-test="flash"]').length).toEqual(2)
})

test('FlashMessageContainer props get overridden by message props', () => {
  const specialFailureMessage = {
    ...failureMessage,
    props: { 'data-test': 'error-flash' },
  }
  const wrapper = mount(
    <FlashMessageContainer
      messages={[successMessage, specialFailureMessage]}
      data-test="flash"
    />
  )
  expect(wrapper.find('div.flash-message[data-test="flash"]').length).toEqual(1)
  expect(
    wrapper.find('div.flash-message[data-test="error-flash"]').length
  ).toEqual(1)
})

test('FlashMessageContainer onDismiss gets invoked with message', () => {
  const onDismiss = jest.fn()
  const wrapper = mount(
    <FlashMessageContainer
      messages={[successMessage, failureMessage]}
      onDismiss={onDismiss}
    />
  )
  wrapper.find('div.flash-message.success > button').simulate('click')
  expect(onDismiss).toHaveBeenCalledTimes(1)
  expect(onDismiss).toHaveBeenCalledWith(successMessage)
})
