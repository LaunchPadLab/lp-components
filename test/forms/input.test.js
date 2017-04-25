import React from 'react'
import { shallow, render } from 'enzyme'
import { Input } from '../../src/'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }
const formattedName = 'Field'
const label = 'label'
const error = 'input error'

/* 
  Note: when using render(), we have to use length instead of exists() 
  because it's implemented using the Cheerio API.
  https://github.com/cheeriojs/cheerio/issues/798
*/

test('when label not provided - renders a label with content equal to formatted input name', () => {
  const props = { input, meta: {} }
  const wrapper = render(<Input { ...props }/>)
  expect(wrapper.find('label').text()).toBe(formattedName)
})

test('when label is a string - renders a label with content equal to string', () => {
  const props = { input, meta: {}, label }
  const wrapper = render(<Input { ...props }/>)
  expect(wrapper.find('label').text()).toBe(label)
})

test('when label is false - does not render a label', () => {
  const props = { input, meta: {}, label: 'hey!' }
  const wrapper = render(<Input { ...props }/>)
  expect(wrapper.find('label').length).toBe(1)
})

test('when error not provided - does not render the error message', () => {
  const props = { input, meta: {} }
  const wrapper = render(<Input { ...props }/>)
  expect(wrapper.find('.error-message').length).toBe(0)
})

test('if input is invalid but not touched - does not add error class to container', () => {
  const props = { input, meta: { invalid: true, touched: false } }
  const wrapper = shallow(<Input { ...props }/>)
  expect(wrapper.find('.error').exists()).toBe(false)
})

test('if input is touched but not invalid - does not add error class to container', () => {
  const props = { input, meta: { invalid: false, touched: true } }
  const wrapper = shallow(<Input { ...props }/>)
  expect(wrapper.find('.error').exists()).toBe(false)
})

test('if input is touched and invalid - adds the error class to container', () => {
  const props = { input, meta: { invalid: true, touched: true } }
  const wrapper = shallow(<Input { ...props }/>)
  expect(wrapper.dive().find('.error').exists()).toBe(true)
})

test('when error is provided - renders the error message containing the error', () => {
  const props = { input, meta: { invalid: true, touched: true, error } }
  const wrapper = render(<Input { ...props }/>)
  expect(wrapper.find('.error-message').text()).toBe(error)
})
