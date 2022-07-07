import React from 'react'
import { shallow } from 'enzyme'
import { ButtonArea } from '../../../src/'

test('ButtonArea creates div with class "button-area"', () => {
  const wrapper = shallow(
    <ButtonArea>
      <button>Hi</button>
    </ButtonArea>
  )
  expect(wrapper.find('div').hasClass('button-area')).toBe(true)
  expect(wrapper.find('button').contains('Hi')).toBe(true)
})

test('ButtonArea merges classes correctly', () => {
  const wrapper = shallow(<ButtonArea className="extra classes" />)
  expect(wrapper.find('div').hasClass('button-area extra classes')).toBe(true)
})
