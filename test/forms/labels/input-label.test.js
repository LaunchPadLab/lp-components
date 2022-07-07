import React from 'react'
import { mount } from 'enzyme'
import { InputLabel } from '../../../src/'

const name = 'person.firstName'
const formattedName = 'First Name'

test('when label is false - does not render a label', () => {
  const wrapper = mount(<InputLabel name={name} label={false} />)
  expect(wrapper.find('label').exists()).toEqual(false)
})

test('when label not provided - renders a label with content equal to formatted input name', () => {
  const wrapper = mount(<InputLabel name={name} />)
  expect(wrapper.find('label').text()).toEqual(formattedName)
})

test('when label provided - renders a label with content equal to string', () => {
  const wrapper = mount(<InputLabel name={name} label="foo" />)
  expect(wrapper.find('label').text()).toEqual('foo')
})

test('when children are provided, renders a label with content equal to children', () => {
  const onClick = jest.fn()
  const wrapper = mount(
    <InputLabel name={name}>
      Are you <span onClick={onClick}>sure</span>?
    </InputLabel>
  )
  expect(wrapper.find('label').text()).toEqual('Are you sure?')
})

test('when children are provided, renders a label with custom interactions intact', () => {
  const onClick = jest.fn()
  const wrapper = mount(
    <InputLabel name={name}>
      Are you{' '}
      <span id="click" onClick={onClick}>
        sure
      </span>
      ?
    </InputLabel>
  )
  wrapper.find('#click').simulate('click')
  expect(onClick).toHaveBeenCalled()
})

test('when hint provided - shows hint', () => {
  const wrapper = mount(<InputLabel name={name} hint="hint" />)
  expect(wrapper.find('label > i').text()).toEqual('hint')
})

test('when tooltip provided - shows tooltip trigger', () => {
  const wrapper = mount(<InputLabel name={name} tooltip="tooltip" />)
  expect(wrapper.find('span.tooltip-trigger').exists()).toEqual(true)
})

test('when tooltip provided - toggle tooltip', () => {
  const wrapper = mount(<InputLabel name={name} tooltip="tooltip" />)
  expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(false)
  wrapper.find('span.tooltip-trigger').simulate('click')
  expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(true)
  wrapper.find('span.tooltip-trigger').simulate('click')
  expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(false)
})

test('when no custom required indicator provided, do not show required indicator', () => {
  const wrapper = mount(<InputLabel name={name} required />)
  expect(wrapper.find('span.required-indicator').exists()).toEqual(false)
})

test('when required true and custom requiredIndicator provided, show custom indicator', () => {
  const wrapper = mount(
    <InputLabel name={name} required requiredIndicator={'*'} />
  )
  expect(wrapper.find('label > span').text()).toEqual('*')
})

test('when id is _not_ provided - renders a label associated to the input name', () => {
  const wrapper = mount(<InputLabel name={name} label="foo" />)
  expect(wrapper.find('label').prop('htmlFor')).toBe(name)
})

test('when id is provided - renders a label associated to the input id', () => {
  const id = 'testId'
  const wrapper = mount(<InputLabel name={name} id={id} label="foo" />)
  expect(wrapper.find('label').prop('htmlFor')).toBe(id)
})

test('can accept a custom classname', () => {
  const wrapper = mount(<InputLabel name={name} className="foo" />)
  expect(wrapper.find('label').hasClass('foo')).toBe(true)
})
