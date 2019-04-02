import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { TabBar as StaticTabBar } from 'src'
import dynamicInput from '../dynamic-input'

const TabBar = dynamicInput({
})(StaticTabBar)

storiesOf('TabBar', module)
  .add('horizontal', () => (
    <TabBar
      options={['Tab 1', 'Tab 2']}
      onChange={action('tabbed horizontally')}
    />
  ))
  .add('vertical', () => (
    <TabBar
      options={['Tab 1', 'Tab 2']}
      vertical
      onChange={action('tabbed vertically')}
    />
  ))

