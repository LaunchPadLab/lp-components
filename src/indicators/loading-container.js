import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { filterInvalidDOMProps } from '../utils'

/**
 *
 * A wrapper component that visually indicates whether a child component
 * is loading, or loaded.
 *
 * LoadingContainer renders child components with modified opacity
 * depending on whether `isLoading` is true or false
 *
 *
 * @name LoadingContainer
 * @type Function
 * @param {Boolean} [isLoading=false] Whether the inner component should be indicated as loading
 * @example
 *
 * function PatientIndex ({ patientProfiles }) {
 *   return (
 *      <div>
 *         <LoadingContainer isLoading={ !patientProfiles }>
 *           <div> Child Component </div>
 *         </LoadingContainer>
 *      </div>
 *   )
 * }
 *
 */

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
}

const defaultProps = {
  isLoading: false,
}

function LoadingContainer({ isLoading, children, ...rest }) {
  return (
    <div
      className={classnames({ 'is-loading': isLoading })}
      {...filterInvalidDOMProps(rest)}
    >
      {children}
    </div>
  )
}

LoadingContainer.propTypes = propTypes
LoadingContainer.defaultProps = defaultProps

export default LoadingContainer
