import React from 'react'
import { mount } from 'enzyme'
import { LabeledField } from '../../../src/'

test('wraps children in fieldset', () => {
  const Wrapped = () => <input name="test"/>
  const props = { input: { name: 'foo' }, meta: {} }
  const wrapper = mount(<LabeledField { ...props } ><Wrapped /></LabeledField>)
  expect(wrapper.find('fieldset').exists()).toEqual(true)
  expect(wrapper.find('fieldset').hasClass('error')).toEqual(false)
})

test('adds error class when touched and invalid', () => {
  const Wrapped = () => <input name="test"/>
  const props = { input: { name: 'foo' }, meta: { touched: true, invalid: true } }
  const wrapper = mount(<LabeledField { ...props } ><Wrapped /></LabeledField>)
  expect(wrapper.find('fieldset').hasClass('error')).toEqual(true)
})

test('adds InputLabel and InputError', () => {
  const Wrapped = () => <input name="test"/>
  const props = { input: { name: 'foo' }, meta: { touched: true, invalid: true } }
  const wrapper = mount(<LabeledField { ...props } ><Wrapped /></LabeledField>)
  // InputLabel
  expect(wrapper.find('label').text()).toEqual('Foo')
  // InputError
  expect(wrapper.find('.error-message').exists()).toEqual(true)
})
