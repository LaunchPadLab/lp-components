import { range } from '../../utils'

// Returns a range of "middle" page numbers to show
export default function calculateMiddlePages (currentPage, min, max, numPagesShown) {
  // Default to showing all pages
  if (!numPagesShown) return range(min + 1, max)
  // Calculate num pages to put to left and right of current page
  const pagesBeforeCurrent = Math.floor(numPagesShown / 2)
  const pagesAfterCurrent = numPagesShown - (pagesBeforeCurrent + 1)
  // Index of first and last page
  let firstPage = currentPage - pagesBeforeCurrent
  let lastPage = currentPage + pagesAfterCurrent
  // Trim to min and max
  const lowerLimit = min + 1
  const upperLimit = max - 1
  if (firstPage < lowerLimit) {
    firstPage = lowerLimit
    // Offset last page but trim at upper limit
    const newLastPage = (min + numPagesShown) - 1
    lastPage = (newLastPage < upperLimit) ? newLastPage : upperLimit
  } else if (lastPage > upperLimit) {
    lastPage = upperLimit
    // Offset first page but trim at lower limit
    const newFirstPage = (max - numPagesShown) + 1
    firstPage = (newFirstPage > lowerLimit) ? newFirstPage : lowerLimit
  }
  return range(firstPage, lastPage + 1)
}