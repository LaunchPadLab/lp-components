import React from 'react'
import { mount } from 'enzyme'
import { SetterLink } from '../../../src/'

const name = 'my.input'

test('SetterLink sets the value to true when `valueToSet` is not provided', () => {
  const onChange = jest.fn()
  const value = false
  const inputProps = { name, value, onChange }
  const props = { input: inputProps, meta: {} }
  const wrapper = mount(<div><input { ...inputProps }/><SetterLink { ...props }/></div>)
  
  wrapper.find('a').simulate('click')
  const newValue = onChange.mock.calls[0][0]
  expect(newValue).toEqual(true)
})

test('SetterLink sets the value correctly when `valueToSet` is provided', () => {
  const onChange = jest.fn()
  const value = ['hello']
  const inputProps = { name, value, onChange }
  const props = { input: inputProps, meta: {}, valueToSet: [] }
  const wrapper = mount(<div><input { ...inputProps }/><SetterLink { ...props }/></div>)
  
  wrapper.find('a').simulate('click')
  const newValue = onChange.mock.calls[0][0]
  expect(newValue).toEqual([])
})