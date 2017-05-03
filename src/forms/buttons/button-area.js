import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 *
 * A layout component that wraps its children in a `div` with class `button-area`. This component may be used to help style forms.
 *
 * If a `className` is provided to the component, it will be appended to the default class (see example).
 * 
 * @name ButtonArea
 * @type Function
 * @param {String} [className] - A class to add to the wrapper
 * @param {Function} [children] - The React component(s) being wrapped
 * @example
 * 
 * function ButtonForm ({ handleSubmit }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <ButtonArea className="my-area">
 *         <Button> Cancel </Button>
 *         <Button> Submit </Button>
 *       </ButtonArea>
 *     </form>
 *   )
 * }
 *
 * // Buttons will be wrapped in a div with class: "button-area my-area"
 *
**/

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

function ButtonArea ({ className, children }) {
  return (
    <div className={ classnames('button-area', className) }>
      { children }
    </div>
  )
}

ButtonArea.propTypes = propTypes

export default ButtonArea
