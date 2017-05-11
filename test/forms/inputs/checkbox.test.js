import React from 'react'
import { shallow } from 'enzyme'
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
  const wrapper = shallow(<Checkbox { ...props }/>)
  wrapper.dive().find('input').simulate('change')
  const newValue = onChange.mock.calls[0][0]
  expect(newValue).toEqual(true)
})