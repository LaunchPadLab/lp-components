import React from 'react'
import { mount } from 'enzyme'
import { Checkbox } from '../../../src/'

test('Checkbox toggles value when clicked', () => {
  const onChange = jest.fn()
  const props = { 
    input: {
      name: 'test',
      value: false,
      onChange,
    }, 
    meta: {} 
  }
  const wrapper = mount(<Checkbox { ...props }/>)
  wrapper.find('input').simulate('change')
  const newValue = onChange.mock.calls[0][0]
  expect(newValue).toEqual(true)
})