import React from 'react'
import { mount } from 'enzyme'
import { IconInput } from '../../../src/'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }

test('IconInput adds class "icon-label" to surrounding div', () => {
  const props = { input, meta: {}, icon: 'foo' }
  const wrapper = mount(<IconInput {...props} />)
  expect(wrapper.find('div').first().hasClass('icon-label')).toEqual(true)
})

test('IconInput renders <i> tag with correct class', () => {
  const props = { input, meta: {}, icon: 'foo' }
  const wrapper = mount(<IconInput {...props} />)
  expect(wrapper.find('i').hasClass('foo-icon')).toEqual(true)
})
