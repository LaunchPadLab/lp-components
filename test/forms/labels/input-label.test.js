import React from 'react'
import { mount } from 'enzyme'
import { InputLabel } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const name = 'person.firstName'
const formattedName = 'First Name'

test('when label is false - does not render a label', () => {
  render(<InputLabel name={name} label={false} />)
  const label = screen.queryByText(formattedName)
  expect(label).toBeNull()
})

test('when label not provided - renders a label with content equal to formatted input name', () => {
  render(<InputLabel name={name} />)
  const label = screen.getByText(formattedName)
  expect(label).not.toBeEmptyDOMElement()
})

test('when label provided - renders a label with content equal to string', () => {
  render(<InputLabel name={name} label="foo" />)
  const label = screen.queryByText('foo')
  expect(label).toHaveTextContent('foo')
})

test('when children are provided, renders a label with content equal to children', () => {
  const onClick = jest.fn()
  const { container, getByTestId } = render(
    <InputLabel name={name}>
      Are you <span data-testid="child-span" onClick={onClick}>sure</span>?
    </InputLabel>
  )

  const renderedChildHTML = getByTestId('child-span')
  expect(renderedChildHTML).toHaveTextContent('sure')
})

test('when children are provided, renders a label with custom interactions intact', async () => {
  const onClick = jest.fn()
  const { getByTestId } = render(
    <InputLabel name={name}>
      Are you{' '}
      <span data-testid="click" onClick={onClick}>
        sure
      </span>
      ?
    </InputLabel>
  )
  const clickable = getByTestId('click')

  const user = userEvent.setup()

  await user.click(clickable)

  expect(onClick).toHaveBeenCalled()
})

test('when hint provided - shows hint', () => {
  const { container } = render(<InputLabel name={name} hint="hint" />)
  expect(container).toHaveTextContent('hint')
})

// test('when tooltip provided - shows tooltip trigger', () => {
//   const wrapper = mount(<InputLabel name={name} tooltip="tooltip" />)
//   expect(wrapper.find('span.tooltip-trigger').exists()).toEqual(true)
// })

// test('when tooltip provided - toggle tooltip', () => {
//   const wrapper = mount(<InputLabel name={name} tooltip="tooltip" />)
//   expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(false)
//   wrapper.find('span.tooltip-trigger').simulate('click')
//   expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(true)
//   wrapper.find('span.tooltip-trigger').simulate('click')
//   expect(wrapper.find('div.tooltip-content.is-active').exists()).toEqual(false)
// })

// test('when no custom required indicator provided, do not show required indicator', () => {
//   const wrapper = mount(<InputLabel name={name} required />)
//   expect(wrapper.find('span.required-indicator').exists()).toEqual(false)
// })

// test('when required true and custom requiredIndicator provided, show custom indicator', () => {
//   const wrapper = mount(
//     <InputLabel name={name} required requiredIndicator={'*'} />
//   )
//   expect(wrapper.find('label > span').text()).toEqual('*')
// })

// test('when id is _not_ provided - renders a label associated to the input name', () => {
//   const wrapper = mount(<InputLabel name={name} label="foo" />)
//   expect(wrapper.find('label').prop('htmlFor')).toBe(name)
// })

// test('when id is provided - renders a label associated to the input id', () => {
//   const id = 'testId'
//   const wrapper = mount(<InputLabel name={name} id={id} label="foo" />)
//   expect(wrapper.find('label').prop('htmlFor')).toBe(id)
// })

// test('can accept a custom classname', () => {
//   const wrapper = mount(<InputLabel name={name} className="foo" />)
//   expect(wrapper.find('label').hasClass('foo')).toBe(true)
// })
