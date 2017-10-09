import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { TabBar as StaticTabBar } from 'src'
import dynamicInput from '../dynamic-input'

const TabBar = dynamicInput({
})(StaticTabBar)

storiesOf('TabBar', module)
  .add('static', () => (
    <TabBar
      options={['Tab 1', 'Tab 2']}
    />
  ))
  .add('dynamic', () => (
    <TabBar
      options={['Tab 1', 'Tab 2']}
      onChange={action('tabbed over')}
    />
  ))

