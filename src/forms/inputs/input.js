import React from 'react'
import PropTypes from 'prop-types'
import {
  blurDirty,
  fieldPropTypes,
  hasInputError,
  omitLabelProps,
} from '../helpers'
import { LabeledField } from '../labels'
import {
  compose,
  filterInvalidDOMProps,
  generateInputErrorId,
} from '../../utils'

/**
 *
 * An input element that can be used in a `redux-forms`-controlled form.
 *
 * Note: The `input` tag is surrounded by a `div` with class `"input-wrapper"`.
 * Any children passed to this component will be rendered within this wrapper.
 *
 * @name Input
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {String} [type] - A string to specify the type of input element (defaults to `text`)
 * @param {String} [ariaLabel] - A string to specify the label of the input element to assistive technologies when a standard label is not provided (will be overriden by `ariaLabelledby`)
 * @param {String} [ariaLabelledby] - A string that corresponds to the `id` of one or more elements used as the label of the input element for assistive technologies when a standard label is not provided (will override `ariaLabel`)
 * @example
 *
 * function UserForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="firstName"
 *          component={ Input }
 *          placeholder="Your first name"
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 */

const propTypes = {
  ...fieldPropTypes,
  ariaLabel: PropTypes.string,
  ariaLabelledby: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
}

const defaultProps = {
  ariaLabel: null,
  ariaLabelledby: null,
  type: 'text',
}

function Input(props) {
  const {
    input: { name, value, onBlur, onChange },
    id,
    meta, // eslint-disable-line no-unused-vars
    className, // eslint-disable-line no-unused-vars
    ariaLabel,
    ariaLabelledby,
    type,
    children,
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField {...props}>
      <div className="input-wrapper">
        <input
          {...{
            id: id || name,
            name,
            type,
            value,
            onBlur,
            onChange,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            'aria-describedby': hasInputError(meta)
              ? generateInputErrorId(name)
              : null,
            ...filterInvalidDOMProps(rest),
          }}
        />
        {children}
      </div>
    </LabeledField>
  )
}

Input.defaultProps = defaultProps
Input.propTypes = propTypes

export default compose(blurDirty())(Input)
