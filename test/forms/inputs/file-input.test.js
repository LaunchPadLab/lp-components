import React from 'react'
import { mount } from 'enzyme'
import { FileInput } from '../../../src/'

const name = 'my.file.input'

test('Fileinput renders thumbnail with value as src', () => {
  const value = 'foo'
  const props = { input: { name, value }, meta: {} }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('img').props().src).toEqual(value)
})

test('Fileinput sets thumbnail placeholder', () => {
  const thumbnail = 'thumb'
  const props = { input: { name, value: '' }, meta: {}, thumbnail }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('img').props().src).toEqual(thumbnail)
})

test('Fileinput hides preview correctly', () => {
  const props = { input: { name, value: '' }, meta: {}, hidePreview: true }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('img').exists()).toEqual(false)
})

test('Fileinput sets custom preview correctly', () => {
  const Preview = () => <blink> My preview </blink>
  const props = { input: { name, value: '' }, meta: {} }
  const wrapper = mount(<FileInput { ...props }><Preview/></FileInput>)
  expect(wrapper.find('blink').exists()).toEqual(true)
})