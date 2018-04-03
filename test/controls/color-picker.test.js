import React from 'react'
import { mount } from 'enzyme'
import { ColorPicker } from '../../src/'

test('ColorPicker expands when swatch is clicked', () => {
  const wrapper = mount(<ColorPicker />)
  expect(wrapper.find('.popover').exists()).toBe(false)
  wrapper.find('.swatch').simulate('click')
  expect(wrapper.find('.popover').exists()).toBe(true)
})

// test('ColorInput collapses when blurred', () => {
//   const props = { 
//     input: {
//       name: 'test',
//       value: '',
//     }, 
//     meta: {},
//   }
//   const wrapper = mount(<ColorInput { ...props }/>)
//   expect(wrapper.find('.popover').exists()).toBe(false)
//   wrapper.find('.hex-input').simulate('focus')
//   expect(wrapper.find('.popover').exists()).toBe(true)
// })
