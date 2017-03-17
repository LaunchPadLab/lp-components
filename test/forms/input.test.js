import React from 'react'
import { shallow, render } from 'enzyme'
import { Input } from '../../src/'
import { startCase, stripNamespace } from '../../src/utils'

const name = 'name.of.field'
// const label = 'label'
// const error = 'FAIL!'

const formatLabel = (name) => startCase(stripNamespace(name))

test('when label not provided - renders a label with content equal to formatted input name', () => {
  const props = { input: { name }, meta: {} }
  const wrapper = render(<Input { ...props }/>)
  expect(wrapper.find('label').text()).toBe(formatLabel(name))
})

// test('when label is a string - renders a label with content equal to string', t => {
//   const props = { input: { name }, meta: {}, label }
//   const wrapper = shallow(<Input { ...props }/>)
//   t.is(wrapper.find('.label').exists(), true)
//   t.is(wrapper.find('.label').text(), label)
// })

// test('when label is false - does not render a label', t => {
//   const props = { input: { name }, meta: {}, label: false }
//   const wrapper = shallow(<Input { ...props }/>)
//   t.is(wrapper.find('.label').exists(), false)
// })

// test('when error not provided - does not render the error message', t => {
//   const props = { input: { name }, meta: {} }
//   const wrapper = shallow(<Input { ...props }/>)
//   t.is(wrapper.find('.error-message').exists(), false)
// })

// test('when error not provided - does not add error class to container', t => {
//   const props = { input: { name }, meta: {} }
//   const wrapper = shallow(<Input { ...props }/>)
//   t.is(wrapper.find('.error').exists(), false)
// })

// test('when error is provided - adds the error class to container', t => {
//   const props = { input: { name }, meta: { error } }
//   const wrapper = shallow(<Input { ...props }/>)
//   t.is(wrapper.find('.error').exists(), true)
// })

// test('when error is provided - renders the error message containing the error', t => {
//   const props = { input: { name }, meta: { error } }
//   const wrapper = shallow(<Input { ...props }/>)
//   t.is(wrapper.find('.error-message').exists(), true)
//   t.is(wrapper.find('.error-message').text(), error)
// })
