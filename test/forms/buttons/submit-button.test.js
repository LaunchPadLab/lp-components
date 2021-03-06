import React from 'react'
import { shallow } from 'enzyme'
import { SubmitButton } from '../../../src/'

test('SubmitButton adds type="submit" to button', () => {
  const wrapper = shallow(<SubmitButton> Hi</SubmitButton>)
  expect(wrapper.props().type).toBe('submit')
})

test('SubmitButton passes down other props to button', () => {
  const wrapper = shallow(<SubmitButton pristine={true} style="custom"> Hi</SubmitButton>)
  const button = wrapper.dive()
  expect(button.props().disabled).toBe(true)
  expect(button.hasClass('button-custom')).toBe(true)
})
