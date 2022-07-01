import React from 'react'
import { mount } from 'enzyme'
import { ColorPicker } from '../../src/'

test('ColorPicker toggles expanded when swatch is clicked', () => {
  const wrapper = mount(<ColorPicker />)
  expect(wrapper.find('.popover').exists()).toBe(false)
  wrapper.find('.swatch').simulate('click')
  expect(wrapper.find('.popover').exists()).toBe(true)
  wrapper.find('.swatch').simulate('click')
  expect(wrapper.find('.popover').exists()).toBe(false)
})

test('ColorPicker collapses when background is clicked', () => {
  const wrapper = mount(<ColorPicker />)
  wrapper.find('.swatch').simulate('click')
  expect(wrapper.find('.popover').exists()).toBe(true)
  wrapper.find('.cover').simulate('click')
  expect(wrapper.find('.popover').exists()).toBe(false)
})

test('ColorPicker can be externally controlled', () => {
  const wrapper = mount(<ColorPicker active={true} />)
  expect(wrapper.find('.popover').exists()).toBe(true)
  wrapper.setProps({ active: false })
  expect(wrapper.find('.popover').exists()).toBe(false)
})
