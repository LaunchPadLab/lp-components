import React from 'react'
import { mount } from 'enzyme'
import { Switch } from '../../../src'

test('Switch toggles value when clicked', () => {
  const onChange = jest.fn()
  const props = {
    input: {
      name: 'test',
      value: false,
      onChange,
    },
    meta: {},
  }
  const wrapper = mount(<Switch {...props} />)
  wrapper.find('input').simulate('change')
  const newValue = onChange.mock.calls[0][0]
  expect(newValue).toEqual(true)
})

test('Switch is given an aria-describedby attribute when there is an input error', () => {
  const name = 'test'
  const props = {
    input: {
      name,
      value: false,
    },
    meta: {
      touched: true,
      invalid: true,
    },
  }
  const wrapper = mount(<Switch {...props} />)
  expect(wrapper.find('input').prop('aria-describedby')).toContain(name)
})
