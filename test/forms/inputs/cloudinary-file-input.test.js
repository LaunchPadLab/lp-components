import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CloudinaryFileInput } from '../../../src/'

const name = 'name.of.field'
const value = { name: 'existingFileName', url: 'value of field' }
const onChange = () => { }
const input = { name, value, onChange }
const PUBLIC_URL = 'url-of-uploaded-file'
const uploadResponse = { url: PUBLIC_URL }
const upload = () => Promise.resolve(uploadResponse)
const uploadStatus = 'upload-success'
const cloudName = 'cloudName'
const bucket = 'bucket'

jest.mock(
  '../../../src/forms/inputs/cloudinary-file-input/cloudinary-uploader.js'
)

// These tests rely on the mock implementation of cloudinaryUploader in __mocks__,
// which just passes all props through to its child.

test('CloudinaryFileInput adds uploadStatus to className', () => {
  const className = 'foo'
  const props = {
    input,
    meta: {},
    className,
    upload,
    uploadStatus,
    cloudName,
    bucket,
  }
  render(<CloudinaryFileInput {...props} />)

  const fieldset = screen.getByRole('group')
  expect(fieldset).toHaveClass(className)
  expect(fieldset).toHaveClass(uploadStatus)
})

test('CloudinaryFileInput sets returned url within value', async () => {
  const file = new File(['content'], 'fileName.png', { type: 'image/png' })
  const onChange = jest.fn()
  const props = {
    input: { name, value, onChange },
    meta: {},
    upload,
    uploadStatus,
    cloudName,
    bucket,
  }
  const user = userEvent.setup()
  render(<CloudinaryFileInput {...props} />)

  const input = screen.getByLabelText(/select file/i)

  user.upload(input, file)
  await waitFor(() => {
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ url: PUBLIC_URL }),
    ])
  })
})

test('CloudinaryFileInput calls success handler with response on successful upload of a single file', async () => {
  const file = new File(['content'], 'fileName.png', { type: 'image/png' })
  const onUploadSuccess = jest.fn()

  const props = {
    input: { name, value, onChange: jest.fn() },
    meta: {},
    upload,
    uploadStatus,
    cloudName,
    bucket,
    onUploadSuccess,
  }

  const user = userEvent.setup()
  render(<CloudinaryFileInput {...props} />)

  const input = screen.getByLabelText(/select file/i)
  user.upload(input, file)

  await waitFor(() => {
    expect(onUploadSuccess).toHaveBeenCalledWith(
      expect.objectContaining({ url: PUBLIC_URL })
    )
  })
})

test('CloudinaryFileInput calls success handler with array of responses on successful uploads of multiple files', async () => {
  const file = new File(['content'], 'fileName.png', { type: 'image/png' })
  const onUploadSuccess = jest.fn()

  const props = {
    input: { name, value, onChange: jest.fn() },
    meta: {},
    upload,
    uploadStatus,
    cloudName,
    bucket,
    onUploadSuccess,
    multiple: true,
  }

  const user = userEvent.setup()
  render(<CloudinaryFileInput {...props} />)

  const input = screen.getByLabelText(/select file/i)
  user.upload(input, file)
  await waitFor(() => {
    expect(onUploadSuccess).toHaveBeenCalledWith([
      expect.objectContaining({ url: PUBLIC_URL }),
    ])
  })
})

test('CloudinaryFileInput calls error handler with error on failed upload', async () => {
  const file = new File(['content'], '*&^*^(*&', { type: 'image/png' })
  const onUploadFailure = jest.fn()
  const failureResponse = { errors: 'Invalid filename' }
  const upload = () => Promise.reject(failureResponse)

  const props = {
    input: { name, value: '', onChange: jest.fn() },
    meta: {},
    upload,
    uploadStatus,
    cloudName,
    bucket,
    onUploadFailure,
  }

  const user = userEvent.setup()
  render(<CloudinaryFileInput {...props} />)

  const input = screen.getByLabelText(/select file/i)
  user.upload(input, file)
  await waitFor(() => {
    expect(onUploadFailure).toHaveBeenCalledWith(failureResponse)
  })
})
