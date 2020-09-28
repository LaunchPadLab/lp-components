import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 *
 * A component that displays a flash message.
 *
 * @name FlashMessage
 * @type Function
 * @param {String} children - The flash message that will be displayed.
 * @param {Boolean} [isError] - A flag to indicate whether the message is an error message.
 * @param {Function} [onDismiss] - A callback for dismissing the flash message. The dismiss button will only be shown if this callback is provided.
 * @example
 *
 * function MyView () {
 *   const [message, setMessage] = useState(null)
 *   return (
 *      <div>
 *        {
 *           message &&
 *           <FlashMessage>{message}</FlashMessage>)
 *        }
 *        <button onClick={() => setMessage('Hi!')}> Show message </button>
 *      </div>
 *   )
 * }
 *
 */

const propTypes = {
  children: PropTypes.node.isRequired,
  isError: PropTypes.bool,
  onDismiss: PropTypes.func,
  className: PropTypes.string,
}

const defaultProps = {
  isError: false,
  onDismiss: null,
  className: '',
}

function FlashMessage({ children, isError, onDismiss, className, ...rest }) {
  const statusClass = isError ? 'failure' : 'success'
  return (
    <div
      className={classnames('flash-message', statusClass, className)}
      {...rest}
    >
      {onDismiss && (
        <button type="button" className="dismiss" onClick={() => onDismiss()}>
          ×
        </button>
      )}
      <p> {children} </p>
    </div>
  )
}

FlashMessage.propTypes = propTypes
FlashMessage.defaultProps = defaultProps

export default FlashMessage
