import React from 'react'
import { render, mount } from 'enzyme'
import { DateInput } from '../../../src/'

const name = 'name.of.field'
const value = '2020-01-01'
const onChange = jest.fn()
const input = { name, value, onChange }
const error = 'input error'

/* 
  Note: when using render(), we have to use length instead of exists() 
  because it's implemented using the Cheerio API.
  https://github.com/cheeriojs/cheerio/issues/798
*/

test('DateInput renders the error message when provided', () => {
  const props = { input, meta: { invalid: true, touched: true, error } }
  const wrapper = render(<DateInput { ...props }/>)
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

