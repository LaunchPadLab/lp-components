import React from 'react'
import PropTypes from 'prop-types'
import Input from './input'
import classnames from 'classnames'

/**
 *
 * A wrapper around the {@link Input} component that adds an icon to the input.
 *
 * This icon is rendered as an `<i>` tag, with a dynamic class based on the `icon` prop. 
 * For example, given an `icon` prop of `"twitter"`, the component will render an {@link Input} with child `<i className="twitter-icon"/>`.
 *
 * Additionally, the fieldset of this {@link Input} will be given the class `"icon-label"` for styling purposes.
 *
 * @name IconInput
 * @type Function
 * @param {String} icon - The name of the icon associated with the input
 * @example
 * 
 * function TwitterForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field 
 *          name="handle"
 *          component={ IconInput }
 *          icon="twitter"
 *          placeholder="Your twitter handle"
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
**/

const propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
}

function IconInput (props) {
  const { icon, className } = props
  return (
    <Input {...{
      ...props,
      className: classnames('icon-label', className),
    }}>
      <i className={ `${icon}-icon` } />
    </Input>
  )
}

IconInput.propTypes = propTypes

export default IconInput
