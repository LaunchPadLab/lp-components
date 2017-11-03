import { replaceEmptyStringValue } from '../../../src/'
import React from 'react'
import { mount } from 'enzyme'

test('has correct displayName', () => {
  const MyInput = () => <input />
  const WrappedInput = replaceEmptyStringValue()(MyInput)
  expect(WrappedInput.displayName).toEqual('replaceEmptyStringValue(MyInput)')
})

test('replaces empty string with given value', () => {
  const MyInput = () => <input />
  const WrappedInput = replaceEmptyStringValue('foo')(MyInput)
  const wrapper = mount(<WrappedInput {...{ input: { value: '' }, meta: {} }} />)
  expect(wrapper.find(MyInput).props().input.value).toEqual('foo')
})

test("doesn't replace other values", () => {
  const MyInput = () => <input />
  const WrappedInput = replaceEmptyStringValue('foo')(MyInput)
  const wrapper = mount(<WrappedInput {...{ input: { value: 'other' }, meta: {} }} />)
  expect(wrapper.find(MyInput).props().input.value).toEqual('other')
})
