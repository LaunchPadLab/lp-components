import React from 'react'
import { shallow } from 'enzyme'
import { Button } from '../../../src/'

test('Button is disabled when form is invalid', () => {
  const wrapper = shallow(<Button invalid={true}> Hi</Button>)
  expect(wrapper.props().disabled).toBe(true)
})

test('Button is disabled when form is pristine', () => {
  const wrapper = shallow(<Button pristine={true}> Hi</Button>)
  expect(wrapper.props().disabled).toBe(true)
})

test('Button adds style string to class', () => {
  const wrapper = shallow(<Button style="custom"> Hi</Button>)
  expect(wrapper.hasClass('button-custom')).toBe(true)
})

test('Button adds type to button', () => {
  const wrapper = shallow(<Button type="reset"> Hi</Button>)
  expect(wrapper.props().type).toBe('reset')
})

test('Button has class "in-progress" when form is submitting', () => {
  const wrapper = shallow(<Button submitting={true}> Hi</Button>)
  expect(wrapper.hasClass('in-progress')).toBe(true)
})

test('Button passes extra props to button element', () => {
  const onClick = () => 'yo'
  const wrapper = shallow(<Button onClick={onClick}> Hi</Button>)
  expect(wrapper.props().onClick).toBe(onClick)
})