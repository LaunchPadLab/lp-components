import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { convertNameToLabel } from '../helpers'

/**
 *
 * A legend representing a caption for the content of its parent field set element
 *
 * This component must be used as a direct child and the only legend of the <fieldset> element that groups related controls
 * 
 *
 * The text of the legend is set using the following rules:
 * - If the `label` prop is set to `false`, the legend is hidden visually
 * - Else If the `label` prop is set to a string, the label will display that text
 * - Otherwise, the label will be set using the `name` prop.
 *
 * 
 * @name FieldSetLegend
 * @type Function
 * @param {String} name - The name of the associated group
 * @param {String} [hint] - A usage hint for the associated input
 * @param {String|Boolean} [label] - Custom text for the legend
 * @param {Boolean} [required] - A boolean value to indicate whether the field is required
 * @param {String} [requiredIndicator] - Custom character to denote a field is required (optional, default `''`)

 * @example
 *
 *
 * function ShippingAddress (props) {
 *   const name = 'shippingAddress'
 *   return (
 *      <fieldset>
 *       <FieldSetLegend name={name} />
 *       <Input id={`${name}.name`} input={{name: 'name'}} />
 *       <Input id={`${name}.street`} input={{name: 'street'}} />
 *       <Input id={`${name}.city`}" input={{name: 'city'}} />
 *       <Input id={`${name}.state`} input={{name: 'state'}} />
 *     </fieldset>
 *   )
 * }
 *
 */

const propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  requiredIndicator: PropTypes.string,
  className: PropTypes.string,
  hint: PropTypes.string,
}

const defaultProps = {
  children: null,
  hint: '',
  label: '',
  requiredIndicator: '',
  className: '',
}

function FieldSetLegend({
  label,
  name,
  required,
  requiredIndicator,
  className,
  hint,
}) {
  return (
    <legend
      className={classnames(className, { 'visually-hidden': label === false })}
    >
      {label || convertNameToLabel(name)}
      {required && requiredIndicator && (
        <span className="required-indicator" aria-hidden="true">
          {requiredIndicator}
        </span>
      )}
      {hint && <i>{hint}</i>}
    </legend>
  )
}

FieldSetLegend.propTypes = propTypes
FieldSetLegend.defaultProps = defaultProps

export default FieldSetLegend
