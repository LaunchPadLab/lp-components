import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { blurDirty, fieldPropTypes } from '../helpers'
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
 * @param {Number} [maxLength=500] - The maximum allowed length of the input
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

class Textarea extends React.Component {

  static propTypes = {
    ...fieldPropTypes,
    showCharacterCount: PropTypes.bool,
    maxLength: PropTypes.number,
  }

  static defaultProps = {
    maxLength: 500,
    showCharacterCount: true,
  }

  constructor(props) {
    super(props)
    this.state = { numChars: props.input.value.length }
  }

  componentWillReceiveProps ({ input: { value } }) {
    if (value.length !== this.props.input.value.length) {
      this.setState({ numChars: value.length })
    }
  }

  render () {
    const {
      input: { name, value, onBlur, onChange },
      meta, // eslint-disable-line no-unused-vars
      showCharacterCount,
      className,
      maxLength,
      ...rest
    } = this.props
    const { numChars } = this.state
    return (
      <LabeledField 
        className={classnames(className, 'with-character-count': showCharacterCount)} 
        { ...this.props }
      >
        { showCharacterCount &&
            <span className="character-count">
              { `${numChars}/${maxLength} characters` }
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
}

export default compose(
  blurDirty()
)(Textarea)
