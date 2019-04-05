import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { blurDirty, fieldPropTypes, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { compose, generateInputErrorId } from '../../utils'

/**
 *
 * A textarea input that can be used in a `redux-forms`-controlled form. Optionally displays a character count.
 *
 * @name Textarea
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Number} [maxLength] - The maximum allowed length of the input
 * @param {Boolean} [hideCharacterCount=false] - Whether to hide the character count if given a maxLength
 * @example
 *
 * function BiographyForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="biography"
 *          component={ Textarea }
 *          maxLength={ 1000 }
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
  hideCharacterCount: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
}

const defaultProps = {
  maxLength: null,
  hideCharacterCount: false,
}

function Textarea (props) {
  const {
    input: { name, value, onBlur, onChange },
    meta, // eslint-disable-line no-unused-vars
    hideCharacterCount,
    className,
    maxLength,
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField
      className={ classnames(className, { 'with-character-count': !hideCharacterCount }) }
      { ...props }
    >
      {
        maxLength !== null && !hideCharacterCount &&
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
          'aria-describedby': generateInputErrorId(name),
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
