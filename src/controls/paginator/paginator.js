import React, { PropTypes } from 'react'
import { noop } from '../../utils'
import calculateMiddlePages from './calculate-middle-pages'
import Delimiter from './delimiter'
import PageLink from './page-link'

const propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  pagesShown: PropTypes.number,
  previousLabel: PropTypes.string,
  nextLabel: PropTypes.string
}

const defaultProps = {
  value: 1,
  onChange: noop,
  min: 1,
  max: 1,
  pagesShown: 3,
  previousLabel: 'Prev',
  nextLabel: 'Next'
}

function Paginator ({ value, onChange, min, max, pagesShown, previousLabel, nextLabel }) {
  const middlePages = calculateMiddlePages(value, min, max, pagesShown)
  return (
    <div className="pagination">
      <ul>

        {/* Previous link */}

        {
          (value > min) &&
          <PageLink
            className="prev"
            onClick={() => onChange(value - 1)}
          >
            {previousLabel}
          </PageLink>
        }

        {/* First page */}

        <PageLink
          active={(value === min)}
          onClick={() => onChange(min)}
        >
          {min}
        </PageLink>

        {/* First delimiter */}

        {
          // If there are hidden pages between first page and first "middle" page
          (middlePages[0] > min + 1) &&
          <Delimiter />
        }

        {/* Middle pages */}

        {
          middlePages.map((page) => {
            return (
              <PageLink 
                key={page}
                active={(value === page)}
                onClick={() => onChange(page)}
              >
                {page}
              </PageLink>
            )
          })
        }

        {/* Second delimiter */}

        {
          // If there are hidden pages between last "middle" page and last page
          (middlePages[middlePages.length - 1] < max - 1) &&
          <Delimiter />
        }

        {/* Last page */}


        <PageLink
          active={(value === max)}
          onClick={() => onChange(max)}
        >
          {max}
        </PageLink>

        {/* Next link */}

        {
          (value < max) &&
          <PageLink 
            className="next"
            onClick={() => onChange(value + 1)}
          >
            {nextLabel}
          </PageLink>
        }
      </ul>
    </div>
  )
}

Paginator.propTypes = propTypes
Paginator.defaultProps = defaultProps

export default Paginator
