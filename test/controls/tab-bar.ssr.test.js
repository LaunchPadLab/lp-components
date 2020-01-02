/**
 * @jest-environment node
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { TabBar } from '../../src/'

describe('TabBar', () => {
  it('can be server-side-rendered', () => {
    renderToString(<TabBar options={['Home', 'Account']} />)
  })
})
