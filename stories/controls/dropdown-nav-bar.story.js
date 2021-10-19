import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Router, Route } from 'react-router'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { DropdownNavBar as StaticDropdownNavBar } from 'src'
import dynamicInput from '../dynamic-input'

const DropdownNavBar = dynamicInput({})(StaticDropdownNavBar)

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
      {
        name: 'Wildlife Photos',
        path,
      },
      {
        name: 'Exhibits',
        path,
      },
    ],
  },
  {
    name: 'Wildlife',
    path,
    childItems: [
      {
        name: 'Our Animals',
        path,
      },
      {
        name: 'Zoo Flora',
        path,
      },
      {
        name: 'Top 10 Highlights',
        path,
      },
    ],
  },
  {
    name: 'Visit Us',
    path: 'https://goo.gl/maps/oGeajN5N1Ycy1D4J8',
  },
  {
    name: 'About Us',
    path,
    childItems: [
      {
        name: 'The Irwin Family',
        path,
      },
      {
        name: 'History',
        path,
      },
      {
        name: 'Our Mission',
        path,
      },
    ],
  },
]

storiesOf('DropdownNavBar', module)
  .addDecorator((story) => (
    <Router history={createMemoryHistory('/')}>
      <Route path="/" component={story} />
    </Router>
  ))
  .add('default', () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    return (
      <header>
        <input
          type="checkbox"
          id="mobile-nav-button"
          checked={isMobileMenuOpen}
          onChange={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
          }}
        />
        <label htmlFor="mobile-nav-button" className="mobile-menu">
          <span />
          <span />
          <span />
        </label>
        <DropdownNavBar menuItems={menuItems} mobileBreakpoint={940} />
      </header>
    )
  })
  .add('without mobile version', () => (
    <DropdownNavBar menuItems={menuItems} mobileBreakpoint={false} />
  ))
  .add('with menu buttons only visible on link focus', () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    return (
      <header>
        <input
          type="checkbox"
          id="mobile-nav-button"
          checked={isMobileMenuOpen}
          onChange={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
          }}
        />
        <label htmlFor="mobile-nav-button" className="mobile-menu">
          <span />
          <span />
          <span />
        </label>
        <DropdownNavBar
          menuItems={menuItems}
          mobileBreakpoint={940}
          hideSubmenuButtonsBeforeFocus
        />
      </header>
    )
  })
