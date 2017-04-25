import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../buttons'
import { fieldPropTypes } from '../helpers'
import { LabeledField } from '../labels'

class FileInput extends React.Component {

  static propTypes = {
    ...fieldPropTypes,
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
      meta,   // eslint-disable-line no-unused-vars
      onLoad, // eslint-disable-line no-unused-vars
      children,
      submitting,
      thumbnail,
      ...rest
    } = this.props

    return (
      <LabeledField { ...this.props }>
        <div className="fileupload fileupload-exists">
          { children ||
            <div className="thumbnail">
              <img { ...{ src: value || thumbnail, ...rest } } />
            </div>
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
