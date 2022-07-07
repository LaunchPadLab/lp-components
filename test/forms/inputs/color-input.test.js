import React from 'react'
import { mount } from 'enzyme'
import { ColorInput } from '../../../src/'

test('ColorInput hex input adds hash to value', () => {
  const onChange = jest.fn()
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
  }
  const wrapper = mount(<ColorInput {...props} />)
  wrapper.find('.hex-input').simulate('change', { target: { value: '000' } })
  expect(onChange).toHaveBeenCalledWith('#000')
})

test('ColorInput expands dropdown when hex input is focused', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
  }
  const wrapper = mount(<ColorInput {...props} />)
  expect(wrapper.find('.popover').exists()).toBe(false)
  wrapper.find('.hex-input').simulate('focus')
  expect(wrapper.find('.popover').exists()).toBe(true)
})
