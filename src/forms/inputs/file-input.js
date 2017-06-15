import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../buttons'
import { fieldPropTypes, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'

class FileInput extends React.Component {

  static propTypes = {
    ...fieldPropTypes,
    onLoad: PropTypes.func,
    className: PropTypes.string,
    hidePreview: PropTypes.bool,
    thumbnail: PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.loadFile = this.loadFile.bind(this)
    this.callChangeHandler = this.callChangeHandler.bind(this)
    this.reader = new FileReader()
  }

  loadFile (e) {
    const file = e.target.files[0]
    // Add callback to FileReader
    const handleFileRead = (readEvent) => {
      const fileData = readEvent.target.result
      this.callChangeHandler(fileData, file)
    }
    this.reader.onload = handleFileRead
    this.reader.readAsDataURL(file)
  }

  callChangeHandler (fileData, file) {
    // Alias onChange with onLoad
    const { onLoad, input: { onChange } } = this.props
    if (onLoad) onLoad(fileData, file)
    if (onChange) onChange(fileData, file)
  }

  render () {
    const {
      input: { name, value },
      meta,   // eslint-disable-line no-unused-vars
      onLoad, // eslint-disable-line no-unused-vars
      className, // eslint-disable-line no-unused-vars
      children,
      submitting,
      hidePreview,
      thumbnail,
      ...rest
    } = omitLabelProps(this.props)

    return (
      <LabeledField { ...this.props }>
        <div className="fileupload fileupload-exists">
          { !hidePreview &&
            ( children ||
              <div className="thumbnail">
                <img { ...{ src: value || thumbnail, ...rest } } />
              </div>
            )
          }
          <Button style="secondary-light" submitting={ submitting }>
            <span className="fileupload-exists"> Select File </span>
              <input 
                {...{
                  id: name,
                  name,
                  type: 'file',
                  onChange: this.loadFile,
                }}
              />
          </Button>
        </div>
      </LabeledField>
    )
  }
}

export default FileInput
