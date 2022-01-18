import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  castFormValueToArray,
  fileInputPropTypes,
  hasInputError,
  isImageType,
  omitLabelProps,
  readFilesAsDataUrls,
} from '../../helpers'
import { LabeledField } from '../../labels'
import FilePreview from './file-preview'
import ImagePreview from './image-preview'
import { noop, generateInputErrorId, isString, removeAt } from '../../../utils'
import classnames from 'classnames'

/**
 * A file input that can be used in a `redux-form`-controlled form.
 * The value of this input is an array of file objects, with the `url` set to the base64 encoded data URL of the loaded file(s) by default.
 *
 * Allowing multiple files to be selected requires setting the `multiple` prop to `true`. Multiple files can then be uploaded either all at once or piecemeal. This is different than the standard behavior of a file input, which will _replace_ any existing files with whatever is selected. Once a file has been read successfully, it is possible to remove the file object from the current set of files. An optional callback can be fired when a file is removed: `onRemove(removedFile)`. To customize the component that receives this `onRemove` handler, pass in a custom component to the `removeComponent` prop.
 *
 * By default, this component displays a thumbnail preview of the loaded file(s). This preview can be customized
 * by using the `thumbnail` or `hidePreview` props, as well as by passing a custom preview via `previewComponent` or `children`.
 *
 * A component passed using `previewComponent` will receive the following props:
 * - `file`: the current value of the input (an array of file objects)
 *
 * @name FileInput
 * @type Function
 * @param {Object} input - A `redux-form` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object
 * @param {Object} meta - A `redux-form` [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) object
 * @param {Function} [readFiles=readFilesAsDataUrls] - A callback that is fired with new files and is expected to return an array of file objects with the `url` key set to the "read" value. This can be either a data URL or the public URL from a 3rd party API
 * @param {Boolean} [multiple=false] - A flag indicating whether or not to accept multiple files
 * @param {String} [accept] - Value that defines the file types the file input should accept (e.g., ".doc,.docx"). More info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
 * @param {("user"|"environment")} [capture] - Value that specifies which camera to use, if the accept attribute indicates the input type of image or video. This is not available for all devices (e.g., desktops). More info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#capture
 * @param {Function} [onRemove=noop] - A callback fired when the file is removed (only available when `multiple` is set to `true`)
 * @param {Function} [previewComponent=RenderPreview] - A custom component that is used to display a preview of each attached file
 * @param {Function} [removeComponent=RemoveButton] - A custom component that receives `value` and `onRemove` props (only available when `multiple` is set to `true`)
 * @param {String} [thumbnail] - A placeholder image to display before the file is loaded
 * @param {Boolean} [hidePreview=false] - A flag indicating whether or not to hide the file preview
 * @param {String} [selectText] - An override for customizing the text that is displayed on the input's label. Defaults to 'Select File' or 'Select File(s)' depending on the `multiple` prop value
 * 
 * @example
 *
 * function HeadshotForm ({ handleSubmit, pristine, invalid, submitting }) {
 *   return (
 *     <form onSubmit={ handleSubmit }>
 *       <Field
 *          name="headshot"
 *          component={ FileInput }
 *          selectText="Select profile picture"
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
  thumbnail: PropTypes.string,
  hidePreview: PropTypes.bool,
  className: PropTypes.string,
  previewComponent: PropTypes.func,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  onRemove: PropTypes.func,
  readFiles: PropTypes.func,
  removeComponent: PropTypes.func,
  selectText: PropTypes.string,
}

const defaultProps = {
  hidePreview: false,
  multiple: false,
  onRemove: noop,
  readFiles: readFilesAsDataUrls,
  removeComponent: RemoveButton,
  selectText: '',
}

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function FileInput(props) {
  const {
    input,
    meta,
    className, // eslint-disable-line no-unused-vars
    submitting,
    accept,
    capture,
    hidePreview,
    multiple,
    readFiles,
    removeComponent: RemoveComponent,
    selectText,
    thumbnail,
    onRemove,
    ...rest
  } = omitLabelProps(props)

  const [errors, setErrors] = useState(null)
  const inputRef = useRef()
  const prevMultiple = usePrevious(multiple)

  const clearFileInput = () => {
    /* istanbul ignore next */
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const removeFile = useCallback(async (idx) => {
    const { onChange, value } = input
    const [removedFile, remainingFiles] = removeAt(value, idx)

    try {
      await onRemove(removedFile)

      // If all files have been removed, then reset the native input
      if (!remainingFiles.length) clearFileInput()

      return onChange(remainingFiles)
    } catch (e) {
      setErrors(e)
    }
  }, [input, onRemove])

  // Automatically select only the first file if `multiple` changes to false
  useEffect(() => {
    // Only subscribe to _changes_ in the prop (not initial mount)
    if (multiple || prevMultiple === undefined || prevMultiple === multiple) return

    const { value, onChange } = input
    const valueToUpdate = value.slice(0, 1)
    onChange(valueToUpdate)
  }, [multiple])

  const inputMeta = setInputErrors(meta, errors)
  const labelText = selectText || (multiple ? 'Select File(s)' : 'Select File')
  const values = castFormValueToArray(input.value)

  // Support rendering a custom preview component, even if no value is selected or when `thumbnail` is present
  const files = values.length > 0 ? values : [null]
  const shouldShowClearInputButton = !multiple && files[0]

  return (
  <LabeledField { ...props } meta={ inputMeta }>
      <div className="fileupload fileupload-exists">
        {!hidePreview &&
          <React.Fragment>
            {files.map((file, idx) => (
              <div key={file?.name || idx} className="fileupload-preview-container">
                <RenderPreview file={file} thumbnail={thumbnail} {...rest} />
                {multiple && file && <RemoveComponent file={file} onRemove={() => removeFile(idx)} />}
              </div>
            ))}
          </React.Fragment>
        }
        <div className={classnames('button-secondary-light', { 'in-progress': submitting })}>
          <input
            {...{
              id: input.name,
              name: input.name,
              type: 'file',
              onClick: clearFileInput, // force onChange to fire _every_ time (use case: attempting to upload the same file after a failure)
              onChange: async (e) => {
                setErrors(null)
                try {
                  const files = [...e.target.files]
                  const newFiles = removeExistingFiles(files, values)
                  const newFilesWithUrls = await readFiles(newFiles)
                  if (!newFilesWithUrls) return
                  if (!multiple) return input.onChange(newFilesWithUrls.slice(0, 1))
                  return input.onChange([...values, ...newFilesWithUrls])
                } catch (e) {
                  setErrors(e)
                }
              },
              accept,
              multiple,
              capture,
              ref: inputRef,
              'aria-describedby': hasInputError(meta) ? generateInputErrorId(input.name) : null,
            }}
          />
          {/* Include after input to allowing for styling with adjacent sibling selector */}
          <label htmlFor={input.name} className="fileupload-exists">{ labelText }</label>
        </div>
        {shouldShowClearInputButton && (
            <RemoveButton 
              file={files[0]} 
              onRemove={() => {
                removeFile(0)
              }}
            />
          )}
      </div>
    </LabeledField>
  )
}

