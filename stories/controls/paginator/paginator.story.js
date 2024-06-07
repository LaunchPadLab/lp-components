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

export const WithNoHiddenPages = () => (
  <Paginator max={5} pagesShown={5} onChange={action('clicked on page')} />
)

WithNoHiddenPages.story = {
  name: 'with no hidden pages',
}

export const WithHiddenPages = () => (
  <Paginator max={5} onChange={action('clicked on page')} />
)

WithHiddenPages.story = {
  name: 'with hidden pages',
}

export const WithCustomLabels = () => (
  <Paginator
    max={5}
    previousLabel={'<'}
    nextLabel={'>'}
    onChange={action('clicked on page')}
  />
)

WithCustomLabels.story = {
  name: 'with custom labels',
}

export const WithOnePageHidden = () => <Paginator max={1} />

WithOnePageHidden.story = {
  name: 'with one page (hidden)',
}
