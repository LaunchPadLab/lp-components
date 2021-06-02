import React from 'react'
import { mount } from 'enzyme'
import { Link } from 'react-router'
import { DropdownNavBar } from '../../src/'

const path = '/'

const menuItems = [
  {
    name: 'Experiences',
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
        .find(Link)
        .first()
        .prop('to')
    ).toEqual('/')
    expect(
      wrapper
        .find('a')
        .at(3)
        .prop('href')
    ).toContain('https://')
  })

  test('renders menuItems', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItemLink = wrapper
      .find('li')
      .first()
      .render()
    const lastMenuItem = wrapper
      .find('li')
      .last()
      .render()

    expect(
      firstMenuItemLink
        .find('a')
        .first()
        .text()
    ).toEqual('Experiences')
    expect(
      firstMenuItemLink
        .find('ul > li')
        .first()
        .text()
    ).toEqual('Animal Encounters')
    expect(
      firstMenuItemLink
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
      <DropdownNavBar menuItems={menuItems} menuAriaLabel="Main Menu" />
    )

    expect(wrapper.find('nav').prop('aria-label')).toBe('Primary Menu')
    expect(passedMenuLabelWrapper.find('nav').prop('aria-label')).toBe(
      'Main Menu'
    )
  })

  test('applies correct submenu button class on initial render', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const hideButtonsWrapper = mount(
      <DropdownNavBar menuItems={menuItems} hideSubmenuArrowsBeforeFocus />
    )

    expect(
      wrapper
        .find('li.parent-menu a')
        .first()
        .hasClass('down-arrow')
    ).toBe(true)
    expect(
      hideButtonsWrapper
        .find('li.parent-menu a')
        .first()
        .hasClass('down-arrow')
    ).toBe(false)
  })

  test('displays submenu arrow on focus of parent menu link', () => {
    const hideButtonsWrapper = mount(
      <DropdownNavBar menuItems={menuItems} hideSubmenuArrowsBeforeFocus />
    )
    const firstMenuItemLink = hideButtonsWrapper
      .find('li.parent-menu a')
      .first()

    expect(firstMenuItemLink.hasClass('down-arrow')).toBe(false)
    firstMenuItemLink.simulate('focus')
    expect(firstMenuItemLink.hasClass('down-arrow')).toBe(true)
  })

  test('moves focus between parent menu links when triggered via right arrow on parent menu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItemLink = wrapper.find('li.parent-menu a').first()

    expect(firstMenuItemLink.prop('tabindex')).toEqual('0')
    firstMenuItemLink.simulate('keyDown', { key: 'ArrowRight' })
    // removed focus from first parent menu link
    expect(firstMenuItemLink.prop('tabindex')).toEqual('-1')
    // added focus to second parent menu link
    expect(wrapper.find('li.parent-menu a')[1].prop('tabindex')).toEqual('0')
  })

  test('moves focus to first or last parent menu link when triggered via home or end on parent menu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItemLink = wrapper.find('li.parent-menu a').first()
    const lastMenuItemLink = wrapper.find('li.parent-menu:last-child a').first()

    // end
    expect(firstMenuItemLink.prop('tabindex')).toEqual('0')
    firstMenuItemLink.simulate('keyDown', { key: 'End' })
    expect(firstMenuItemLink.prop('tabindex')).toEqual('-1')
    expect(lastMenuItemLink.prop('tabindex')).toEqual('0')

    // home
    lastMenuItemLink.simulate('keyDown', { key: 'Home' })
    expect(firstMenuItemLink.prop('tabindex')).toEqual('0')
    expect(lastMenuItemLink.prop('tabindex')).toEqual('-1')
  })

  test('opens submenu and focuses first submenu link when triggered via down arrow on parent menu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('submenu-open')
    ).toBe(false)
    wrapper
      .find('li.parent-menu a')
      .first()
      .simulate('keyDown', { key: 'ArrowDown' })
    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('submenu-open')
    ).toBe(true)
    // removed focus from parent menu link
    expect(
      wrapper
        .find('li.parent-menu a')
        .first()
        .prop('tabindex')
    ).toEqual('-1')
    // added focus to first submenu link
    expect(
      wrapper
        .find('li.sub-menu-item a')
        .first()
        .prop('tabindex')
    ).toEqual('0')
  })

  test('closes submenu when triggered via Escape on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    // open submenu first
    wrapper
      .find('li.parent-menu a')
      .first()
      .simulate('keyDown', { key: 'ArrowDown' })

    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('submenu-open')
    ).toBe(true)
    wrapper
      .find('li.sub-menu-item a')
      .first()
      .simulate('keyDown', { key: 'Escape' })
    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('submenu-open')
    ).toBe(false)
  })

  test('moves focus between submenu links when triggered via down or up arrow on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstSubmenuLink = wrapper.find('li.sub-menu-item a').first()
    const secondSubmenuLink = wrapper.find('li.sub-menu-item a')[1]

    // open submenu first
    wrapper
      .find('li.parent-menu a')
      .first()
      .simulate('keyDown', { key: 'ArrowDown' })

    // down arrow
    expect(firstSubmenuLink.prop('tabindex')).toEqual('0')
    firstSubmenuLink.simulate('keyDown', { key: 'ArrowDown' })
    expect(firstSubmenuLink.prop('tabindex')).toEqual('-1')
    expect(secondSubmenuLink.prop('tabindex')).toBe('0')

    // up arrow
    secondSubmenuLink.simulate('keyDown', { key: 'ArrowUp' })
    expect(firstSubmenuLink.prop('tabindex')).toEqual('0')
    expect(secondSubmenuLink.prop('tabindex')).toBe('-1')
  })

  test('moves focus to first or last submenu link when triggered via home or end on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstSubmenuLink = wrapper
      .find('li.parent-menu:first-child .sub-menu-item a')
      .first()
    const lastSubmenuLink = wrapper
      .find('li.parent-menu:first-child .sub-menu-item a')
      .last()

    // end
    expect(firstSubmenuLink.prop('tabindex')).toEqual('0')
    firstSubmenuLink.simulate('keyDown', { key: 'End' })
    expect(firstSubmenuLink.prop('tabindex')).toEqual('-1')
    expect(lastSubmenuLink.prop('tabindex')).toEqual('0')

    // home
    lastSubmenuLink.simulate('keyDown', { key: 'Home' })
    expect(firstSubmenuLink.prop('tabindex')).toEqual('0')
    expect(lastSubmenuLink.prop('tabindex')).toEqual('-1')
  })

  test('moves focus to next parent menu link and opens submenu when triggered via right or left arrow on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = wrapper.find('li.parent-menu').first()
    const secondMenuItem = wrapper.find('li.parent-menu')[1]

    // open submenu first
    wrapper
      .find('li.parent-menu a')
      .first()
      .simulate('keyDown', { key: 'ArrowDown' })

    // right arrow
    expect(
      secondMenuItem
        .find('a')
        .first()
        .prop('tabindex')
    ).toEqual('-1')
    expect(secondMenuItem.hasClass('submenu-open')).toBe(false)
    firstMenuItem
      .find('li.sub-menu-item a')
      .first()
      .simulate('keyDown', { key: 'ArrowRight' })
    expect(
      secondMenuItem
        .find('a')
        .first()
        .prop('tabindex')
    ).toEqual('0')
    expect(secondMenuItem.hasClass('submenu-open')).toBe(true)

    // left arrow
    expect(
      firstMenuItem
        .find('a')
        .first()
        .prop('tabindex')
    ).toEqual('-1')
    expect(firstMenuItem.hasClass('submenu-open')).toBe(false)
    secondMenuItem
      .find('li.sub-menu-item a')
      .first()
      .simulate('keyDown', { key: 'ArrowLeft' })
    expect(
      firstMenuItem
        .find('a')
        .first()
        .prop('tabindex')
    ).toEqual('0')
    expect(firstMenuItem.hasClass('submenu-open')).toBe(true)
  })

  test('opens submenu when parent menu link is tapped once (does not navigate to link)', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('submenu-open')
    ).toBe(false)
    wrapper
      .find('li.parent-menu a')
      .first()
      .simulate('touch')
    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('submenu-open')
    ).toBe(true)
  })

  test('displays submenu when mobile submenu button is clicked', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('submenu-open')
    ).toBe(false)
    wrapper
      .find('button')
      .first()
      .simulate('click')
    expect(
      wrapper
        .find('li.parent-menu')
        .first()
        .hasClass('submenu-open')
    ).toBe(true)
  })
})
