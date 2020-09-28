import React from 'react'
import { mount } from 'enzyme'
import { FlashMessage } from '../../src/'

test('FlashMessage only shows dismiss button when callback is provided', () => {
  const wrapper = mount(<FlashMessage>Success!</FlashMessage>)
  expect(wrapper.find('button.dismiss').exists()).toBe(false)
  const dismissWrapper = mount(
    <FlashMessage
      onDismiss={() => {
        /* do something */
      }}
    >
      Success!
    </FlashMessage>
  )
  expect(dismissWrapper.find('button.dismiss').exists()).toBe(true)
})

test('FlashMessage sets class based on isError prop', () => {
  const wrapper = mount(<FlashMessage>Success!</FlashMessage>)
  expect(wrapper.find('div.success').exists()).toBe(true)
  expect(wrapper.find('div.failure').exists()).toBe(false)
  const errorWrapper = mount(<FlashMessage isError>Failure!</FlashMessage>)
  expect(errorWrapper.find('div.success').exists()).toBe(false)
  expect(errorWrapper.find('div.failure').exists()).toBe(true)
})
