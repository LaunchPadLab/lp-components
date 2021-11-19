import React from 'react'
import { storiesOf } from '@storybook/react'
import { Router, Route } from 'react-router'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { NavLink as StaticNavLink } from 'src'
import dynamicInput from '../dynamic-input'

const NavLink = dynamicInput()(StaticNavLink)

storiesOf('NavLink', module)
  .addDecorator((story) => (
    <Router history={createMemoryHistory('/')}>
      <Route path="/" component={story} />
    </Router>
  ))
  .add('default', () => <NavLink to="/">Home</NavLink>)
