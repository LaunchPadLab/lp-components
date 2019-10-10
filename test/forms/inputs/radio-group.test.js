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

test('A RadioGroup\'s inputs all have the same name', () => {
  const name = "sameName"
  const props = { 
    input: {
      name,
      value: '',
    }, 
    meta: {},
    options: ['Option 1', 'Option 2']
  }
  const wrapper = mount(<RadioGroup { ...props }/>)
  expect(wrapper.find('input').first().prop('name')).toEqual(name)
  expect(wrapper.find('input').last().prop('name')).toEqual(name)
})

test('A RadioGroup has a legend with the group\'s name by default', () => {
  const name = "sameName"
  const props = { 
    input: {
      name,
      value: '',
    }, 
    meta: {},
    options: ['Option 1', 'Option 2']
  }
  const wrapper = mount(<RadioGroup { ...props }/>)
  const legend = wrapper.find('fieldset').first().find('legend')
  expect(legend).toBeTruthy()
  expect(legend.text()).toEqual('Same Name')
})

test('A RadioGroup has a legend with the group\'s label (when provided)', () => {
  const name = "sameName"
  const props = { 
    input: {
      name,
      value: '',
    }, 
    meta: {},
    label: "Different Name",
    options: ['Option 1', 'Option 2']
  }
  const wrapper = mount(<RadioGroup { ...props }/>)
  const legend = wrapper.find('fieldset').first().find('legend')
  expect(legend).toBeTruthy()
  expect(legend.text()).toEqual('Different Name')
})
