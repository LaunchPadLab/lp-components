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

test('MaskedInput accepts forwarded ref attribute', () => {
  const ref = React.createRef()
  const wrapper = mount(<MaskedInput input={input} meta={{}} htmlRef={ref} />)
  expect(wrapper.find('input').prop('id')).toEqual(ref.current.id)
})

test('MaskedInput accepts forwarded callback ref', () => {
  const ref = React.createRef()
  const callbackRef = (el) => ref.current = el
  const wrapper = mount(<MaskedInput input={input} meta={{}} htmlRef={callbackRef} />)
  expect(wrapper.find('input').prop('id')).toEqual(ref.current.id)
})

test('MaskedInput triggers onInit handler', () => {
  const onInit = jest.fn()
  mount(<MaskedInput input={input} meta={{}} onInit={onInit} />)
  expect(onInit).toHaveBeenCalledTimes(1)
})
