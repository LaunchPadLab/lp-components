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
    wrapper
      .find('div.flash-message.success > p')
      .first()
      .contains('Success!')
  ).toBe(true)
  expect(wrapper.find('div.flash-message.failure').exists()).toBe(true)
  expect(
    wrapper
      .find('div.flash-message.failure > p')
      .first()
      .contains('Failure!')
  ).toBe(true)
})
