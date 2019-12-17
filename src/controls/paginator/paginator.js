import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utils'
import calculateMiddlePages from './calculate-middle-pages'
import Delimiter from './delimiter'
import PageLink from './page-link'

/**
 * @name Paginator
 * @type Function
 * @description A control component for navigating between multiple numbered pages.
 * @param {Number} [value=1] - The number of the current page
 * @param {Function} [onChange] - A function called with the new value when a page is clicked.
 * @param {Number} [min=1] The number of the first page
 * @param {Number} [max=1] The number of the last page.
 * @param {Boolean} [alwaysShow=false] Always show the component, even when there's only one page visible.
 * @param {Number} [pagesShown=3] The number of pages to display around (and including) the current page
 * @param {String} [previousLabel='Prev'] The text of the "previous page" button
 * @param {String} [nextLabel='Next'] The text of the "next page" button
 * @param {String} [delimiter='...'] The delimiter that will be shown when there are hidden pages
 * @example
 *
 * function ShowPages ({ pages, currentPage, changeCurrentPage }) {
 *   return (
 *     <div>
 *       <Page
 *         page={pages[currentPage]}
 *       />
 *       <Paginator
 *         value={currentPage}
 *         onChange={changeCurrentPage}
 *         max={pages.length}
 *       />
 *     </div>
 *   )
 * }
 */

const propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  alwaysShow: PropTypes.bool,
  pagesShown: PropTypes.number,
  previousLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  delimiter: PropTypes.string,
}

const defaultProps = {
  value: 1,
  onChange: noop,
  min: 1,
  max: 1,
  alwaysShow: false,
  pagesShown: 3,
  previousLabel: 'Prev',
  nextLabel: 'Next',
  delimiter: '...',
}

function Nav({ children }) {
  return (
    <nav className="pagination" aria-label="pagination">
      {children}
    </nav>
  )
}

function EmptyState() {
  return (
    <Nav>
      <ul />
    </Nav>
  )
}

const createPageLabel = (val) => 'Go to page ' + val

function Paginator({
  value,
  onChange,
  min,
  max,
  alwaysShow,
  pagesShown,
  previousLabel,
  nextLabel,
  delimiter,
}) {
  // Hide if there's only one page
  const totalPages = max - min + 1
  if (totalPages === 1 && !alwaysShow) return <EmptyState />

  const middlePages = calculateMiddlePages(value, min, max, pagesShown)

  return (
    <Nav>
      <ul>
        {/* Previous link */}

        {value > min && (
          <PageLink
            className="prev"
            onClick={() => onChange(value - 1)}
            aria-label="Previous page"
          >
            {previousLabel}
          </PageLink>
        )}

        {/* First page */}

        <PageLink
          active={value === min}
          onClick={() => onChange(min)}
          aria-label={createPageLabel(min)}
        >
          {min}
        </PageLink>

        {/* First delimiter */}

        {// If there are hidden pages between first page and first "middle" page
        middlePages[0] > min + 1 && <Delimiter>{delimiter}</Delimiter>}

        {/* Middle pages */}

        {middlePages.map((page) => {
          return (
            <PageLink
              key={page}
              active={value === page}
              onClick={() => onChange(page)}
              aria-label={createPageLabel(page)}
            >
              {page}
            </PageLink>
          )
        })}

        {/* Second delimiter */}

        {// If there are hidden pages between last "middle" page and last page
        middlePages[middlePages.length - 1] < max - 1 && (
          <Delimiter>{delimiter}</Delimiter>
        )}

        {/* Last page */}

        {max !== min && (
          <PageLink
            active={value === max}
            onClick={() => onChange(max)}
            aria-label={createPageLabel(max)}
          >
            {max}
          </PageLink>
        )}

        {/* Next link */}

        {value < max && (
          <PageLink
            className="next"
            onClick={() => onChange(value + 1)}
            aria-label="Next page"
          >
            {nextLabel}
          </PageLink>
        )}
      </ul>
    </Nav>
  )
}

Paginator.propTypes = propTypes
Paginator.defaultProps = defaultProps

export default Paginator
