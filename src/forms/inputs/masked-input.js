import React from 'react'
import PropTypes from 'prop-types'
import { blurDirty, fieldPropTypes, hasInputError, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { compose, filterInvalidDOMProps, generateInputErrorId } from '../../utils'
import Cleave from 'cleave.js/react'

/**
 *
 * A masked input that can be used in a `redux-forms`-controlled form. Built on top of [cleave.js](https://github.com/nosir/cleave.js).
 * 
 * @name MaskedInput
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Object} [maskOptions] - An object of options to pass to the underlying `Cleave` instance. [(supported options)](https://github.com/nosir/cleave.js/blob/master/doc/options.md)
 * @example
 * 
 * function PurchaseForm ({ handleSubmit, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field 
 *          name="quantity"
 *          component={ MaskedInput }
 *          maskOptions={{ numeral: true }}
 *       />
 *       <SubmitButton submitting={submitting}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 */

const propTypes = {
  ...fieldPropTypes,
  maskOptions: PropTypes.object,
  children: PropTypes.node,
}

const defaultProps = {
  maskOptions: {}
}

function MaskedInput (props) {
  const {
    input: { name, value, onBlur, onChange },
    id,
    meta, // eslint-disable-line no-unused-vars
    className, // eslint-disable-line no-unused-vars
    children,
    maskOptions,
    ...rest
  } = omitLabelProps(props)
  return (
    <LabeledField { ...props }>
      <div className="input-wrapper">
        <Cleave
          {...{
            id: id || name,
            name,
            value,
            onBlur,
            onChange,
            'aria-describedby': hasInputError(meta) ? generateInputErrorId(name) : null,
            options: maskOptions,
            ...filterInvalidDOMProps(rest)
          }}
        />
        { children }
      </div>
    </LabeledField>
  )
}

MaskedInput.defaultProps = defaultProps
MaskedInput.propTypes = propTypes

export default compose(
  blurDirty()
)(MaskedInput)
