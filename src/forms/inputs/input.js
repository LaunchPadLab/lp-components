import React from 'react'
import PropTypes from 'prop-types'
import { blurDirty, fieldPropTypes, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { compose } from '../../utils'

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
**/

const propTypes = {
  ...fieldPropTypes,
  type: PropTypes.string,
  children: PropTypes.node,
}

const defaultProps = {
  type: 'text',
}

function Input (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    className, // eslint-disable-line no-unused-vars
    type,
    children,
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField { ...props }>
      <div className="input-wrapper">
        <input
          {...{
            id: name,
            name,
            type,
            value,
            onBlur,
            onChange,
            ...rest
          }}
        />
        { children }
      </div>
    </LabeledField>
  )
}

Input.defaultProps = defaultProps
Input.propTypes = propTypes

export default compose(
  blurDirty()
)(Input)