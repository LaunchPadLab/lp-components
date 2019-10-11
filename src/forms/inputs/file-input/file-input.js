import React from 'react'
import PropTypes from 'prop-types'
import { buttonClasses, fieldPropTypes, hasInputError, isImageType, omitLabelProps } from '../../helpers'
import { LabeledField } from '../../labels'
import FilePreview from './file-preview'
import ImagePreview from './image-preview';
import { get, noop, generateInputErrorId, removeAt, castArray, isString } from '../../../utils'

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
 * @param {Function} [onRead] - A callback fired when the file data has been read
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
  onRead: PropTypes.func,
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
  onRead: noop,
  onRemove: noop,
}

// Read a file and convert it to a base64 string (promisified)
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
    // this.state = { files: [] } // TODO: Should we be doing this?
    this.readFiles = this.readFiles.bind(this)
    this.onChange = this.onChange.bind(this)
    this.removeFile = this.removeFile.bind(this)
    
    this.fileInput = null
    this.setFileInputRef = element => {
      this.fileInput = element
    }
    this.clearFileInput = () => {
      // Focus the text input using the raw DOM API
      if (this.fileInput) this.fileInput.value = ""
    }
  }

  readFiles (e) {
    const existingFiles = castArray(get('value', this.props) || []) // or this.state.files
    
    // Read files as data URL and call change handlers
    const files = [...e.target.files] // when multiple=false, `files` is still array-like
    
    // Do not reload files that have been successfully loaded
    const filesToLoad = files.filter((file) => {
      return !existingFiles.some(({ name }) => name === file.name)
    })
    
    return filesToLoad.map((file) => {
      return readFile(file)
        .then((fileData) => {
          // Pass metadata related to file, but not actual File object (properties are not enumerable / visible in Redux)
          return this.onChange({ file: { name: file.name, size: file.size, type: file.type }, fileData })
        })
    })
  }
  
  async onChange (fileInfo) {
    // Call redux forms onChange and onLoad callback
    const { input: { onChange, value: existingFiles }, onRead, multiple } = this.props
    
    // Only add value to form if successfully loads
    try {
      const result = await Promise.resolve(onRead(fileInfo)) // wrap in a promise (just in case)
      
      
      // Add to array of multiple files are allowed, otherwise replace
      const filesToKeep = multiple ? existingFiles : []
      const fileToAdd = result ? result : fileInfo
      
      onChange([...filesToKeep, fileToAdd])
      
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
    
    // if (multiple) {
    //   onChange([...value, fileData])
    //   this.setState((state) => {
    //     return { files: [ ...state.files, file ] }
    //   })
    // } else {
    //   onChange(fileData)
    //   this.setState({ files: [file] })
    // }
    // onLoad(fileData, file)
  }
  
  async removeFile (idx) {
    const { input: { onChange, value }, onRemove } = this.props
    const [removedFile, remainingFiles] = removeAt(value, idx)
    // const [removedFile, remainingFiles] = removeAt(this.state.files, idx)
    
    try {
      await Promise.resolve(onRemove(removedFile)) // wrap in a promise (just in case)
      onChange(remainingFiles)
      
      // If all files have been removed, then reset the native input
      if (!remainingFiles.length) this.clearFileInput()
    } catch (e) {
      // do nothing -- or maybe throw a field error?
    }
    
    // this.setState({ files: remainingFiles })
  }

  render () {
    const {
      input: { name, value },
      meta, // eslint-disable-line no-unused-vars
      onRead, // eslint-disable-line no-unused-vars
      className, // eslint-disable-line no-unused-vars
      submitting,
      accept,
      hidePreview,
      multiple,
      removeComponent: RemoveComponent = RemoveButton,
      ...rest
    } = omitLabelProps(this.props)
    // const { files } = this.state
    const wrapperClass = buttonClasses({ style: 'secondary-light', submitting })
    const labelText = multiple ? 'Select File(s)' : 'Select File'
    
    const values = castArray(value || [])
    
    return (
      <LabeledField { ...this.props }>
        <div className="fileupload fileupload-exists">
          { 
            !hidePreview &&
            values.map((value, idx) => {
              const fileValue = isString(value) ? value : (get('fileUpload.url', value) || get('fileData', value))
              const file = isString(value) ? { name: 'Uploaded File' } : get('file', value)
              
              return (
                <div key={file.name}>
                  <RenderPreview
                    file={file}
                    value={fileValue}
                    {...rest}
                  />
                  { multiple && <RemoveComponent onRemove={() => this.removeFile(idx) } /> }
                </div>
              )
            })
          }
          <div className={ wrapperClass }>
            <span className="fileupload-exists" id={name+'-label'}> { labelText } </span>
              <input
                {...{
                  id: name,
                  name,
                  type: 'file',
                  onClick: this.clearFileInput, // force onChange to fire _every_ time (use case: attempting to upload the same file after a failure)
                  onChange: this.readFiles,
                  accept,
                  multiple,
                  'aria-labelledby': name + '-label',
                  'aria-describedby': hasInputError(meta) ? generateInputErrorId(name) : null,
                  ref: this.setFileInputRef,
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

function RemoveButton ({ onRemove }) {
  return (
    <button
      type="button"
      className="remove-file"
      onClick={onRemove}
    >
      x
    </button>
  )
}

FileInput.propTypes = propTypes
FileInput.defaultProps = defaultProps

export default FileInput
