import React from 'react'
import { mount } from 'enzyme'
import { RangeInput } from '../../../src/'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }

test('RangeInput hides the value label when `hideLabel` is `true`', () => {
  const props = { input, hideLabel: true, meta: {} }
  const wrapper = mount(<RangeInput { ...props }/>)
  expect(wrapper.find('.range-value').exists()).toBe(false)
})

test('RangeInput sets the `min`, `max`, and `step` correctly', () => {
  const props = { input, min: 5, max: 50, step: 10, meta: {} }
  const wrapper = mount(<RangeInput { ...props }/>)
  expect(wrapper.find('input').props().min).toEqual(5)
  expect(wrapper.find('input').props().max).toEqual(50)
  expect(wrapper.find('input').props().step).toEqual(10)
})