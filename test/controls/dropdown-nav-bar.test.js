import React from 'react'
import { mount } from 'enzyme'
import { Link } from 'react-router'
import { DropdownNavBar } from '../../src/'
import { first, last } from 'lodash'

// Test Data
const parentTitles = ['Experiences', 'Wildlife', 'Visit Us']
const childTitles = [
  ['Animal Encounters', 'Zoo Keeper for a Day', 'Wildlife Photos'],
  ['Our Animals', 'Zoo Flora', 'Top 10 Highlights'],
]

const path = '/'
const externalPath = 'https://goo.gl/maps/oGeajN5N1Ycy1D4J8'

const menuItems = parentTitles.map((parentTitle, index) => {
  return {
    name: parentTitle,
    // Last parent item must have an external path for tests to pass
    path: index === parentTitles.length - 1 ? externalPath : path,
    childItems: createChildItems(childTitles[index]),
  }
})

// Tests
// Note: when testing for a change, element must be re-found (cannot store in a variable)
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
    expect(getMenuItemLink(wrapper).prop('to')).toEqual(path)
    expect(getMenuItemLink(wrapper, { last: true }).prop('href')).toEqual(
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

    expect(getMenuItemLink(hideButtonsWrapper).hasClass('down-arrow')).toBe(
      false
    )
    getMenuItemLink(hideButtonsWrapper).simulate('focus')
    expect(getMenuItemLink(hideButtonsWrapper).hasClass('down-arrow')).toBe(
      true
    )
  })

  test('moves focus between parent menu links when triggered via right or left arrow on parent menu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    // right arrow
    expect(getMenuItemLink(wrapper).prop('tabindex')).toEqual('0')
    getMenuItemLink(wrapper).simulate('keyDown', { key: 'ArrowRight' })
    // removed focus from first parent menu link
    expect(getMenuItemLink(wrapper).prop('tabindex')).toEqual('-1')
    // added focus to second parent menu link
    expect(getMenuItemLink(wrapper, { position: 1 }).prop('tabindex')).toEqual(
      '0'
    )

    // left arrow
    getMenuItemLink(wrapper, { position: 1 }).simulate('keyDown', {
      key: 'ArrowLeft',
    })
    // removed focus from second parent menu link
    expect(getMenuItemLink(wrapper, { position: 1 }).prop('tabindex')).toEqual(
      '-1'
    )
    // added focus to first parent menu link
    expect(getMenuItemLink(wrapper).prop('tabindex')).toEqual('0')
  })

  test('moves focus to first or last parent menu link when triggered via home or end on parent menu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    // end
    expect(getMenuItemLink(wrapper).prop('tabindex')).toEqual('0')
    getMenuItemLink(wrapper).simulate('keyDown', { key: 'End' })
    expect(getMenuItemLink(wrapper).prop('tabindex')).toEqual('-1')
    expect(getMenuItemLink(wrapper, { last: true }).prop('tabindex')).toEqual(
      '0'
    )

    // home
    getMenuItemLink(wrapper, { last: true }).simulate('keyDown', {
      key: 'Home',
    })
    expect(getMenuItemLink(wrapper).prop('tabindex')).toEqual('0')
    expect(getMenuItemLink(wrapper, { last: true }).prop('tabindex')).toEqual(
      '-1'
    )
  })

  test('opens submenu and focuses first submenu link when triggered via down arrow on parent menu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(false)
    getMenuItemLink(wrapper).simulate('keyDown', { key: 'ArrowDown' })
    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(true)
    // removed focus from parent menu link
    expect(getMenuItemLink(wrapper).prop('tabindex')).toEqual('-1')
    // added focus to first submenu link
    expect(getChildMenuItemLink(getMenuItem(wrapper)).prop('tabindex')).toEqual(
      '0'
    )
  })

  test('closes submenu when triggered via Escape on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    // open submenu first
    getMenuItemLink(wrapper).simulate('keyDown', { key: 'ArrowDown' })

    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(true)
    getChildMenuItemLink(getMenuItem(wrapper)).simulate('keyDown', {
      key: 'Escape',
    })
    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(false)
  })

  test('moves focus between submenu links when triggered via down or up arrow on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = getMenuItem(wrapper)

    // open submenu first
    getMenuItemLink(wrapper).simulate('keyDown', { key: 'ArrowDown' })

    // down arrow
    expect(getChildMenuItemLink(firstMenuItem).prop('tabindex')).toEqual('0')
    getChildMenuItemLink(firstMenuItem).simulate('keyDown', {
      key: 'ArrowDown',
    })
    expect(getChildMenuItemLink(firstMenuItem).prop('tabindex')).toEqual('-1')
    expect(
      getChildMenuItemLink(firstMenuItem, {
        position: 1,
      }).prop('tabindex')
    ).toBe('0')

    // up arrow
    getChildMenuItemLink(firstMenuItem, {
      position: 1,
    }).simulate('keyDown', { key: 'ArrowUp' })
    expect(getChildMenuItemLink(firstMenuItem).prop('tabindex')).toEqual('0')
    expect(
      getChildMenuItemLink(firstMenuItem, {
        position: 1,
      }).prop('tabindex')
    ).toBe('-1')
  })

  test('moves focus to first or last submenu link when triggered via home or end on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstMenuItem = getMenuItem(wrapper)

    // end
    expect(getChildMenuItemLink(firstMenuItem).prop('tabindex')).toEqual('0')
    getChildMenuItemLink(firstMenuItem).simulate('keyDown', { key: 'End' })
    expect(getChildMenuItemLink(firstMenuItem).prop('tabindex')).toEqual('-1')
    expect(
      getChildMenuItemLink(firstMenuItem, { last: true }).prop('tabindex')
    ).toEqual('0')

    // home
    getChildMenuItemLink(firstMenuItem, { last: true }).simulate('keyDown', {
      key: 'Home',
    })
    expect(getChildMenuItemLink(firstMenuItem).prop('tabindex')).toEqual('0')
    expect(
      getChildMenuItemLink(firstMenuItem, { last: true }).prop('tabindex')
    ).toEqual('-1')
  })

  test('moves focus to next parent menu link and opens submenu when triggered via right or left arrow on submenu link', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)
    const firstChildMenuItemLink = getChildMenuItemLink(getMenuItem(wrapper))
    const secondChildMenuItemLink = getChildMenuItemLink(
      getMenuItem(wrapper, { position: 1 })
    )

    // open submenu first
    getMenuItemLink(wrapper).simulate('keyDown', { key: 'ArrowDown' })

    // right arrow
    expect(getMenuItemLink(wrapper, { position: 1 }).prop('tabindex')).toEqual(
      '-1'
    )
    expect(getMenuItem(wrapper, { position: 1 }).hasClass('submenu-open')).toBe(
      false
    )
    firstChildMenuItemLink.simulate('keyDown', { key: 'ArrowRight' })
    expect(getMenuItemLink(wrapper, { position: 1 }).prop('tabindex')).toEqual(
      '0'
    )
    expect(getMenuItem(wrapper, { position: 1 }).hasClass('submenu-open')).toBe(
      true
    )

    // left arrow
    expect(getMenuItemLink(wrapper).prop('tabindex')).toEqual('-1')
    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(false)
    secondChildMenuItemLink.simulate('keyDown', { key: 'ArrowLeft' })
    expect(getMenuItemLink(wrapper).prop('tabindex')).toEqual('0')
    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(true)
  })

  test('opens submenu when parent menu link is tapped once (does not navigate to link)', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(false)
    getMenuItemLink(wrapper).simulate('touchend')
    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(true)
  })

  test('displays submenu when mobile submenu button is clicked', () => {
    const wrapper = mount(<DropdownNavBar menuItems={menuItems} />)

    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(false)
    wrapper
      .find('button')
      .first()
      .simulate('click')
    expect(getMenuItem(wrapper).hasClass('submenu-open')).toBe(true)
  })
})

// Helpers
function createChildItems(childTitles) {
  if (!childTitles) return

  return childTitles.map((childTitle) => {
    return {
      name: childTitle,
      path,
    }
  })
}

function getMenuItem(wrapper, { last, position } = {}) {
  const menuItems = wrapper.find('li.parent-menu')

  if (position) return menuItems.at(position)
  if (last) return menuItems.last()

  return menuItems.first()
}

function getMenuItemLink(wrapper, { last, position } = {}) {
  const menuItem = getMenuItem(wrapper, { last, position })

  // Last menu item in test data should always have an external path
  // using a standard anchor element instead of a Link element
  if (last) return menuItem.find('a').first()

  return menuItem.find(Link).first()
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
