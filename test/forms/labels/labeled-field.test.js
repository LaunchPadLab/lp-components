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

test('hides error label with hideErrorLabel option', () => {
  const Wrapped = () => <input name="test"/>
  const props = { input: { name: 'foo' }, meta: { touched: true, invalid: true }, hideErrorLabel: true }
  const wrapper = mount(<LabeledField { ...props } ><Wrapped /></LabeledField>)
  // InputError
  expect(wrapper.find('.error-message').exists()).toEqual(false)
})

test('adds a custom label component', () => {
  const Wrapped = () => <input name="test" />
  const LabelComponent = () => <label>This is a custom label</label>
  const props = {
    input: {
      name: 'foo'
    },
    meta: {},
    labelComponent: LabelComponent,
  }
  
  const wrapper = mount(<LabeledField { ...props }><Wrapped /></LabeledField>)
  expect(wrapper.find('label').text()).toEqual('This is a custom label')
})

test('considers a custom label component to have higher precedence than a label prop', () => {
  const Wrapped = () => <input name="test" />
  const LabelComponent = () => <label>This is a custom label</label>
  const props = {
    input: {
      name: 'foo'
    },
    label: 'Standard Label',
    meta: {},
    labelComponent: LabelComponent,
  }
  
  const wrapper = mount(<LabeledField { ...props }><Wrapped /></LabeledField>)
  expect(wrapper.find('label').text()).toEqual('This is a custom label')
})

test('adds a custom error component', () => {
  const Wrapped = () => <input name="test" />
  const ErrorComponent = () => <span className="error">This is a custom error message</span>
  const props = {
    input: {
      name: 'foo'
    },
    meta: {},
    errorComponent: ErrorComponent,
  }
  
  const wrapper = mount(<LabeledField { ...props }><Wrapped /></LabeledField>)
  expect(wrapper.find('span.error').text()).toEqual('This is a custom error message')
})
