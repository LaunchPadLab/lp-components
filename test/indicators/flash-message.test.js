import React from 'react'
import { mount } from 'enzyme'
import { FlashMessage } from '../../src/'

const successMessage = { id: '0', message: 'Success!', isError: false, props: {} }
const customMessage = { id: '0', message: 'Success!', isError: false, props: { className: 'foo', hidden: true } }

test('FlashMessage only shows dismiss button when callback is provided', () => {
  const wrapper = mount(
    <FlashMessage message={ successMessage } />
  )
  expect(wrapper.find('button.dismiss').exists()).toBe(false)
  const dismissWrapper = mount(
    <FlashMessage message={ successMessage } onDismiss={ () => { /* do something */ } } />
  )
  expect(dismissWrapper.find('button.dismiss').exists()).toBe(true)
})

test('FlashMessage accepts props from message object', () => {
  const wrapper = mount(
    <FlashMessage message={ customMessage } />
  )
  expect(wrapper.find('div.foo').exists()).toBe(true)
  expect(wrapper.find('div').prop('hidden')).toBe(true)
})
