import React from 'react'
import { mount } from 'enzyme'
import { ColorPicker } from '../../src/'

// TODO: Migrate after incoming change to use a button instead of a div
// https://github.com/LaunchPadLab/lp-components/pull/596

test('ColorPicker toggles expanded when swatch is clicked', () => {
  const wrapper = mount(<ColorPicker />)
  expect(wrapper.find('.popover').exists()).toBe(false)
  wrapper.find('.swatch').simulate('click')
  expect(wrapper.find('.popover').exists()).toBe(true)
  wrapper.find('.swatch').simulate('click')
  expect(wrapper.find('.popover').exists()).toBe(false)
})

test('ColorPicker can be externally controlled', () => {
  const wrapper = mount(<ColorPicker active={true} />)
  expect(wrapper.find('.popover').exists()).toBe(true)
  wrapper.setProps({ active: false })
  expect(wrapper.find('.popover').exists()).toBe(false)
})
