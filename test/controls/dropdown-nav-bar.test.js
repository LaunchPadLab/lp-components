import React from 'react'
import { mount } from 'enzyme'
import { DropdownNavBar } from '../../src/'
import { first, last } from 'lodash'

const parentTitles = ['Experiences', 'Wildlife', 'Visit Us']
const childTitles = [
  ['Animal Encounters', 'Zoo Keeper for a Day', 'Wildlife Photos'],
  ['Our Animals', 'Zoo Flora', 'Top 10 Highlights'],
]

const path = '/'
const externalPath = 'https://goo.gl/maps/oGeajN5N1Ycy1D4J8'

function createChildItems(childTitles) {
  if (!childTitles) return

  return childTitles.map((childTitle) => {
    return {
      name: childTitle,
      path,
    }
  })
}

const menuItems = parentTitles.map((parentTitle, index) => {
  return {
    name: parentTitle,
    // Third parent item must be an external link for tests to pass
    path: index === 2 ? externalPath : path,
    childItems: createChildItems(childTitles[index]),
  }
})

function getMenuItem(wrapper, { last, position } = {}) {
  const menuItems = wrapper.find('li.parent-menu')

  if (position) return menuItems.at(position)
  if (last) return menuItems.last()

  return menuItems.first()
}

function getMenuItemLink(wrapper, { last, position } = {}) {
  const menuItem = getMenuItem(wrapper, { last, position })
  return menuItem.find('a').first()
}

function getChildMenuItem(parentMenuItem, { last, position } = {}) {
  const childMenuItems = parentMenuItem.find('li.sub-menu-item')

  if (position) return childMenuItems.at(position)
  if (last) return childMenuItems.last()

  return childMenuItems.first()
}

function getChildMenuItemLink(parentMenuItem, { last, position } = {}) {
  const menuItem = getChildMenuItem(parentMenuItem, { last, position })
  return menuItem.find('a').first()
}

