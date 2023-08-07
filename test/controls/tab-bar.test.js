import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TabBar } from '../../src/'

const defaultOptions = ['Home', 'Account']
const objectOptions = [
  { key: 'Home', value: 'home' },
  { key: 'Account', value: 4 },
]

test('TabBar defaults to horizontal alignment', () => {
  render(<TabBar options={defaultOptions} value="home" />)
  expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal')
})

test('TabBar aligns vertically with vertical option', () => {
  render(
    <TabBar options={defaultOptions} vertical={true} value="home" />
  )
  expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical')
})

test('TabBar renders defaultOptions', () => {
  render(<TabBar options={defaultOptions} value="home" />)
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('Account')).toBeInTheDocument()
})

test('TabBar renders objectOptions', () => {
  render(<TabBar options={objectOptions} value="home" />)
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('Account')).toBeInTheDocument()
})

test('TabBar adds Active class', () => {
  render(<TabBar options={objectOptions} value="home" />)
  expect(screen.getByText('Home').parentElement).toHaveClass('active')
})

test('TabBar calls onChange', async () => {
  const onChange = jest.fn()
  const user = userEvent.setup()
  render(
    <TabBar options={objectOptions} value="home" onChange={onChange} />
  )
  await user.click(screen.getByText(objectOptions[0].key))
  expect(onChange).toHaveBeenCalledWith(objectOptions[0].value)
})

test('TabBar passes down custom className to ul', () => {
  render(
    <TabBar options={objectOptions} value="home" className="custom" />
  )
  expect(screen.getByRole('tablist')).toHaveClass('tabs', 'custom')
})

test('TabBar passes down custom activeClassName to li', () => {
  render(
    <TabBar options={objectOptions} value="home" activeClassName="custom" />
  )
  const homeTab = screen.getByText('Home')
  expect(homeTab.parentElement).toHaveClass('custom')
  expect(homeTab.parentElement).not.toHaveClass('active')
})

test('TabBar assigns appropriate aria roles', () => {
  render(<TabBar options={defaultOptions} value="home" />)
  expect(screen.getByRole('tablist')).toBeInTheDocument()
  expect(screen.getAllByRole('tab').length).toBe(defaultOptions.length)
})

test('TabBar assigns unique id to tab', () => {
  render(<TabBar options={defaultOptions} value="home" />)
  expect(screen.getByText('Home')).toHaveAttribute('id', 'tab-' + defaultOptions[0].toLowerCase())
})

test('Inactive tabs are explicitly removed from the natural tab order', () => {
  render(<TabBar options={defaultOptions} value="home" />)
  expect(screen.getByText('Account')).toHaveAttribute('tabIndex', '-1')
})

test('Tab to show is triggered via Enter', async () => {
  const onChange = jest.fn()
  const user = userEvent.setup()
  render(
    <TabBar options={objectOptions} value="home" onChange={onChange} />
  )
  screen.getByText(objectOptions[1].key).focus()
  await user.keyboard('{Enter}')
  expect(onChange).toHaveBeenCalledWith(objectOptions[1].value)
})

test('Tab to show is triggered via Space', async () => {
  const onChange = jest.fn()
  const user = userEvent.setup()
  render(
    <TabBar options={objectOptions} value="home" onChange={onChange} />
  )
  screen.getByText(objectOptions[1].key).focus()
  await user.keyboard('[Space]')
  expect(onChange).toHaveBeenCalledWith(objectOptions[1].value)
})
