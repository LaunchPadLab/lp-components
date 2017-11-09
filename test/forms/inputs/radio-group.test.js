import React from 'react'
import { mount } from 'enzyme'
import { RadioGroup } from '../../../src/'

test('RadioGroup changes value when buttons are clicked', () => {
  const onChange = jest.fn()
  const props = { 
    input: {
      name: 'test',
      value: '',
      onChange,
    }, 
    meta: {},
    options: ['Option 1', 'Option 2']
  }
  const wrapper = mount(<RadioGroup { ...props }/>)
  wrapper.find('input').first().simulate('change')
  expect(onChange).toHaveBeenCalledWith('Option 1') 
  wrapper.find('input').last().simulate('change')
  expect(onChange).toHaveBeenCalledWith('Option 2')
})
