import React from 'react'
import PropTypes from 'prop-types'
import { fieldPropTypes, hasInputError, applyFormAdapter } from '../helpers'
import { LabeledField } from '../labels'
import { filterInvalidDOMProps, generateInputErrorId, noop } from '../../utils'

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
  children: PropTypes.node,
}

const defaultProps = {
  onChange: noop,
}

function Input(props) {
  const {
    id,
    name,
    invalid,
    touched,
    onChange,
    className, // eslint-disable-line no-unused-vars
    children,
    ...rest
  } = props
  return (
    <LabeledField {...props}>
      <div className="input-wrapper">
        <input
          {...{
            id: id || name,
            onChange: (e) => onChange(e.target.value),
            'aria-describedby': hasInputError({ invalid, touched })
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

export default applyFormAdapter(Input)
