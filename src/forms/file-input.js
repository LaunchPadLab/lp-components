import React, { PropTypes } from 'react'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'
import Button from './button'

class FileInput extends React.Component {

  static propTypes = {
    ...fieldPropTypes,
    ...InputLabel.propTypes,
    ...InputError.propTypes,
    onLoad: PropTypes.func,
    className: PropTypes.string,
    thumbnail: PropTypes.string,
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
      input: { name, value },
      meta: { error, touched, invalid },
      className,
      hint,
      label,
      tooltip,
      children,
      submitting,
      thumbnail,
      onLoad,       // eslint-disable-line no-unused-vars
      ...rest
    } = this.props

    return (
      <fieldset className={ className }>

        <InputLabel { ...{ hint, label, name, tooltip } } />

        <div className="fileupload fileupload-exists">
          
          { children ||
            <div className="thumbnail">
              <img { ...{ src: value || thumbnail, ...rest } } />
            </div>
          }
          
          <Button style="secondary-light" submitting={ submitting }>
            <span className="fileupload-exists">Select File</span>
              <input { ...{
                id: name,
                name,
                type: 'file',
                onChange: this.loadFile,
              } }/>
          </Button>
        </div>

        <InputError { ...{ error, invalid, touched } } />
      </fieldset>
    )
  }
}

export default FileInput
