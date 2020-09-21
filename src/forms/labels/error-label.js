import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 *
 * A label for displaying error message.
 *
 * @name ErrorLabel
 * @type Function
 * @param {String} children - A message to display
 *
 * @example
 *
 * function MyView () {
 *   const [errorMessage, setErrorMessage] = useState()
 *   return (
 *      <div>
 *       <button onClick={ () => doSomething().catch(setErrorMessage) }>
 *          Do something
 *       </button>
 *      {
 *        errorMessage && <ErrorLabel>{ errorMessage }</ErrorLabel>
 *      }
 *     </div>
 *   )
 * }
 *
 */

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const defaultProps = {
  className: '',
}

function ErrorLabel({ children, className, ...rest }) {
  return (
    <span className={classnames('error-message', className)} {...rest}>
      {children}
    </span>
  )
}

ErrorLabel.propTypes = propTypes
ErrorLabel.defaultProps = defaultProps

export default ErrorLabel
