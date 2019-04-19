import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Paginator as StaticPaginator } from 'src'
import dynamicInput from '../../dynamic-input'

const Paginator = dynamicInput({
  initialValue: 1
})(StaticPaginator)

storiesOf('Paginator', module)
  .add('with no hidden pages', () => (
    <Paginator 
      max={5}
      pagesShown={5}
      onChange={action('clicked on page')}
    />
  ))
  .add('with hidden pages', () => (
    <Paginator 
      max={5}
      onChange={action('clicked on page')}
    />
  ))
  .add('with custom labels', () => (
    <Paginator 
      max={5}
      previousLabel={'<'}
      nextLabel={'>'}
      onChange={action('clicked on page')}
    />
  ))
  .add('with one page (hidden)', () => (
    <Paginator 
      max={1}
    />
  ))