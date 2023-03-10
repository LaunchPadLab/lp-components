import React from 'react'
import { mount } from 'enzyme'
import { LabeledFieldset } from '../../../src'

test('wraps children in fieldset', () => {
  const Wrapped = () => <input name="test" />
  const props = { input: { name: 'foo' }, meta: {} }
  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  expect(wrapper.find('fieldset').exists()).toEqual(true)
  expect(wrapper.find('fieldset').hasClass('error')).toEqual(false)
})

test('adds error class when touched and invalid', () => {
  const Wrapped = () => <input name="test" />
  const props = {
    input: { name: 'foo' },
    meta: { touched: true, invalid: true },
  }
  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  expect(wrapper.find('fieldset').hasClass('error')).toEqual(true)
})

test('adds disabled class when disabled', () => {
  const Wrapped = () => <input name="test" />
  const props = { input: { name: 'foo' }, meta: {}, disabled: true }
  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  expect(wrapper.find('fieldset').hasClass('disabled')).toEqual(true)
})

test('adds FieldsetLegend and InputError', () => {
  const Wrapped = () => <input name="test" />
  const props = {
    input: { name: 'foo' },
    meta: { touched: true, invalid: true },
  }
  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  // FieldsetLegend
  expect(wrapper.find('legend').text()).toEqual('Foo')
  // InputError
  expect(wrapper.find('.error-message').exists()).toEqual(true)
})

test('hides error label with hideErrorLabel option', () => {
  const Wrapped = () => <input name="test" />
  const props = {
    input: { name: 'foo' },
    meta: { touched: true, invalid: true },
    hideErrorLabel: true,
  }
  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  // InputError
  expect(wrapper.find('.error-message').exists()).toEqual(false)
})

test('adds a custom label component', () => {
  const Wrapped = () => <input name="test" />
  const LabelComponent = () => <legend>This is a custom legend</legend>
  const props = {
    input: {
      name: 'foo',
    },
    meta: {},
    labelComponent: LabelComponent,
  }

  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  expect(wrapper.find('legend').text()).toEqual('This is a custom legend')
})

test('passes custom props to a custom label component', () => {
  const Wrapped = () => <input name="test" />
  // eslint-disable-next-line
  const LabelComponent = ({ customHint }) => (
    <legend>
      This is a custom legend. <span>{customHint}</span>
    </legend>
  )
  const props = {
    input: {
      name: 'foo',
    },
    meta: {},
    customHint: 'Hi!',
    labelComponent: LabelComponent,
  }

  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  expect(wrapper.find('legend > span').text()).toEqual('Hi!')
})

test('considers a custom label component to have higher precedence than a label prop', () => {
  const Wrapped = () => <input name="test" />
  const LabelComponent = () => <legend>This is a custom legend</legend>
  const props = {
    input: {
      name: 'foo',
    },
    label: 'Standard Label',
    meta: {},
    labelComponent: LabelComponent,
  }

  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  expect(wrapper.find('legend').text()).toEqual('This is a custom legend')
})

test('adds a custom error component', () => {
  const Wrapped = () => <input name="test" />
  const ErrorComponent = () => (
    <span className="error">This is a custom error message</span>
  )
  const props = {
    input: {
      name: 'foo',
    },
    meta: {},
    errorComponent: ErrorComponent,
  }

  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  expect(wrapper.find('span.error').text()).toEqual(
    'This is a custom error message'
  )
})

test('passes custom props to a custom error component', () => {
  const Wrapped = () => <input name="test" />
  // eslint-disable-next-line
  const ErrorComponent = ({ customHint }) => (
    <span className="error">
      This is a custom error message<span>{customHint}</span>
    </span>
  )
  const props = {
    input: {
      name: 'foo',
    },
    meta: {},
    errorComponent: ErrorComponent,
    customHint: 'Hi!',
  }

  const wrapper = mount(
    <LabeledFieldset {...props}>
      <Wrapped />
    </LabeledFieldset>
  )
  expect(wrapper.find('span > span').text()).toEqual('Hi!')
})
