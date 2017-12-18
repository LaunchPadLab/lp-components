import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 *
 * A wrapper component that visually indicates whether a child component
 * is loading, or loaded.
 *
 * 
 * @name LoadingContainer
 * @type Function
 * @example
 * 
 * function PatientIndex ({ patientProfiles }) {
 *   return (
 *    <div>
 *     {
 *      <div className="card-inner">
 *         <LoadingContainer isLoading={ !patientProfiles }>
 *           <div> Render Child Component </div>
 *         </LoadingContainer>
 *       </div>
 *      }
 *    </div>
 *   )
 * }
 *
 * // LoadingContainer renders child components with modified opacity
 * depending on if the value passed to isLoading evaluates to truthy or * falsey
**/

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  defaultProps: PropTypes.object
}

const defaultProps = {
  isLoading: true
}

function LoadingContainer({ isLoading, ...rest}) {
  return (
    <div className={
      classnames({'is-loading': isLoading})
    }{...rest}/>
  )
}

LoadingContainer.propTypes = propTypes
LoadingContainer.defaultProps = defaultProps

export default LoadingContainer