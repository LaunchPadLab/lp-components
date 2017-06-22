import React from 'react'
import PropTypes from 'prop-types'
import { fieldPropTypes } from '../helpers'

/**
 *
 * A component that returns an `<a>` element that can be used to change the value of an input in a `redux-forms`-controlled form.
 * 
 * @name SetterLink
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {String} label - The link text
 * @param {Any} [valueToSet=true] - The value to set the input when clicked
 * @example
 * 
 * function FilterForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field 
 *          name="searchFilter"
 *          component={ SetterLink } 
 *          label="Clear Search Filters" 
 *          valueToSet={ [] }
 *        />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 *
**/

const propTypes = {
  ...fieldPropTypes,
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
  valueToSet: PropTypes.any,
}

const defaultProps = {
  valueToSet: true,
}

function SetterLink ({
  input: { name, onChange },
  label,
  valueToSet,
  className
}) {
  return (
    <a
      id={ name }
      onClick={() => onChange(valueToSet)}
      className={ className }
    >
      { label }
    </a>
  )
}

SetterLink.propTypes = propTypes
SetterLink.defaultProps = defaultProps

export default SetterLink