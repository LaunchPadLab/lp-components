import React from 'react'
import { mount } from 'enzyme'
import { CloudinaryFileInput } from '../../../src/'
import { mockFileReader, flushPromises } from './file-input.test'
import { act } from 'react-dom/test-utils'

const name = 'name.of.field'
const value = { name: 'existingFileName', url: 'value of field' }
const onChange = () => {}
const input = { name, value, onChange }
const PUBLIC_URL = 'url-of-uploaded-file'
const uploadResponse = { url: PUBLIC_URL }
const upload = () => Promise.resolve(uploadResponse)
const uploadStatus = 'upload-success'
const cloudName = 'cloudName'
const bucket = 'bucket'

// These tests rely on the mock implementation of cloudinaryUploader in __mocks__,
// which just passes all props through to its child.

beforeEach(() => {
  jest.clearAllMocks()
})

test('CloudinaryFileInput adds uploadStatus to className', () => {
  const className = 'foo'
  const props = { input, meta: {}, className, upload, uploadStatus, cloudName, bucket }
  const wrapper = mount(<CloudinaryFileInput { ...props }/>)
  expect(wrapper.find('fieldset.foo.upload-success').exists()).toEqual(true)
})

test('CloudinaryFileInput sets returned url within value', async () => {
  const fakeFileEvent = { target: { files: [{ name: 'fileName', type: 'image/png' }] }}
  mockFileReader('data')
  const onChange = jest.fn()
  const props = { input: { ...input, onChange }, meta: {}, upload, uploadStatus, cloudName, bucket }
  const wrapper = mount(<CloudinaryFileInput { ...props }/>)
  const internalOnChange = wrapper.find('input').prop('onChange')
  // internally calls upload, which resolves with file
  internalOnChange(fakeFileEvent)

  await flushPromises()
  expect(onChange).toHaveBeenCalled()
  expect(onChange.mock.calls[0][0].url).toBe(PUBLIC_URL)
})

test('CloudinaryFileInput calls success handler with response on successful upload of a single file', async () => {
  const fakeFileEvent = { target: { files: [{ name: 'fileName' }] }}
  const onUploadSuccess = jest.fn()
  mockFileReader()

  const props = { input: { ...input, onChange: jest.fn() }, meta: {}, upload, cloudName, bucket, onUploadSuccess }
  const wrapper = mount(<CloudinaryFileInput {...props} />)
  const internalOnChange = wrapper.find('input').prop('onChange')
  internalOnChange(fakeFileEvent)

  await flushPromises()
  expect(onUploadSuccess).toHaveBeenCalled()
  expect(onUploadSuccess.mock.calls[0][0].url).toBe(PUBLIC_URL)
})

test('CloudinaryFileInput calls success handler with array of responses on successful uploads of multiple files', async () => {
  const fakeFileEvent = { target: { files: [{ name: 'fileName' }] }}
  const onUploadSuccess = jest.fn()
  mockFileReader()

  const props = { input: { ...input, onChange: jest.fn() }, meta: {}, upload, cloudName, bucket, onUploadSuccess, multiple: true }
  const wrapper = mount(<CloudinaryFileInput {...props} />)
  const internalOnChange = wrapper.find('input').prop('onChange')
  internalOnChange(fakeFileEvent)

  await flushPromises()
  expect(onUploadSuccess).toHaveBeenCalled()
  expect(onUploadSuccess.mock.calls[0][0][0].url).toBe(PUBLIC_URL)
})

test('CloudinaryFileInput calls error handler with error on failed upload', async () => {
  const fakeFileEvent = { target: { files: [{}] }}
  const onUploadFailure = jest.fn()
  const failureResponse = { errors: "Invalid filename" }
  const upload = () => Promise.reject(failureResponse)
  mockFileReader()

  const props = { input: { ...input, onChange: jest.fn() }, meta: {}, upload, cloudName, bucket, onUploadFailure }
  const wrapper = mount(<CloudinaryFileInput {...props} />)
  const internalOnChange = wrapper.find('input').prop('onChange')

  // Ensure that any state changes have occurred before asserting (e.g., setErrors(e))
  await act(() => internalOnChange(fakeFileEvent))
  expect(onUploadFailure).toHaveBeenCalledWith(failureResponse)
})