// Do not reload files that have been successfully loaded
function removeExistingFiles (newFiles, existingFiles) {
  return newFiles.filter((file) => {
    return !existingFiles.some(({ name, lastModified }) => {
      return name === file.name && lastModified === file.lastModified
    })
  })
}

function setInputErrors (meta, fieldWideErrors) {
  if (meta.error || !fieldWideErrors) return meta
  return {
    ...meta,
    error: isString(fieldWideErrors) ? fieldWideErrors : fieldWideErrors.message,
    touched: true,
    invalid: true,
  }
}

// eslint-disable-next-line react/prop-types
function RenderPreview ({
  file,
  thumbnail,
  previewComponent: Component,
  children,
  ...rest
}) {
  if (Component) return <Component file={ file } { ...rest } />
  if (children) return children
  const renderImagePreview = isImageType(file) || thumbnail
  if (renderImagePreview) return <ImagePreview image={ file?.url || thumbnail } />
  return <FilePreview name={ file?.name } />
}

function RemoveButton ({ file, onRemove }) {
  return (
    <button
      type="button"
      className="remove-file"
      onClick={onRemove}
      aria-label={`Remove ${file.name}`}
    >
      x
    </button>
  )
}

FileInput.propTypes = propTypes
FileInput.defaultProps = defaultProps

export default FileInput
