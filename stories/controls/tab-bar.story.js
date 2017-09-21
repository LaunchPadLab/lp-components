import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { TabBar as StaticTabBar } from 'src'
import dynamicInput from '../dynamic-input'

const TabBar = dynamicInput({
})(StaticTabBar)

storiesOf('TabBar', module)
  .add('static', () => (
    <TabBar
      options={['Home', 'Account']}
    />
  ))
  .add('dynamic', () => (
    <TabBar
      options={['Home', 'Account']}
      onChange={action('tabbed over')}
    />
  ))

