import React from 'react'
import PropTypes from 'prop-types'
import { buttonClasses, fileInputPropTypes, hasInputError, isImageType, omitLabelProps } from '../../helpers'
import { InputError, LabeledField } from '../../labels'
import FilePreview from './file-preview'
import ImagePreview from './image-preview';
import { first, noop, generateInputErrorId, removeAt, identity } from '../../../utils'
import classnames from 'classnames'
import { castToFileArray, readFiles } from './helpers'

/**
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
  ...fileInputPropTypes,
  onRead: PropTypes.func,
  thumbnail: PropTypes.string,
  hidePreview: PropTypes.bool,
  className: PropTypes.string,
  previewComponent: PropTypes.func,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  onRemove: PropTypes.func,
  selectText: PropTypes.string,
}

const defaultProps = {
  multiple: false,
  onRead: identity,
  onRemove: noop,
  selectText: '',
}

class FileInput extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = { errors: null }
    this.onChange = this.onChange.bind(this)
    this.removeFile = this.removeFile.bind(this)
    
    this.fileInput = null
    this.setFileInputRef = element => {
      this.fileInput = element
    }
    this.clearFileInput = () => {
      if (this.fileInput) this.fileInput.value = ""
    }
  }
  
  async onChange (fileValues) {
    const { input: { onChange, value: existingFiles }, onRead, multiple } = this.props
    
    try {
      // Only add value to form if file(s) successfully load
      const filesToAdd = await Promise.resolve(onRead(fileValues)) // wrap in a promise (just in case)
      if (!filesToAdd) return
      if (!multiple) return onChange(first(filesToAdd))
      return onChange([...existingFiles, ...filesToAdd])
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      this.setState({ errors: e })
    }
  }
  
  async removeFile (idx) {
    const { input: { onChange, value }, multiple, onRemove } = this.props
    const [removedFile, remainingFiles] = removeAt(value, idx)
    
    try {
      await Promise.resolve(onRemove(removedFile)) // wrap in a promise (just in case)
      
      // If all files have been removed, then reset the native input
      if (!remainingFiles.length) this.clearFileInput()
      
      if (multiple) return onChange(remainingFiles)
      return onChange(null)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      this.setState({ errors: e })
    }
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
      selectText,
      ...rest
    } = omitLabelProps(this.props)
    const { errors } = this.state
    const wrapperClass = buttonClasses({ style: 'secondary-light', submitting })
    const labelText = selectText || (multiple ? 'Select File(s)' : 'Select File')
    const values = castToFileArray(value)
    
    return (
      <LabeledField { ...this.props }>
        <div className="fileupload fileupload-exists">
          { 
            !hidePreview &&
            values.map((value, idx) => {
              return (
                <div key={value.name}>
                  <RenderPreview value={value} {...rest} />
                  { multiple && <RemoveComponent onRemove={() => this.removeFile(idx) } /> }
                </div>
              )
            })
          }
          <div>
            <input
              {...{
                id: name,
                name,
                type: 'file',
                onClick: this.clearFileInput, // force onChange to fire _every_ time (use case: attempting to upload the same file after a failure)
                onChange: async (e) => {
                  this.setState({ errors: null })
                  const files = await readFiles({ newFiles: [...e.target.files], existingFiles: values })
                  return this.onChange(files)
                },
                accept,
                multiple,
                'aria-labelledby': name + '-label',
                'aria-describedby': hasInputError(meta) ? generateInputErrorId(name) : null,
                ref: this.setFileInputRef,
              }}
            />
            {/* Include after input to allowing for styling with adjacent sibling selector */}
            <span className={classnames("fileupload-exists", wrapperClass)} id={name+'-label'}> { labelText } </span>
          </div>
          { errors && <InputError error={errors} className="field-warning" touched invalid /> }
        </div>
      </LabeledField>
    )
  }
}

// eslint-disable-next-line react/prop-types
function RenderPreview ({
  value,
  thumbnail,
  previewComponent: Component,
  children,
  ...rest
}) {
  if (Component) return <Component value={ value } { ...rest } />
  if (children) return children
  const renderImagePreview = isImageType(value.type) || thumbnail
  if (renderImagePreview) return <ImagePreview image={ value.url || thumbnail } />
  return <FilePreview name={ value.name } />
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
