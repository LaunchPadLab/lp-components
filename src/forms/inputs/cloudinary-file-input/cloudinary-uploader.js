import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { wrapDisplayName } from '../../../utils'
import { addExtension, getEnvVar, removeExtension } from './helpers'

/**
 * A function that returns a React HOC for uploading files to (Cloudinary)[https://cloudinary.com].
 *
 * `cloudinaryUploader` exposes the following props to the wrapped component: 
 * - `upload`: A function that submits a `POST` request to the Cloudinary endpoint with the `file` object and `fileData`.
 * - `uploadStatus`: A string representing the status of the `upload` request, either `uploading`, `upload-success`, or `upload-failure`.
 * 
 * @name cloudinaryUploader
 * @type Function
 * @param {string} cloudName - The name of the Cloudinary cloud to upload to. Can also be set via `CLOUDINARY_CLOUD_NAME` in `process.env`.
 * @param {string} bucket - The name of the Cloudinary bucket to upload to. Can also be set via `CLOUDINARY_BUCKET` in `process.env`.
 * @param {Function} upload - Function that must send a POST request to the cloudinary API, using whichever adapter you'd like.
 * @param {string} [uploadPreset=default] - The name of the Cloudinary upload preset. Can also be set via `CLOUDINARY_UPLOAD_PRESET` in `process.env`.
 * @param {string} [endpoint=https://api.cloudinary.com/v1_1/] - The endpoint for the upload request. Can also be set via `CLOUDINARY_ENDPOINT` in `process.env`.
 * @param {string} [fileType=auto] - The type of file.
 * @param {string} [cloudinaryPublicId] - The name of the file stored in Cloudinary.
 * @param {string} [createPublicId] - A function to generate a custom public id for the uploaded file. This function is passed the file object and is expected to return a string. Overridden by the `cloudinaryPublicId` prop.
 * @param {object} [requestOptions=DEFAULT_REQUEST_OPTIONS] - Options for the request, as specified by (`lp-requests`)[https://github.com/LaunchPadLab/lp-requests/blob/master/src/http/http.js].
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 *
 * @example
 *
 * function CloudinaryFileInput ({ upload, uploadStatus, input, meta ... }) {
 *   const { onChange } = input
 *   const { submit } = meta
 *   return (
 *      <FileInput 
 *        input={ input }
 *        meta={ meta }
 *        onLoad={ (fileData, file) => upload(fileData, file).then(() => submit(form)) }
 *        className={ uploadStatus }
 *      />
 *   )
 * }
 * 
 * CloudinaryFileInput.propTypes = {
 *   ...formPropTypes,
 *   upload: PropTypes.func.isRequired,
 *   uploadStatus: PropTypes.string.isRequired,
 * }
 *
 * export default compose(
 *    cloudinaryUploader({
 *      cloudName: 'my-cloudinary-cloud-name',
 *      bucket: 'my-cloudinary-bucket',
 *    }),
 * )(CloudinaryFileInput)
 *
*/

// Status enum
export const CloudinaryUploadStatus = {
  LOADING: 'uploading',
  SUCCESS: 'upload-success',
  FAILURE: 'upload-failure',
}

// Option defaults
const DEFAULT_ENDPOINT = 'https://api.cloudinary.com/v1_1'
const DEFAULT_FILE_TYPE = 'auto'
const DEFAULT_UPLOAD_PRESET = 'default'
const DEFAULT_REQUEST_OPTIONS = {
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  mode: 'cors',
}

