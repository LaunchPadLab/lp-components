import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Paginator } from '../src'

storiesOf('Paginator', module)
  .add('with no hidden pages', () => (
    <Paginator 
      value={1} 
      max={5}
      pagesShown={5}
      onChange={action('clicked on page')}
    />
  ))
  .add('with hidden pages', () => (
    <Paginator 
      value={2} 
      max={5}
      onChange={action('clicked on page')}
    />
  ))