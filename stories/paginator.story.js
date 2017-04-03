import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Paginator as StaticPaginator } from '../src'
import dynamicInput from './dynamic-input'

const Paginator = dynamicInput({
  initialValue: 1
})(StaticPaginator)

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
  .add('with custom labels', () => (
    <Paginator 
      value={2} 
      max={5}
      previousLabel={'<'}
      nextLabel={'>'}
      onChange={action('clicked on page')}
    />
  ))