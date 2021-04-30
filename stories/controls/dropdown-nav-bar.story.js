import React from 'react'
import { storiesOf } from '@storybook/react'
import { DropdownNavBar as StaticDropdownNavBar } from 'src'
import dynamicInput from '../dynamic-input'

const DropdownNavBar = dynamicInput({})(StaticDropdownNavBar)

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
    id: 2,
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
    id: 3,
    path: 'https://goo.gl/maps/oGeajN5N1Ycy1D4J8',
  },
  {
    name: 'About Us',
    id: 4,
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
  .add('default', () => (
    <DropdownNavBar menuItems={menuItems} mobileBreakpoint={940} />
  ))
  .add('without mobile breakpoint', () => (
    <DropdownNavBar menuItems={menuItems} mobileBreakpoint={false} />
  ))
  .add('with menu buttons only visible on link focus', () => (
    <DropdownNavBar
      menuItems={menuItems}
      mobileBreakpoint={940}
      hideMenuButtonsBeforeFocus
    />
  ))
