import React from 'react'
import { mount } from 'enzyme'
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
  const wrapper = mount(<Select { ...props }/>)
  expect(wrapper.find('option').contains(OPTION)).toEqual(true)
  expect(wrapper.find('option').prop('value')).toEqual(OPTION)
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
  const wrapper = mount(<Select { ...props }/>)
  expect(wrapper.find('option').contains(KEY)).toEqual(true)
  expect(wrapper.find('option').prop('value')).toEqual(VALUE)
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
  const wrapper = mount(<Select { ...props }/>)
  expect(wrapper.find('option').contains(PLACEHOLDER)).toEqual(true)
  expect(wrapper.find('option').prop('value')).toEqual('')
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
  const wrapper = mount(<Select { ...props }/>)
  expect(wrapper.find('option').first().prop('value')).toEqual('')
  expect(wrapper.find('option').first().prop('disabled')).toEqual(false)
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
  }
  const wrapper = mount(<Select { ...props }/>)
  expect(wrapper.find('optgroup').first().prop('label')).toEqual('groupName')
  expect(wrapper.find('option').first().prop('value')).toEqual('testOption')
})

test('Select adds an aria-describedby attribute when there is an input error', () => {
  const OPTION = 'MY OPTION'
  const name = 'test'
  const props = { 
    input: {
      name,
      value: '',
    }, 
    meta: {
      touched: true,
      invalid: true,
    },
    options: [OPTION],
  }
  const wrapper = mount(<Select { ...props }/>)
  expect(wrapper.find('select').prop('aria-describedby')).toContain(name)
})

test('Select does not receive invalid dom attributes', () => {
  const OPTION = 'MY OPTION'
  const name = 'test'
  const props = { 
    input: {
      name,
      value: '',
    }, 
    meta: {},
    options: [OPTION],
    onClickLabel: () => 'foo'
  }
  
  const wrapper = mount(<Select {...props} />)
  expect(wrapper.find('select').prop('onClickLabel')).toBe(undefined)
})
