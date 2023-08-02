import React from 'react'
import { mount } from 'enzyme'
import { TabBar } from '../../src/'

const defaultOptions = ['Home', 'Account']
const objectOptions = [
  { key: 'Home', value: 'home' },
  { key: 'Account', value: 4 },
]

test('TabBar defaults to horizontal alignment', () => {
  const wrapper = mount(<TabBar options={defaultOptions} value="home" />)
  expect(wrapper.find('ul').hasClass('horizontal-tabs')).toEqual(true)
})

test('TabBar aligns vertically with vertical option', () => {
  const wrapper = mount(
    <TabBar options={defaultOptions} vertical={true} value="home" />
  )
  expect(wrapper.find('ul').hasClass('vertical-tabs')).toEqual(true)
})

test('TabBar renders defaultOptions', () => {
  const wrapper = mount(<TabBar options={defaultOptions} value="home" />)
  expect(wrapper.find('li').first().text()).toEqual('Home')
  expect(wrapper.find('li').last().text()).toEqual('Account')
})

test('TabBar renders objectOptions', () => {
  const wrapper = mount(<TabBar options={objectOptions} value="home" />)
  expect(wrapper.find('li').first().text()).toEqual('Home')
  expect(wrapper.find('li').last().text()).toEqual('Account')
})

test('TabBar adds Active class', () => {
  const wrapper = mount(<TabBar options={objectOptions} value="home" />)
  expect(wrapper.find('li').first().hasClass('active')).toEqual(true)
})

test('TabBar calls onChange', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <TabBar options={objectOptions} value="home" onChange={onChange} />
  )
  wrapper.find('[role="tab"]').first().simulate('click')
  expect(onChange).toHaveBeenCalledWith('home')
})

test('TabBar passes down custom className to ul', () => {
  const wrapper = mount(
    <TabBar options={objectOptions} value="home" className="custom" />
  )
  expect(wrapper.find('ul').hasClass('custom')).toEqual(true)
})

test('TabBar passes down custom activeClassName to li', () => {
  const wrapper = mount(
    <TabBar options={objectOptions} value="home" activeClassName="custom" />
  )
  expect(wrapper.find('li').first().hasClass('custom')).toEqual(true)
})

test('TabBar assigns appropriate aria roles', () => {
  const wrapper = mount(<TabBar options={defaultOptions} value="home" />)
  expect(wrapper.find('ul').prop('role')).toBe('tablist')
  expect(wrapper.find('[role="tab"]').length).toBe(defaultOptions.length)
})

test('TabBar assigns appropriate aria orientation', () => {
  const horizontalWrapper = mount(
    <TabBar options={defaultOptions} vertical={false} value="home" />
  )
  const verticalWrapper = mount(
    <TabBar options={defaultOptions} vertical value="home" />
  )

  expect(
    horizontalWrapper.find('[role="tablist"]').prop('aria-orientation')
  ).toBe('horizontal')
  expect(
    verticalWrapper.find('[role="tablist"]').prop('aria-orientation')
  ).toBe('vertical')
})

test('TabBar assigns unique id to tab', () => {
  const wrapper = mount(<TabBar options={defaultOptions} value="home" />)
  expect(wrapper.find('[role="tab"]').first().prop('id')).toContain(
    defaultOptions[0].toLowerCase()
  )
})

test('Inactive tabs are explicitly removed from the natural tab order', () => {
  const wrapper = mount(<TabBar options={defaultOptions} value="home" />)
  expect(
    wrapper.find('li').not('.active').find('a').every('[tabIndex="-1"]')
  ).toBe(true)
})

// Enzyme's simulate doesn't translate keyboard events to click events. This test can be re-enabled after the switch to RTL
test.skip('Tab to show is triggered via Enter', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <TabBar options={objectOptions} value="home" onChange={onChange} />
  )
  wrapper.find('[role="tab"]').first().simulate('keyDown', { key: 'Enter' })
  expect(onChange).toHaveBeenCalledWith('home')
})

// Enzyme's simulate doesn't translate keyboard events to click events. This test can be re-enabled after the switch to RTL
test.skip('Tab to show is triggered via Space', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <TabBar options={objectOptions} value="home" onChange={onChange} />
  )
  wrapper.find('[role="tab"]').first().simulate('keyPress', { keyCode: 32 })
  expect(onChange).toHaveBeenCalledWith('home')
})
