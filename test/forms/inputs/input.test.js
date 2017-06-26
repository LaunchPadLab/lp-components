import React from 'react'
import { mount } from 'enzyme'
import { Input } from '../../../src/'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }

test('Input defaults to text input', () => {
  const props = { input, meta: {} }
  const wrapper = mount(<Input { ...props }/>)
  expect(wrapper.find('input').prop('type')).toBe('text')
})

test('Input contains div with class input-wrapper', () => {
  const props = { input, meta: {} }
  const wrapper = mount(<Input { ...props }/>)
  expect(wrapper.find('div.input-wrapper').exists()).toBe(true)
})

test('Input renders children', () => {
  const Wrapped = () => <blink> I'm a child component </blink> 
  const props = { input, meta: {} }
  const wrapper = mount(<Input { ...props }><Wrapped /></Input>)
  expect(wrapper.find('blink').exists()).toBe(true)
})
