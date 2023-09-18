import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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
 * A textarea input that can be used in a `redux-form`-controlled form.
 * Can forward ref down to textarea input and optionally displays a character count.
 *
 * @name Textarea
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Number} [maxLength] - The maximum allowed length of the input
 * @param {Boolean} [hideCharacterCount=false] - Whether to hide the character count if given a maxLength
 * @param {Ref} [forwardedRef] - A ref to be forwarded to `textarea` input (standard `ref` cannot currently be forwarded)
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
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      // eslint-disable-next-line no-undef
      current: PropTypes.instanceOf(Element),
    }),
  ]),
}

const defaultProps = {
  maxLength: null,
  hideCharacterCount: false,
  forwardedRef: null,
}

function Textarea(props) {
  const {
    input: { name, value, onBlur, onChange },
    meta,
    hideCharacterCount,
    className,
    maxLength,
    forwardedRef,
    ...rest
  } = props
  const inputProps = filterInvalidDOMProps(omitLabelProps(rest))
  return (
    <LabeledField
      className={classnames(className, {
        'with-character-count': !hideCharacterCount,
      })}
      {...props}
    >
      {maxLength !== null && !hideCharacterCount && (
        <span className="character-count">
          {`${value.length}/${maxLength} characters`}
        </span>
      )}
      <textarea
        {...{
          id: name,
          maxLength,
          name,
          value,
          onBlur,
          onChange,
          ref: forwardedRef,
          'aria-describedby': hasInputError(meta)
            ? generateInputErrorId(name)
            : null,
          ...inputProps,
        }}
      />
    </LabeledField>
  )
}

Textarea.propTypes = propTypes
Textarea.defaultProps = defaultProps

export default compose(blurDirty())(Textarea)
