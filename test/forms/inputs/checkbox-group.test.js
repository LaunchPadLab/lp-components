import React from 'react'
import { mount } from 'enzyme'
import { CheckboxGroup } from '../../../src/'

test('CheckboxGroup adds value to array when unselected option clicked', () => {
  const onChange = jest.fn()
  const TOGGLED_OPTION = 'TOGGLED_OPTION'
  const props = { 
    input: {
      name: 'test',
      value: [],
      onChange,
    }, 
    meta: {},
    options: [TOGGLED_OPTION]
  }
  const wrapper = mount(<CheckboxGroup { ...props }/>)
  wrapper.find('input').simulate('change')
  const newValue = onChange.mock.calls[0][0]
  expect(newValue).toEqual([TOGGLED_OPTION])
})

test('CheckboxGroup removes value to array when selected option clicked', () => {
  const onChange = jest.fn()
  const TOGGLED_OPTION = 'TOGGLED_OPTION'
  const props = { 
    input: {
      name: 'test',
      value: [TOGGLED_OPTION],
      onChange,
    }, 
    meta: {},
    options: [TOGGLED_OPTION]
  }
  const wrapper = mount(<CheckboxGroup { ...props }/>)
  wrapper.find('input').simulate('change')
  const newValue = onChange.mock.calls[0][0]
  expect(newValue).toEqual([])
})