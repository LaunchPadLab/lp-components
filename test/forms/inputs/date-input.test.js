import React from 'react'
import { mount } from 'enzyme'
import { DateInput } from '../../../src/'

const name = 'name.of.field'
const value = '2020-01-01'
const noop = () => {}
const input = { name, value, onChange: noop }
const error = 'input error'

test('DateInput renders the error message when provided', () => {
  const props = { input, meta: { invalid: true, touched: true, error } }
  const wrapper = mount(<DateInput { ...props }/>)
  expect(wrapper.find('.error-message').text()).toBe(error)
})

test('DateInput updates the value on change', () => {
  const props = { input, meta: {} }
  const wrapper = mount(<DateInput { ...props }/>)
  expect(wrapper.find('input').props().value).toEqual('01/01/2020')
  
  const newValue = '2020-02-02'
  wrapper.find('input').simulate('change', { target: { value: newValue } })
  expect(wrapper.find('input').props().value).toEqual(newValue)
})

test('DateInput sets the placeholder text correctly', () => {
  const props = { input, meta: {}, placeholderText: 'Test Placeholder' }
  const wrapper = mount(<DateInput { ...props }/>)
  expect(wrapper.find('input').props().placeholder).toEqual('Test Placeholder')
})

test('DateInput invokes onChange with a Date object', () => {
  const onChange = jest.fn()
  const props = { input: { ...input, onChange, onBlur: noop }, meta: {} }
  const wrapper = mount(<DateInput { ...props }/>)  

  wrapper.find('input').simulate('click')
  wrapper.find('.react-datepicker__day').at(0).simulate('click')

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange.mock.calls[0][0] instanceof Date).toBe(true)
})
