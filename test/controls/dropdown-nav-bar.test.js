import React from 'react'
import { mount } from 'enzyme'
import { DropdownNavBar } from '../../src/'

const path = ''

const menuItems = [
  {
    name: 'Experiences',
    id: 1,
    path,
    childItems: [
      {
        name: 'Animal Encounters',
        path,
      },
      {
        name: 'Zoo Keeper for a Day',
        path,
      },
    ],
  },
  {
    name: 'Visit Us',
    id: 2,
    path: 'https://goo.gl/maps/oGeajN5N1Ycy1D4J8',
  },
]

describe('DropdownNavBar', () => {
  test('assigns default mobile breakpoint number value', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    expect(wrapper.props().mobileBreakpoint).toEqual(expect.any(Number))
  })

  test('assigns appropriate mobile class', () => {
    const mobileWrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const noMobileWrapper = mount(
      <DropdownNavBar menuItems={menuItems} mobileBreakpoint={false} />
    )

    expect(mobileWrapper.find('nav').hasClass('no-mobile')).toBe(false)
    expect(noMobileWrapper.find('nav').hasClass('no-mobile')).toBe(true)
  })

  test('renders anchors with correct local path or external url', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    expect(wrapper.find('a').exists()).toBe(true)
    expect(
      wrapper
        .find('a')
        .first()
        .prop('href')
    ).toEqual('/')
    expect(
      wrapper
        .find('a')
        .last()
        .prop('href')
    ).toContain('https://')
  })

  test('renders menuItems', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = wrapper
      .find('li')
      .first()
      .render()
    const lastMenuItem = wrapper
      .find('li')
      .last()
      .render()

    expect(
      firstMenuItem
        .find('a')
        .first()
        .text()
    ).toEqual('Experiences')
    expect(
      firstMenuItem
        .find('ul > li')
        .first()
        .text()
    ).toEqual('Animal Encounters')
    expect(
      firstMenuItem
        .find('ul > li')
        .last()
        .text()
    ).toEqual('Zoo Keeper for a Day')
    expect(
      lastMenuItem
        .find('a')
        .first()
        .text()
    ).toEqual('Visit Us')
  })

  test('assigns appropriate aria roles', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    expect(wrapper.find('ul.dropdown-nav-menu').prop('role')).toBe('menubar')
    expect(wrapper.find('ul.sub-menu').prop('role')).toBe('menu')
    expect(wrapper.find('li > a').every('[role="menuitem"]')).toBe(true)
  })

  test('assigns default or passed menu aria label', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const passedMenuLabelWrapper = mount(
      <DropdownNavBar menuItems={menuItems} menuLabel="Main Menu" />
    )

    expect(wrapper.find('nav').prop('aria-label')).toBe('Primary Menu')
    expect(passedMenuLabelWrapper.find('nav').prop('aria-label')).toBe(
      'Main Menu'
    )
  })

  test("assigns matching unique id to submenu and related button's aria controls value", () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const submenuId = wrapper
      .find('li ul')
      .first()
      .prop('id')
    expect(submenuId).toContain(menuItems[0].id)
    expect(
      wrapper
        .find('button')
        .first()
        .prop('aria-controls')
    ).toEqual(submenuId)
  })

  test('applies correct menu button class on initial render', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const hideButtonsWrapper = mount(
      <DropdownNavBar menuItems={menuItems} hideMenuButtonsBeforeFocus />
    )

    expect(
      wrapper
        .find('button')
        .first()
        .hasClass('desktop-visible')
    ).toBe(true)
    expect(
      hideButtonsWrapper
        .find('button')
        .first()
        .hasClass('desktop-visible')
    ).toBe(false)
  })

  test('displays menu button on focus of parent menu link', () => {
    const hideButtonsWrapper = mount(
      <DropdownNavBar menuItems={menuItems} hideMenuButtonsBeforeFocus />
    )

    expect(
      hideButtonsWrapper
        .find('button')
        .first()
        .hasClass('desktop-visible')
    ).toBe(false)
    hideButtonsWrapper
      .find('a')
      .first()
      .simulate('focus')
    expect(
      hideButtonsWrapper
        .find('button')
        .first()
        .hasClass('desktop-visible')
    ).toBe(true)
  })

  test('displays submenu when menu button is clicked', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('open-submenu')
    ).toBe(false)
    wrapper
      .find('button')
      .first()
      .simulate('click')
    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('open-submenu')
    ).toBe(true)
  })

  test('closes submenu when triggered via Escape on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    // open submenu first
    wrapper
      .find('button')
      .first()
      .simulate('click')

    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('open-submenu')
    ).toBe(true)
    wrapper
      .find('li.child-menu a')
      .first()
      .simulate('keyDown', { key: 'Escape' })
    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('open-submenu')
    ).toBe(false)
  })
})
