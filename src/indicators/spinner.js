import React from 'react'
// import PropTypes from 'prop-types'
import filterInvalidProps from 'filter-invalid-dom-props'

/**
 *
 * A UI component that displays a 'spinner'.
 *
 * 
 * @name Spinner
 * @type Function
 * @example
 * 
 * function Image ({ imgUrl }) {
 *   return (
 *      <div>
 *       { imgUrl
 *         ? <img src={ imgUrl } alt=""/>
 *         : <Spinner/>
 *       }
 *      </div>
 *   )
 * }
 *
 * // Spinner is rendered when there is no content to display
 *
**/

const propTypes = {}

function Spinner (props) {
  return <div id="spinner" { ...filterInvalidProps(props) } />
}

Spinner.propTypes = propTypes

export default Spinner