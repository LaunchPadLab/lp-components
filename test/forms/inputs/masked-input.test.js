import React from 'react'
import { mount } from 'enzyme'
import { MaskedInput } from '../../../src'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }

test('MaskedInput applies comma-separated number mask', () => {
  const wrapper = mount(
    <MaskedInput input={input} meta={{}} maskOptions={{ numeral: true }} />
  )
  wrapper.find('input').simulate('change', { target: { value: '1234' } })
  const inputValue = wrapper.find('input').prop('value')
  expect(inputValue.includes(',')).toBe(true)
})
