import React from 'react'
import { shallow, mount } from 'enzyme'
import { InputLabel } from '../../../src/'

const name = 'person.firstName'
const formattedName = 'First Name'

test('when label is false - does not render a label', () => {
  const wrapper = shallow(<InputLabel name={name} label={false}/>)
  expect(wrapper.find('label').exists()).toEqual(false)
})

test('when hideLabel is true - does not render a label', () => {
  const wrapper = shallow(<InputLabel name={ name } hideLabel label="foo" />)
  expect(wrapper.find('label').exists()).toEqual(false)
})

test('when label not provided - renders a label with content equal to formatted input name', () => {
  const wrapper = shallow(<InputLabel name={name}/>)
  expect(wrapper.dive().find('label').text()).toEqual(formattedName)
})

test('when label provided - renders a label with content equal to string', () => {
  const wrapper = shallow(<InputLabel name={name} label="foo"/>)
  expect(wrapper.dive().find('label').text()).toEqual('foo')
})

test('when hint provided - shows hint', () => {
  const wrapper = shallow(<InputLabel name={name} hint="hint"/>)
  expect(wrapper.dive().find('label > i').text()).toEqual('hint')
})

test('when tooltip provided - shows tooltip trigger', () => {
  const wrapper = shallow(<InputLabel name={name} tooltip="tooltip"/>)
  expect(wrapper.dive().find('span.tooltip-trigger').exists()).toEqual(true)
})

test('when tooltip provided - toggle tooltip', () => {
  const wrapper = mount(<InputLabel name={name} tooltip="tooltip"/>)
  expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(false)
  wrapper.find('span.tooltip-trigger').simulate('click')
  expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(true)
  wrapper.find('span.tooltip-trigger').simulate('click')
  expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(false)
})
