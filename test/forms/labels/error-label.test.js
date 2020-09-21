import React from 'react'
import { shallow } from 'enzyme'
import { ErrorLabel } from '../../../src'

test('passes class to span element correctly', () => {
  const wrapper = shallow(<ErrorLabel className="small">Error!</ErrorLabel>)
  expect(wrapper.hasClass('error-message')).toBe(true)
  expect(wrapper.hasClass('small')).toBe(true)
})

test('passes extra props to span element', () => {
  const onClick = () => 'More info'
  const wrapper = shallow(<ErrorLabel onClick={onClick}>Error!</ErrorLabel>)
  expect(wrapper.props().onClick).toBe(onClick)
})
