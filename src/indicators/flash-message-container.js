import React from 'react'
import PropTypes from 'prop-types'
import { flashMessageType } from 'redux-flash'
import FlashMessage from './flash-message'

/**
 *
 * A component that displays multiple flash messages generated by [redux-flash](https://github.com/LaunchPadLab/redux-flash).
 * Most apps will need only one of these containers at the top level.
 * 
 * @name FlashMessageContainer
 * @type Function
 * @param {Object} messages - The flash messages that will be displayed.
 * @param {Number} [limit] - Maximum number of concurrent messages to display
 * @example
 * 
 * function MyApp ({ messages }) {
 *   return (
 *      <div>
 *         <FlashMessageContainer messages={ messages } />
 *         <RestOfTheApp />
 *      </div>
 *   )
 * }
 *
**/

const propTypes = {
  messages: PropTypes.arrayOf(flashMessageType).isRequired,
  limit: PropTypes.number,
}

const defaultProps = {
  limit: 5,
}

function FlashMessageContainer ({ messages, limit }) {
  const messagesToDisplay = messages.slice(0, limit)
  return (
    <div className="flash-message-container" role="alert">
    {
      messagesToDisplay.map(message => 
        <FlashMessage key={ message.id } message={ message } />
      )
    }
    </div>
  )
}

FlashMessageContainer.propTypes = propTypes
FlashMessageContainer.defaultProps = defaultProps

export default FlashMessageContainer
