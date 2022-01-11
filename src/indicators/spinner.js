import React from 'react'
// import PropTypes from 'prop-types'
import { filterInvalidDOMProps } from '../utils'

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
 */

const propTypes = {}

const defaultProps = {}

function Spinner({ className, ...rest }) {
  return <div id="spinner" className={className} {...filterInvalidDOMProps(rest)} />
}

Spinner.propTypes = propTypes
Spinner.defaultProps = defaultProps

export default Spinner
