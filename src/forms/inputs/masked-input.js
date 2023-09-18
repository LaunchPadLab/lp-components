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
import Cleave from 'cleave.js/react'

/**
 *
 * A masked input that can be used in a `redux-form`-controlled form. Built on top of [cleave.js](https://github.com/nosir/cleave.js).
 *
 * @name MaskedInput
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Object} [maskOptions={}] - An object of options to pass to the underlying `Cleave` instance. [(supported options)](https://github.com/nosir/cleave.js/blob/master/doc/options.md)
 * @param {Function} [onInit=null] - A function that will be invoked with the object representing the class when the input is initialized
 * @param {Function|Object} [htmlRef=null] - A stable reference that can be used to access the DOM node of the underlying input
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
  onInit: PropTypes.func,
  htmlRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      // eslint-disable-next-line no-undef
      current: PropTypes.instanceOf(Element),
    }),
  ]),
}

const defaultProps = {
  maskOptions: {},
  onInit: null,
  htmlRef: null,
}

// Cleave.js expects the prop to be a callback, despite React supporting passing
// the ref attribute directly.
const createHtmlRefCallback = (htmlRefProp) => {
  if (!htmlRefProp || typeof htmlRefProp === 'function') return htmlRefProp
  return (el) => (htmlRefProp.current = el)
}

function MaskedInput(props) {
  const {
    input: { name, value, onBlur, onChange },
    id,
    meta, // eslint-disable-line no-unused-vars
    className, // eslint-disable-line no-unused-vars
    children,
    maskOptions,
    onInit,
    htmlRef,
    ...rest
  } = props
  const inputProps = filterInvalidDOMProps(omitLabelProps(rest))

  return (
    <LabeledField {...props}>
      <div className="input-wrapper">
        <Cleave
          {...{
            id: id || name,
            name,
            value,
            onBlur,
            onChange,
            'aria-describedby': hasInputError(meta)
              ? generateInputErrorId(name)
              : null,
            options: maskOptions,
            onInit,
            htmlRef: createHtmlRefCallback(htmlRef),
            ...inputProps,
          }}
        />
        {children}
      </div>
    </LabeledField>
  )
}

MaskedInput.defaultProps = defaultProps
MaskedInput.propTypes = propTypes

export default compose(blurDirty())(MaskedInput)
