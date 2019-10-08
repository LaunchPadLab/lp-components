import React from 'react'
import PropTypes from 'prop-types'
import { buttonClasses, fieldPropTypes, isImageType, omitLabelProps } from '../../helpers'
import { LabeledField } from '../../labels'
import FilePreview from './file-preview'
import ImagePreview from './image-preview';
import { noop, generateInputErrorId, removeAt } from '../../../utils'

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
 *
 * A component passed using `previewComponent` will receive the following props:
 * - `file`: the uploaded file object, or `null` if no file has been uploaded.
 * - `value`: the current value of the input (data URL or empty string)
 * 
 * @name FileInput
 * @type Function
 * @param {Object} input - A `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-forms` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Boolean} [multiple=false] - A flag indicating whether or not to accept multiple files
 * @param {Function} [onLoad] - A callback fired when the file is loaded
 * @param {Function} [onRemove] - A callback fired when the file is removed (only available when multiple files can be uploaded)
 * @param {String} [thumbnail] - A placeholder image to display before the file is loaded
 * @param {Boolean} [hidePreview=false] - A flag indicating whether or not to hide the file preview
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
 */

const propTypes = {
  ...fieldPropTypes,
  onLoad: PropTypes.func,
  thumbnail: PropTypes.string,
  hidePreview: PropTypes.bool,
  className: PropTypes.string,
  previewComponent: PropTypes.func,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  onRemove: PropTypes.func,
  removeText: PropTypes.string,
}

const defaultProps = {
  multiple: false,
  onLoad: noop,
  onRemove: noop,
  removeText: "x",
}

function readFile (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (readEvent) => {
      resolve(readEvent.target.result)
    }
    reader.onerror = reject
    
    reader.readAsDataURL(file)
  })
}

class FileInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = { files: [] }
    this.loadFiles = this.loadFiles.bind(this)
    this.onChange = this.onChange.bind(this)
    this.removeFile = this.removeFile.bind(this)
  }

  loadFiles (e) {
    // Read files as data URL and call change handlers
    const files = [...e.target.files] // when multiple=false, `files` is still array-like
    return files.map((file) => {
      return readFile(file)
        .then((fileData) => {
          this.onChange(fileData, file)
        })
    })
  }
  
  // TODO: Should this fire once or per file?
  onChange (fileData, file) {
    // Call redux forms onChange and onLoad callback
    const { input: { onChange, value }, onLoad, multiple } = this.props
    
    if (multiple) {
      onChange([...value, fileData])
      this.setState((state) => {
        return { files: [ ...state.files, file ] }
      })
    } else {
      onChange(fileData)
      this.setState({ files: [file] })
    }
    
    onLoad(fileData, file)
  }
  
  removeFile (idx) {
    const { input: { onChange, value }, onRemove } = this.props
    const [removedValue, remainingValues] = removeAt(value, idx)
    const [removedFile, remainingFiles] = removeAt(this.state.files, idx)
    
    onChange(remainingValues)
    onRemove(removedValue, removedFile)
    this.setState({ files: remainingFiles })
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
      multiple,
      removeText,
      ...rest
    } = omitLabelProps(this.props)
    const { files } = this.state
    const wrapperClass = buttonClasses({ style: 'secondary-light', submitting })
    const labelText = multiple ? 'Select File(s)' : 'Select File'
    
    return (
      <LabeledField { ...this.props }>
        <div className="fileupload fileupload-exists">
          { 
            !hidePreview &&
            files.map((file, idx) => (
              <div key={file.name}>
                <RenderPreview
                  file={file}
                  value={value[idx]}
                  {...rest}
                />
                { multiple &&
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => this.removeFile(idx)}
                  >
                    { removeText }
                  </button>
                }
              </div>
            ))
          }
          <div className={ wrapperClass }>
            <span className="fileupload-exists" id={name+'-label'}> { labelText } </span>
              <input 
                {...{
                  id: name,
                  name,
                  type: 'file',
                  onChange: this.loadFiles,
                  accept,
                  multiple,
                  'aria-labelledby': name + '-label',
                  'aria-describedby': generateInputErrorId(name),
                }}
              />
          </div>
        </div>
      </LabeledField>
    )
  }
}

// eslint-disable-next-line react/prop-types
function RenderPreview ({
  file,
  value,
  thumbnail,
  previewComponent: Component,
  children,
  ...rest
}) {
  if (Component) return <Component file={ file } value={ value } { ...rest } />
  if (children) return children
  const renderImagePreview = isImageType(file) || thumbnail
  if (renderImagePreview) return <ImagePreview image={ value || thumbnail } />
  return <FilePreview file={ file } />
}

FileInput.propTypes = propTypes
FileInput.defaultProps = defaultProps

export default FileInput
