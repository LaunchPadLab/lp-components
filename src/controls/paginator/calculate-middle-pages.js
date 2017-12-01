import { range } from '../../utils'

// Returns a range of "middle" page numbers to show
export default function calculateMiddlePages (currentPage, min, max, numPagesShown) {
  if (min > max) throw new Error('Paginator: min must be <= max')
  // If no middle pages required, return empty array
  if (max === min) return []
  // Get indices of first and last pages
  const [ firstPage, lastPage ] = getFirstAndLastPages(currentPage, min, max, numPagesShown)
  // Generate range of page numbers
  return range(firstPage, lastPage + 1)
}

function getFirstAndLastPages (currentPage, min, max, numPagesShown) {
  // Don't overlap with min and max pages
  const lowestPossiblePage = min + 1
  const highestPossiblePage = max - 1
  // Default to showing all pages
  if (!numPagesShown) return [ lowestPossiblePage, highestPossiblePage ]
  // Calculate pages before and after current page
  const [ firstPage, lastPage ] = getPagesAroundCurrent(currentPage, numPagesShown)
  // Trim to min and max
  if (firstPage < lowestPossiblePage) {
    // Offset last page but trim at upper limit
    const offsetLastPage = (min + numPagesShown) - 1
    const trimmedLastPage = Math.min(highestPossiblePage, offsetLastPage)
    return [ lowestPossiblePage, trimmedLastPage ]
  } 
  if (lastPage > highestPossiblePage) {
    // Offset first page but trim at lower limit
    const offsetFirstPage = (max - numPagesShown) + 1
    const trimmedFirstPage = Math.max(lowestPossiblePage, offsetFirstPage)
    return [ trimmedFirstPage, highestPossiblePage ]
  }
  return [ firstPage, lastPage ]
}

function getPagesAroundCurrent (currentPage, numPagesShown) {
  // Calculate num pages to put to left and right of current page
  const pagesBeforeCurrent = Math.floor(numPagesShown / 2)
  const pagesAfterCurrent = numPagesShown - (pagesBeforeCurrent + 1)
  // Calculate first and last page
  const firstPage = currentPage - pagesBeforeCurrent
  const lastPage = currentPage + pagesAfterCurrent
  return [ firstPage, lastPage ]
}
