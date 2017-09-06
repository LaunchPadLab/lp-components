import React from 'react'
import { mount } from 'enzyme'
import noop from 'lodash/noop'
import { SetterLink } from '../../../src/'

const name = 'my.input'

test('SetterLink sets the value to true when `valueToSet` is not provided', () => {
  const onChange = jest.fn()
  const value = false
  const inputProps = { name, value, onChange, onBlur: noop }
  const props = { input: inputProps, meta: {}, label: 'foo' }
  const wrapper = mount(<div><input { ...inputProps }/><SetterLink { ...props }/></div>)

  wrapper.find('a').simulate('click')
  expect(onChange).toHaveBeenCalledWith(true)
})

test('SetterLink sets the value correctly when `valueToSet` is provided', () => {
  const onChange = jest.fn()
  const value = ['hello']
  const inputProps = { name, value, onChange, onBlur: noop }
  const props = { input: inputProps, meta: {}, label: 'foo', valueToSet: [] }
  const wrapper = mount(<div><input { ...inputProps }/><SetterLink { ...props }/></div>)

  wrapper.find('a').simulate('click')
  expect(onChange).toHaveBeenCalledWith([])
})
