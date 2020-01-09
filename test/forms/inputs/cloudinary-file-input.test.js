import React from 'react'
import { mount } from 'enzyme'
import { CloudinaryFileInput } from '../../../src/'
import { createMockFileReader } from './file-input.test'

const name = 'name.of.field'
const value = 'value of field'
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


test('CloudinaryFileInput adds uploadStatus to className', () => {
  const className = 'foo'
  const props = { input, meta: {}, className, upload, uploadStatus, cloudName, bucket }
  const wrapper = mount(<CloudinaryFileInput { ...props }/>)
  expect(wrapper.find('fieldset.foo.upload-success').exists()).toEqual(true)
})

test('CloudinaryFileInput sets returned url as value', () => {
  const fakeFileEvent = { target: { files: [] }}
  window.FileReader = createMockFileReader()
  const onChange = jest.fn()
  const props = { input: { ...input, onChange }, meta: {}, upload, uploadStatus, cloudName, bucket }
  const wrapper = mount(<CloudinaryFileInput { ...props }/>)
  const internalOnChange = wrapper.find('input').prop('onChange')
  // internally calls upload, which resolves with url
  internalOnChange(fakeFileEvent)
  return Promise.resolve().then(() => 
    expect(onChange).toHaveBeenCalledWith(PUBLIC_URL)
  )
})

test('CloudinaryFileInput calls success handler with response on successful upload', () => {
  const fakeFileEvent = { target: { files: [] }}
  const onUploadSuccess = jest.fn()
  const props = { input: { ...input, onChange: jest.fn() }, meta: {}, upload, cloudName, bucket, onUploadSuccess }
  const wrapper = mount(<CloudinaryFileInput {...props} />)
  const internalOnChange = wrapper.find('input').prop('onChange')
  internalOnChange(fakeFileEvent)
  
  return Promise.resolve().then(() => {
    expect(onUploadSuccess).toHaveBeenCalledWith(uploadResponse)
  })
})

test('CloudinaryFileInput calls error handler with error on failed upload', () => {
  const fakeFileEvent = { target: { files: [] }}
  const onUploadFailure = jest.fn()
  const failureResponse = { errors: "Invalid filename" }
  const upload = () => Promise.reject(failureResponse)
  
  const props = { input: { ...input, onChange: jest.fn() }, meta: {}, upload, cloudName, bucket, onUploadFailure }
  const wrapper = mount(<CloudinaryFileInput {...props} />)
  const internalOnChange = wrapper.find('input').prop('onChange')
  internalOnChange(fakeFileEvent)
  
  return Promise.resolve().then(() => {
    expect(onUploadFailure).toHaveBeenCalledWith(failureResponse)
  })
})
