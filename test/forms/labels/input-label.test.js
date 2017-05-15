import React from 'react'
import { shallow } from 'enzyme'
import { InputLabel } from '../../../src/'

const name = 'person.firstName'
const formattedName = 'First Name'

test('when label is false - does not render a label', () => {
  const wrapper = shallow(<InputLabel name={name} label={false}/>)
  expect(wrapper.find('label').exists()).toEqual(false)
})

test('when label not provided - renders a label with content equal to formatted input name', () => {
  const wrapper = shallow(<InputLabel name={name}/>)
  expect(wrapper.dive().find('label').text()).toEqual(formattedName)
})

test('when label not provided - renders a label with content equal to string', () => {
  const wrapper = shallow(<InputLabel name={name} label="foo"/>)
  expect(wrapper.dive().find('label').text()).toEqual('foo')
})