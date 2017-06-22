import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../buttons'
import { fieldPropTypes, omitLabelProps } from '../helpers'
import { LabeledField } from '../labels'
import { noop } from '../../utils'

const propTypes = {
  ...fieldPropTypes,
  onLoad: PropTypes.func,
  className: PropTypes.string,
  hidePreview: PropTypes.bool,
  thumbnail: PropTypes.string,
}

const defaultProps = {
  onLoad: noop,
}

class FileInput extends React.Component {

  constructor (props) {
    super(props)
    this.loadFile = this.loadFile.bind(this)
    this.onChange = this.onChange.bind(this)
    this.reader = new FileReader()
  }

  loadFile (e) {
    const file = e.target.files[0]
    // Add callback to FileReader
    this.reader.onload = (readEvent) => {
      const fileData = readEvent.target.result
      this.onChange(fileData, file)
    }
    this.reader.readAsDataURL(file)
  }

  onChange (fileData, file) {
    // Call redux forms onChange and given onLoad
    const { input: { onChange }, onLoad } = this.props
    onChange(fileData)
    onLoad(fileData, file)
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
          { 
            !hidePreview &&
            ( 
              children ||
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

FileInput.propTypes = propTypes
FileInput.defaultProps = defaultProps

export default FileInput
