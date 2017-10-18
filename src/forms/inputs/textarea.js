import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { blurDirty, fieldPropTypes, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { compose } from '../../utils'

/**
 *
 * A textarea input that can be used in a `redux-forms`-controlled form. Optionally displays a character count.
 *
 * @name Textarea
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Number} [maxLength=500] - The maximum allowed length of the input. Accepts `false` for the option to not set a max length.
 * @param {Boolean} [showCharacterCount=true] - Whether or not to display a character count
 * @example
 *
 * function BiographyForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="biography"
 *          component={ Textarea }
 *          maxLength={ 1000 }
 *          showCharacterCount={ false }
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
  showCharacterCount: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
}

const defaultProps = {
  maxLength: 500,
  showCharacterCount: true,
}

function Textarea (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    showCharacterCount,
    className,
    maxLength,
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField
      className={ classnames(className, { 'with-character-count': showCharacterCount }) }
      { ...props }
    >
      {
        !!maxLength && showCharacterCount &&
        <span className="character-count">
          { `${ value.length }/${ maxLength } characters` }
        </span>
      }
      <textarea
        {...{
          id: name,
          maxLength,
          name,
          value,
          onBlur,
          onChange,
          ...rest,
        }}
      />
    </LabeledField>
  )
}

Textarea.propTypes = propTypes

Textarea.defaultProps = defaultProps

export default compose(
  blurDirty()
)(Textarea)
