import React from 'react'
import { mount } from 'enzyme'
import { HiddenInput } from '../../../src/'

const name = 'my.hidden.input'
const value = 'foo'
const onChange = jest.fn()
const props = { input: { name, value, onChange }, meta: {} }

test('HiddenInput renders an input', () => {
  const wrapper = mount(<HiddenInput { ...props }/>)
  expect(wrapper.find('input').exists()).toEqual(true)
})

test('HiddenInput renders a div the correct styles', () => {
  const wrapper = mount(<HiddenInput { ...props }/>)
  expect(wrapper.find('div').first().props().style).toHaveProperty('position', 'absolute')
  expect(wrapper.find('div').first().props().style).toHaveProperty('left', -9999)
  expect(wrapper.find('div').first().props().style).toHaveProperty('visibility', 'hidden')
})
