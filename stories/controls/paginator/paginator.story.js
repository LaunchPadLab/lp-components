import React from 'react'
import { action } from '@storybook/addon-actions'
import { Paginator as StaticPaginator } from 'src'
import dynamicInput from '../../dynamic-input'

const Paginator = dynamicInput({
  initialValue: 1,
})(StaticPaginator)

export default {
  title: 'Paginator',
}

export const WithNoHiddenPages = {
  render: () => (
    <Paginator max={5} pagesShown={5} onChange={action('clicked on page')} />
  ),

  name: 'with no hidden pages',
}

export const WithHiddenPages = {
  render: () => <Paginator max={5} onChange={action('clicked on page')} />,

  name: 'with hidden pages',
}

export const WithCustomLabels = {
  render: () => (
    <Paginator
      max={5}
      previousLabel={'<'}
      nextLabel={'>'}
      onChange={action('clicked on page')}
    />
  ),

  name: 'with custom labels',
}

export const WithOnePageHidden = {
  render: () => <Paginator max={1} />,
  name: 'with one page (hidden)',
}
