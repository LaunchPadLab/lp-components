import React, { PropTypes } from 'react'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

class FileInput extends React.Component {

  static propTypes = {
    ...fieldPropTypes,
    ...InputLabel.propTypes,
    ...InputError.propTypes,
    onLoad: PropTypes.func,
    className: PropTypes.string,
  }

  constructor (props) {
    super(props)

    this.loadFile = this.loadFile.bind(this)

    const { onLoad, onChange } = this.props

    this.reader = new FileReader()
    this.reader.onload = onLoad
      ? event => onLoad(event.target.result)
      : onChange
  }

  loadFile (event) {
    const file = event.target.files[0]
    this.reader.readAsDataURL(file)
  }

  render () {
    const {
      input: { name, value, onChange },
      meta: { error, touched, invalid },
      className,
      hint,
      label,
      onLoad,
      tooltip,
      children,
      ...rest
    } = this.props

    return (
      <fieldset className={ className }>

        <InputLabel { ...{ hint, label, name, tooltip } } />

        <input { ...{
          id: name,
          name,
          type: 'file',
          onChange: this.loadFile,
        } }/>

        { children ?
          children :
          value && <img { ...{ src: value, ...rest } }/>
        }

        <InputError { ...{ error, invalid, touched } } />
      </fieldset>
    )
  }
}

export default FileInput
