import React from 'react'
import PropTypes from 'prop-types'
import { wrapDisplayName, noop, set, omit } from '../../utils'

/**
 *
 * A function that returns an HOC to wrap a `redux-forms`-controlled input.
 *
 * If the input is pristine, this HOC replaces the passed `onBlur` with an empty function.
 * This prevents the form from being re-validated unless its value has changed.
 * This behavior can be overridden by passing the wrapped component an `alwaysBlur` prop with the value `true`.
 *
 * Note: every input in lp-components has been wrapped in this HOC.
 *
 * @name blurDirty
 * @type Function
 * @example
 *
 * function TextForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field name="text" component={ Input } />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
 *
 * export default compose(
 *    blurDirty()
 * )(TextForm)
 */

/* eslint react/prop-types: off */

function blurDirty() {
  return (Wrapped) => {
    function Wrapper(props) {
      const {
        meta: { pristine },
        alwaysBlur,
      } = props
      const disableBlur = pristine && !alwaysBlur
      const passedProps = disableBlur ? set('input.onBlur', noop, props) : props
      return <Wrapped {...omit('alwaysBlur', passedProps)} />
    }
    Wrapper.displayName = wrapDisplayName(Wrapped, 'blurDirty')
    Wrapper.propTypes = {
      alwaysBlur: PropTypes.bool,
    }
    return Wrapper
  }
}

export default blurDirty
