import React from 'react'
import PropTypes from 'prop-types'
import { buttonClasses, fieldPropTypes, isImageType, omitLabelProps } from '../../helpers'
import { LabeledField } from '../../labels'
import FilePreview from './file-preview'
import ImagePreview from './image-preview';
import { noop } from '../../../utils'

/**
 *
 * A file input that can be used in a `redux-forms`-controlled form. 
 * The value of this input is the data URL of the loaded file. 
 *
 * An optional callback can be fired when the file is loaded: `onLoad(fileData, file)`. 
 * This callback will be passed the data URL of the file, as well as the `File` object itself.
 *
 * By default, this component displays a thumbnail preview of the loaded file. This preview can be customized
 * by using the `thumbnail` or `hidePreview` props, as well as by passing a custom preview via `previewComponent` or `children`.
 * A component passed using `previewComponent` will receive a `file` prop containing the uploaded file object or `null`.
 * 
 * @name FileInput
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Function} [onLoad] - A callback fired when the file is loaded
 * @param {String} [thumbnail] - A placeholder image to display before the file is loaded
 * @param {Boolean} [hidePreview] - A flag indicating whether or not to hide the file preview
 * @example
 * 
 * function HeadshotForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field 
 *          name="headshot" 
 *          component={ FileInput } 
 *          onLoad={ (fileData, file) => console.log('Loaded file!', file) }
 *       />
 *       <SubmitButton {...{ pristine, invalid, submitting }}>
 *         Submit
 *       </SubmitButton>
 *     </form>
 *   )
 * }
**/

const propTypes = {
  ...fieldPropTypes,
  onLoad: PropTypes.func,
  thumbnail: PropTypes.string,
  hidePreview: PropTypes.bool,
  className: PropTypes.string,
  previewComponent: PropTypes.func,
  children: PropTypes.node,
}

const defaultProps = {
  onLoad: noop,
}

class FileInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = { file: null }
    this.reader = new FileReader()
    this.loadFile = this.loadFile.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  loadFile (e) {
    // Read file as data URL and call change handlers
    const file = e.target.files[0]
    this.reader.onload = (readEvent) => {
      const fileData = readEvent.target.result
      this.onChange(fileData, file)
    }
    this.reader.readAsDataURL(file)
  }

  onChange (fileData, file) {
    // Call redux forms onChange and onLoad callback
    const { input: { onChange }, onLoad } = this.props
    onChange(fileData)
    onLoad(fileData, file)
    this.setState({ file })
  }

  render () {
    const {
      input: { name, value },
      meta,   // eslint-disable-line no-unused-vars
      onLoad, // eslint-disable-line no-unused-vars
      className, // eslint-disable-line no-unused-vars
      submitting,
      accept,
      hidePreview,
      ...rest
    } = omitLabelProps(this.props)
    const { file } = this.state
    const wrapperClass = buttonClasses({ style: 'secondary-light', submitting })
    return (
      <LabeledField { ...this.props }>
        <div className="fileupload fileupload-exists">
          { 
            !hidePreview &&
            renderPreview({ file, value, ...rest })
          }
          <div className={ wrapperClass }>
            <span className="fileupload-exists"> Select File </span>
              <input 
                {...{
                  id: name,
                  name,
                  type: 'file',
                  onChange: this.loadFile,
                  accept,
                }}
              />
          </div>
        </div>
      </LabeledField>
    )
  }
}

// eslint-disable-next-line react/prop-types
function renderPreview ({ file, value, thumbnail, previewComponent: Component, children }) {
  if (Component) return <Component file={ file } />
  if (children) return children
  const renderImagePreview = isImageType(file) || thumbnail
  if (renderImagePreview) return <ImagePreview image={ value || thumbnail } />
  return <FilePreview file={ file } />
}

FileInput.propTypes = propTypes

FileInput.defaultProps = defaultProps

export default FileInput
