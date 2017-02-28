import React, { PropTypes } from 'react'
import classnames from 'classnames'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

class Textarea extends React.Component {

  static propTypes = {
    ...fieldPropTypes,
    ...InputLabel.propTypes,
    ...InputError.propTypes,
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
      meta: { error, touched, invalid },
      showCharacterCount,
      className,
      hint,
      label,
      maxLength,
      tooltip,
      ...rest
    } = this.props

    const { numChars } = this.state

    const classes = classnames(className, {
      'with-character-count': showCharacterCount,
      error: touched && invalid,
    })

    return (
      <fieldset className={ classes }>

        <InputLabel { ...{ hint, label, name, tooltip } } />

        { showCharacterCount &&
            <span className="character-count">
              { `${numChars}/${maxLength} characters` }
            </span>
        }

        <textarea { ...{
          id: name,
          maxLength,
          name,
          value,
          onBlur,
          onChange,
          ...rest,
        } }/>

        <InputError { ...{ error, invalid, touched } } />
      </fieldset>
    )
  }
}

export default Textarea
