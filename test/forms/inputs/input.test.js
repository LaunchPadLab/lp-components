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
  expect(wrapper.find('input').prop('type')).toEqual('text')
})

test('Input contains div with class input-wrapper', () => {
  const props = { input, meta: {} }
  const wrapper = mount(<Input { ...props }/>)
  expect(wrapper.find('div.input-wrapper').exists()).toEqual(true)
})

test('Input renders children', () => {
  const Wrapped = () => <p> I'm a child component </p> 
  const props = { input, meta: {} }
  const wrapper = mount(<Input { ...props }><Wrapped /></Input>)
  expect(wrapper.find(Wrapped).exists()).toEqual(true)
})

test('Input is given an aria described by attribute', () => {
  const props = { input, meta: {} }
  const wrapper = mount(<Input { ...props }/>)
  expect(wrapper.find('input').prop('aria-describedby')).toContain(name)
})