// Test for all forbidden characters (defined by Cloudinary) and spaces
const FILE_NAME_PATTERN = /[\s?&#\\%<>]/gi

// Throws an error when a required param is not found
function requireParam (paramName, context='Error') {
  throw new Error(`${ context }: required param ${ paramName } not provided`)
}

// Returns true when an a file is a pdf.
function isPdf(file) {
  return (file.type === 'application/pdf')
}

function isImage(file) {
  return (file.type.split('/')[0] === 'image')
}

/*
 * The default public id creator returns the sanitized name of the file by
 * replacing invalid characters (incl. those that may be html escaped).
 * Cloudinary does _not_ handle html escaping well via the API our their
 * dashboard so it's best to avoid it entirely.
 * 
 * Source: https://support.cloudinary.com/hc/en-us/articles/115001317409--Legal-naming-conventions
 */
function defaultCreatePublicId (file) {
  const fileName = getFileName(file)
  const decodedFileName = decodeFileName(fileName)
  return sanitizeFileName(decodedFileName)
}

function getFileName (file) {
  if (file.name) return file.name
  return 'file_upload_' + Date.now()
}

// Attempts to decode html escaped characters. If this fails, attempts to strip
// percentages not acting as valid html escaping and tries again. If all else
// fails, returns the original name.
function decodeFileName (name) {
  try {
    try {
      return decodeURIComponent(name)
    } catch (e) {
      return decodeURIComponent(name.replace(/%(?=\D+)/gi, ''))
    }
  } catch (e) {
    return name
  }
}

// Replaces forbidden characters with '_' and removes duplicate underscores
function sanitizeFileName (name) {
  const validFileName = name.trim().replace(FILE_NAME_PATTERN, '_')
  return validFileName.replace(/_+/gi, '_')
}

// Removes file extension from file name if asset is an image or pdf
// Otherwise, Cloudinary will add an extra extension to the file name
// Ensure extension is present on "raw" file types (e.g., .xls)
function serializePublicId (publicId, file) {
  if (!publicId) return
  return (isPdf(file) || isImage(file)) 
    ? removeExtension(publicId) 
    : addExtension(publicId, file)
}

function cloudinaryUploader (options={}) {
  return Wrapped =>
    class Wrapper extends Component {
      static displayName = wrapDisplayName(Wrapped, 'cloudinaryUploader')
      constructor (props) {
        super(props)
        const config = { ...options, ...props }
        const {
          cloudName=getEnvVar('CLOUDINARY_CLOUD_NAME') || requireParam('cloudName', 'cloudinaryUploader'),
          bucket=getEnvVar('CLOUDINARY_BUCKET') || requireParam('bucket', 'cloudinaryUploader'),
          uploadPreset=getEnvVar('CLOUDINARY_UPLOAD_PRESET') || DEFAULT_UPLOAD_PRESET,
          endpoint=getEnvVar('CLOUDINARY_ENDPOINT') || DEFAULT_ENDPOINT,
          upload=requireParam('upload', 'cloudinaryUploader'),
          fileType=DEFAULT_FILE_TYPE,
          requestOptions=DEFAULT_REQUEST_OPTIONS,
          createPublicId=defaultCreatePublicId,
          cloudinaryPublicId,
        } = config
        // Build request function using config
        this.cloudinaryRequest = function (fileData, file) {
          const publicId = cloudinaryPublicId || createPublicId(file)
          const url = `${ endpoint }/${ cloudName }/${ fileType }/upload`
          const body = { file: fileData, folder: bucket, uploadPreset, publicId: serializePublicId(publicId, file) }
          return upload(url, body, requestOptions)
        }
        this.upload = this.upload.bind(this)
        this.state = { uploadStatus: '' }
      }
      upload (fileData, file) {
        this.setState({ uploadStatus: CloudinaryUploadStatus.LOADING })
        return this.cloudinaryRequest(fileData, file)
          .then(res => {
            this.setState({ uploadStatus: CloudinaryUploadStatus.SUCCESS })
            return res
          })
          .catch(error => {
            this.setState({ uploadStatus: CloudinaryUploadStatus.FAILURE })
            throw error
          })
      }
      render () {
        const { uploadStatus } = this.state
        return (
          <Wrapped 
            upload={ this.upload }
            uploadStatus={ uploadStatus }
            { ...this.props }
          />
        )
      }
    }
}

export default cloudinaryUploader
