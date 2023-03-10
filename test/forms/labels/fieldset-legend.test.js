import React from 'react'
import { mount } from 'enzyme'
import { FieldsetLegend } from '../../../src'

const name = 'person.firstName'
const formattedName = 'First Name'

test('when label is false - does not render a legend', () => {
  const wrapper = mount(<FieldsetLegend name={name} label={false} />)
  expect(wrapper.find('legend').exists()).toEqual(false)
})

test('when label not provided - renders a legend with content equal to formatted input name', () => {
  const wrapper = mount(<FieldsetLegend name={name} />)
  expect(wrapper.find('legend').text()).toEqual(formattedName)
})

test('when label provided - renders a legend with content equal to string', () => {
  const wrapper = mount(<FieldsetLegend name={name} label="foo" />)
  expect(wrapper.find('legend').text()).toEqual('foo')
})

test('when children are provided, renders a legend with content equal to children', () => {
  const onClick = jest.fn()
  const wrapper = mount(
    <FieldsetLegend name={name}>
      Are you <span onClick={onClick}>sure</span>?
    </FieldsetLegend>
  )
  expect(wrapper.find('legend').text()).toEqual('Are you sure?')
})

test('when children are provided, renders a legend with custom interactions intact', () => {
  const onClick = jest.fn()
  const wrapper = mount(
    <FieldsetLegend name={name}>
      Are you{' '}
      <span id="click" onClick={onClick}>
        sure
      </span>
      ?
    </FieldsetLegend>
  )
  wrapper.find('#click').simulate('click')
  expect(onClick).toHaveBeenCalled()
})

test('when hint provided - shows hint', () => {
  const wrapper = mount(<FieldsetLegend name={name} hint="hint" />)
  expect(wrapper.find('legend > i').text()).toEqual('hint')
})

test('when tooltip provided - shows tooltip trigger', () => {
  const wrapper = mount(<FieldsetLegend name={name} tooltip="tooltip" />)
  expect(wrapper.find('span.tooltip-trigger').exists()).toEqual(true)
})

test('when tooltip provided - toggle tooltip', () => {
  const wrapper = mount(<FieldsetLegend name={name} tooltip="tooltip" />)
  expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(false)
  wrapper.find('span.tooltip-trigger').simulate('click')
  expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(true)
  wrapper.find('span.tooltip-trigger').simulate('click')
  expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(false)
})

test('when no custom required indicator provided, do not show required indicator', () => {
  const wrapper = mount(<FieldsetLegend name={name} required />)
  expect(wrapper.find('span.required-indicator').exists()).toEqual(false)
})

test('when required true and custom requiredIndicator provided, show custom indicator', () => {
  const wrapper = mount(
    <FieldsetLegend name={name} required requiredIndicator={'*'} />
  )
  expect(wrapper.find('legend > span').text()).toEqual('*')
})

test('can accept a custom classname', () => {
  const wrapper = mount(<FieldsetLegend name={name} className="foo" />)
  expect(wrapper.find('legend').hasClass('foo')).toBe(true)
})
