import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { blurDirty, fieldPropTypes, fieldOptionsType, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { compose, objectify } from '../../utils'

/**
 *
 * A select input that can be used in a `redux-forms`-controlled form. 
 * 
 * The value of each option is specified via the `options` prop. This prop can either be:
 * - An array of strings 
 * - An array of key-value pairs: `{ key, value }`
 * 
 * The value of the `Select` component will be the same as the value of the selected option.
 * 
 * @name Select
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Array} options - An array of option values (strings or key-value pairs)
 * @param {String} [placeholder] - A string to display as a placeholder option
 * @param {Boolean} [emptyOption=false] - A flag indicating that the placeholder option should not be `disabled`
 * @example
 *
 * // With string options
 * 
 * function PaintColorForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field 
 *          name="paintColor"
 *          component={ Select }
 *          options={[
 *            'Purple',
 *            'Green',
 *            'Magenta',
 *          ]}
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 *
 * // With object options
 *
 * function EmployeeForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field 
 *          name="employeeId"
 *          component={ Select }
 *          options={[
 *            { key: 'Janet', value: 100 },
 *            { key: 'Bob', value: 101 },
 *          ]}
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
  emptyOption: PropTypes.bool,
  placeholder: PropTypes.string,
  options: fieldOptionsType,
}

const defaultProps = {
  emptyOption: false,
  options: [],
}

function Select (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    className, // eslint-disable-line no-unused-vars
    emptyOption,
    options,
    placeholder,
    ...rest
  } = omitLabelProps(props)
  const optionObjects = objectify(options)
  return (
    <LabeledField { ...props }>
      <select 
        {...{
          id: name,
          className: classnames({ 'unselected': value === '' }),
          name,
          value,
          onBlur,
          onChange,
          ...rest 
        }}
      >
        { 
          placeholder &&
          <option value='' disabled={ !emptyOption }>
            { placeholder }
          </option>
        }
        { 
          optionObjects.map(({ key, value }) =>
            <option key={ key } value={ value }>
              { key }
            </option>
          )
        }
      </select>
     </LabeledField>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default compose(
  blurDirty()
)(Select)
