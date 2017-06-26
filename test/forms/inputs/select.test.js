import React from 'react'
import { shallow } from 'enzyme'
import { Select } from '../../../src/'

test('Select adds string options to select tag', () => {
  const OPTION = 'MY OPTION'
  const props = { 
    input: {
      name: 'test',
      value: '',
    }, 
    meta: {},
    options: [OPTION],
  }
  const wrapper = shallow(<Select { ...props }/>)
  expect(wrapper.dive().find('option').contains(OPTION)).toEqual(true)
  expect(wrapper.dive().find('option').prop('value')).toEqual(OPTION)
})

test('Select adds object options to select tag', () => {
  const KEY = 'MY KEY'
  const VALUE = 'MY OPTION'
  const props = { 
    input: {
      name: 'test',
      value: '',
    }, 
    meta: {},
    options: [{ key: KEY, value: VALUE }],
  }
  const wrapper = shallow(<Select { ...props }/>)
  expect(wrapper.dive().find('option').contains(KEY)).toEqual(true)
  expect(wrapper.dive().find('option').prop('value')).toEqual(VALUE)
})

test('Select adds placeholder option to select tag', () => {
  const PLACEHOLDER = 'MY PLACEHOLDER'
  const props = { 
    input: {
      name: 'test',
      value: '',
    }, 
    meta: {},
    options: [],
    placeholder: PLACEHOLDER,
  }
  const wrapper = shallow(<Select { ...props }/>)
  expect(wrapper.dive().find('option').contains(PLACEHOLDER)).toEqual(true)
  expect(wrapper.dive().find('option').prop('value')).toEqual('')
})

test('Select adds empty option select tag', () => {
  const props = { 
    input: {
      name: 'test',
      value: '',
    }, 
    meta: {},
    options: [],
    emptyOption: true,
  }
  const wrapper = shallow(<Select { ...props }/>)
  expect(wrapper.dive().find('option').first().prop('value')).toEqual('')
})