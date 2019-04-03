import React from 'react'
import Input from './input'

/**
 * An Input component that is hidden from the page. The input element is hidden with CSS instead 
 * of using `type="hidden` so that Cypress can still access its value.
 *
 * Aside from being hidden, this component is identical to {@link Input},
 * and will take the same props.
 *
 * @name HiddenInput
 * @type Function
 * @example
 *
 * // Let's say we want the user ID to be included in the form submission,
 * // but we don't want it to be editable:
 *
 * function UserForm ({ handleSubmit }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *        <Field name="user.name" component={ Input } />
 *        <Field name="user.id" component={ HiddenInput } />
 *     </form>
 *   )
 * }
 *
**/

const hiddenStyle = {
  position: 'absolute',
  left: -9999,
  visibility: 'hidden', // removes from tab order AND screen reader
}

function HiddenInput (props) {
  return (
    <div style={ hiddenStyle }>
      <Input { ...props } />
    </div>
  )
}

export default HiddenInput
