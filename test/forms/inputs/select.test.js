import React from 'react'
import { shallow } from 'enzyme'
import { Select } from '../../../src/'

const DEFAULT_PLACEHOLDER = 'Select'

test('Select adds string options to select tag', () => {
  const OPTION = 'MY OPTION'
  const props = { 
    input: {
      name: 'test',
      value: '',
    }, 
    meta: {},
    options: [OPTION],
    placeholder: false,
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
    placeholder: false,
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

test('Select enables the placeholder option to be selected correctly', () => {
  const PLACEHOLDER = 'MY PLACEHOLDER'
  const props = { 
    input: {
      name: 'test',
      value: '',
    }, 
    meta: {},
    options: [],
    placeholder: PLACEHOLDER,
    enablePlaceholderOption: true,
  }
  const wrapper = shallow(<Select { ...props }/>)
  expect(wrapper.dive().find('option').first().prop('value')).toEqual('')
  expect(wrapper.dive().find('option').first().prop('disabled')).toEqual(false)
})

test('Select renders option groups correctly', () => {
  const options = { name: 'groupName', options: ['testOption'] }
  const props = { 
    input: {
      name: 'test',
      value: '',
    }, 
    meta: {},
    optionGroups: [options],
    placeholder: false,
  }
  const wrapper = shallow(<Select { ...props }/>)
  expect(wrapper.dive().find('optgroup').first().prop('label')).toEqual('groupName')
  expect(wrapper.dive().find('option').first().prop('value')).toEqual('testOption')
})

test('Select has a placeholder by default', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    options: [],
    meta: {},
  }
  const wrapper = shallow(<Select { ...props } />)
  expect(wrapper.dive().find('option').contains(DEFAULT_PLACEHOLDER)).toEqual(true)
  expect(wrapper.dive().find('option').prop('value')).toEqual('')
})