import React from 'react'
import { action } from '@storybook/addon-actions'
import { TabBar as StaticTabBar } from 'src'
import dynamicInput from '../dynamic-input'

const TabBar = dynamicInput({})(StaticTabBar)

export default {
  title: 'TabBar',
}

export const Horizontal = () => (
  <TabBar
    options={['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4']}
    value={'Tab 1'}
    onChange={action('tabbed horizontally')}
  />
)

Horizontal.story = {
  name: 'horizontal',
}

export const Vertical = () => (
  <TabBar
    options={['Tab 1', 'Tab 2']}
    value={'Tab 2'}
    vertical
    onChange={action('tabbed vertically')}
  />
)

Vertical.story = {
  name: 'vertical',
}
