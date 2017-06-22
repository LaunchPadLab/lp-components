import { blurDirty } from '../../../src/'
import { noop } from '../../../src/utils'
import React from 'react'
import { mount } from 'enzyme'

test('when input is pristine, blurDirty replaces onBlur with empty function', () => {
  const MyInput = () => <input />
  const WrappedInput = blurDirty()(MyInput)
  const onBlur = () => console.log('I blurred!')
  const wrapper = mount(<WrappedInput {...{ input: { onBlur }, meta: { pristine: true } }} />)
  expect(wrapper.find(MyInput).props().input.onBlur).toEqual(noop)
  wrapper.setProps({ meta: { pristine: false } })
  expect(wrapper.find(MyInput).props().input.onBlur).toEqual(onBlur)
})

test('when alwaysBlur is set to true, blurDirty does not replace onBlur', () => {
  const MyInput = () => <input />
  const WrappedInput = blurDirty()(MyInput)
  const onBlur = () => console.log('I blurred!')
  const wrapper = mount(<WrappedInput {...{ input: { onBlur }, meta: { pristine: true }, alwaysBlur: true }} />)
  expect(wrapper.find(MyInput).props().input.onBlur).toEqual(onBlur)
  wrapper.setProps({ meta: { pristine: false } })
  expect(wrapper.find(MyInput).props().input.onBlur).toEqual(onBlur)
})