describe('DropdownNavBar', () => {
  test('assigns a default mobile breakpoint number value', () => {
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
    expect(getMenuItemLink(wrapper).prop('href')).toEqual(path)
    expect(getMenuItemLink(wrapper, { position: 2 }).prop('href')).toEqual(
      externalPath
    )
  })

  test('renders menuItems', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = getMenuItem(wrapper)
    const firstMenuItemLink = getMenuItemLink(wrapper)
    const lastMenuItemLink = getMenuItemLink(wrapper, { last: true })
    const firstChildMenuItemLink = getChildMenuItemLink(firstMenuItem)
    const lastChildMenuItemLink = getChildMenuItemLink(firstMenuItem, {
      last: true,
    })

    expect(firstMenuItemLink.text()).toEqual(first(parentTitles))
    expect(firstChildMenuItemLink.text()).toEqual(first(first(childTitles)))
    expect(lastChildMenuItemLink.text()).toEqual(last(first(childTitles)))
    expect(lastMenuItemLink.text()).toEqual(last(parentTitles))
  })

  test('assigns appropriate aria roles', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    expect(wrapper.find('ul.dropdown-nav-menu').prop('role')).toBe('menubar')
    expect(
      wrapper
        .find('ul.sub-menu')
        .first()
        .prop('role')
    ).toBe('menu')
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

    expect(getMenuItemLink(wrapper).hasClass('down-arrow')).toBe(true)
    expect(getMenuItemLink(hideButtonsWrapper).hasClass('down-arrow')).toBe(
      false
    )
  })

  test('displays submenu arrow on focus of parent menu link when initially hidden', () => {
    const hideButtonsWrapper = mount(
      <DropdownNavBar menuItems={menuItems} hideSubmenuArrowsBeforeFocus />
    )
    const firstMenuItemLink = getMenuItemLink(hideButtonsWrapper)

    expect(firstMenuItemLink.hasClass('down-arrow')).toBe(false)
    firstMenuItemLink.simulate('focus')
    expect(firstMenuItemLink.hasClass('down-arrow')).toBe(true)
  })

  test('moves focus between parent menu links when triggered via right or left arrow on parent menu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItemLink = getMenuItemLink(wrapper)
    const secondMenuItemLink = getMenuItemLink(wrapper, { position: 1 })

    // right arrow
    expect(firstMenuItemLink.prop('tabindex')).toEqual('0')
    firstMenuItemLink.simulate('keyDown', { key: 'ArrowRight' })
    // removed focus from first parent menu link
    expect(firstMenuItemLink.prop('tabindex')).toEqual('-1')
    // added focus to second parent menu link
    expect(secondMenuItemLink.prop('tabindex')).toEqual('0')

    // left arrow
    secondMenuItemLink.simulate('keyDown', { key: 'ArrowLeft' })
    // removed focus from second parent menu link
    expect(secondMenuItemLink.prop('tabindex')).toEqual('-1')
    // added focus to first parent menu link
    expect(firstMenuItemLink.prop('tabindex')).toEqual('0')
  })

  test('moves focus to first or last parent menu link when triggered via home or end on parent menu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItemLink = getMenuItemLink(wrapper)
    const lastMenuItemLink = getMenuItemLink(wrapper, { last: true })

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
    const firstMenuItem = getMenuItem(wrapper)
    const firstMenuItemLink = getMenuItemLink(wrapper)
    const firstChildMenuItemLink = getChildMenuItemLink(firstMenuItem)

    expect(firstMenuItem.hasClass('submenu-open')).toBe(false)
    firstMenuItemLink.simulate('keyDown', { key: 'ArrowDown' })
    expect(firstMenuItem.hasClass('submenu-open')).toBe(true)
    // removed focus from parent menu link
    expect(firstMenuItemLink.prop('tabindex')).toEqual('-1')
    // added focus to first submenu link
    expect(firstChildMenuItemLink.prop('tabindex')).toEqual('0')
  })

  test('closes submenu when triggered via Escape on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = getMenuItem(wrapper)
    const firstMenuItemLink = getMenuItemLink(wrapper)
    const firstChildMenuItemLink = getChildMenuItemLink(firstMenuItem)

    // open submenu first
    firstMenuItemLink.simulate('keyDown', { key: 'ArrowDown' })

    expect(firstMenuItem.hasClass('submenu-open')).toBe(true)
    firstChildMenuItemLink.simulate('keyDown', { key: 'Escape' })
    expect(firstMenuItem.hasClass('submenu-open')).toBe(false)
  })

  test('moves focus between submenu links when triggered via down or up arrow on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = getMenuItem(wrapper)
    const firstMenuItemLink = getMenuItemLink(wrapper)
    const firstChildMenuItemLink = getChildMenuItemLink(firstMenuItem)
    const secondChildMenuItemLink = getChildMenuItemLink(firstMenuItem, {
      position: 1,
    })

    // open submenu first
    firstMenuItemLink.simulate('keyDown', { key: 'ArrowDown' })

    // down arrow
    expect(firstChildMenuItemLink.prop('tabindex')).toEqual('0')
    firstChildMenuItemLink.simulate('keyDown', { key: 'ArrowDown' })
    expect(firstChildMenuItemLink.prop('tabindex')).toEqual('-1')
    expect(secondChildMenuItemLink.prop('tabindex')).toBe('0')

    // up arrow
    secondChildMenuItemLink.simulate('keyDown', { key: 'ArrowUp' })
    expect(firstChildMenuItemLink.prop('tabindex')).toEqual('0')
    expect(secondChildMenuItemLink.prop('tabindex')).toBe('-1')
  })

  test('moves focus to first or last submenu link when triggered via home or end on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = getMenuItem(wrapper)
    const firstChildMenuItemLink = getChildMenuItemLink(firstMenuItem)
    const lastChildMenuItemLink = getChildMenuItemLink(firstMenuItem, {
      last: true,
    })

    // end
    expect(firstChildMenuItemLink.prop('tabindex')).toEqual('0')
    firstChildMenuItemLink.simulate('keyDown', { key: 'End' })
    expect(firstChildMenuItemLink.prop('tabindex')).toEqual('-1')
    expect(lastChildMenuItemLink.prop('tabindex')).toEqual('0')

    // home
    lastChildMenuItemLink.simulate('keyDown', { key: 'Home' })
    expect(firstChildMenuItemLink.prop('tabindex')).toEqual('0')
    expect(lastChildMenuItemLink.prop('tabindex')).toEqual('-1')
  })

  test('moves focus to next parent menu link and opens submenu when triggered via right or left arrow on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = getMenuItem(wrapper)
    const firstMenuItemLink = getMenuItemLink(wrapper)
    const secondMenuItem = getMenuItem(wrapper, { position: 1 })
    const secondMenuItemLink = getMenuItemLink(wrapper, { position: 1 })
    const firstChildMenuItemLink = getChildMenuItemLink(firstMenuItem)
    const secondChildMenuItemLink = getChildMenuItemLink(secondMenuItem)

    // open submenu first
    firstMenuItemLink.simulate('keyDown', { key: 'ArrowDown' })

    // right arrow
    expect(secondMenuItemLink.prop('tabindex')).toEqual('-1')
    expect(secondMenuItem.hasClass('submenu-open')).toBe(false)
    firstChildMenuItemLink.simulate('keyDown', { key: 'ArrowRight' })
    expect(secondMenuItemLink.prop('tabindex')).toEqual('0')
    expect(secondMenuItem.hasClass('submenu-open')).toBe(true)

    // left arrow
    expect(firstMenuItemLink.prop('tabindex')).toEqual('-1')
    expect(firstMenuItem.hasClass('submenu-open')).toBe(false)
    secondChildMenuItemLink.simulate('keyDown', { key: 'ArrowLeft' })
    expect(firstMenuItemLink.prop('tabindex')).toEqual('0')
    expect(firstMenuItem.hasClass('submenu-open')).toBe(true)
  })

  test('opens submenu when parent menu link is tapped once (does not navigate to link)', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = getMenuItem(wrapper)
    const firstMenuItemLink = getMenuItemLink(wrapper)

    expect(firstMenuItem.hasClass('submenu-open')).toBe(false)
    firstMenuItemLink.simulate('touchend')
    expect(firstMenuItem.hasClass('submenu-open')).toBe(true)
  })

  test('displays submenu when mobile submenu button is clicked', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = getMenuItem(wrapper)

    expect(firstMenuItem.hasClass('submenu-open')).toBe(false)
    wrapper
      .find('button')
      .first()
      .simulate('click')
    expect(firstMenuItem.hasClass('submenu-open')).toBe(true)
  })
})
