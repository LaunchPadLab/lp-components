import React from 'react'
import Button from './button'

/**
 * A wrapper around the {@link Button} component that adds `type="submit"`. Generally used in the context of forms. 
 *
 * With the exception of `type`, this component shares the same props as {@link Button}.
 * 
 * @name SubmitButton
 * @type Function
 * @example
 * 
 * function PersonForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field name="name" component={ Input } />
 *       <Field name="age" component={ Input } type="number" />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 * 
 * // When SubmitButton is pressed, form will submit and handleSubmit() will be called.
 */

function SubmitButton (props) {
  return (
    <Button { ...props } type="submit"/>  
  )
}

export default SubmitButton
