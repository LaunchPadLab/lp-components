import React from 'react'
import { mount } from 'enzyme'
import { CloudinaryFileInput, FileInput } from '../../../src/'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }
const PUBLIC_URL = 'url-of-uploaded-file'
const upload = () => Promise.resolve({ url: PUBLIC_URL })
const uploadStatus = 'upload-success'

// These tests rely on the mock implementation of cloudinaryUploader in __mocks__,
// which just passes all props through to its child.

test('CloudinaryFileInput adds uploadStatus to className', () => {
  const className = 'foo'
  const props = { input, meta: {}, className, upload, uploadStatus }
  const wrapper = mount(<CloudinaryFileInput { ...props }/>)
  expect(wrapper.find('fieldset.foo.upload-success').exists()).toEqual(true)
})

test('CloudinaryFileInput sets returned url as value', () => {
  const onChange = jest.fn()
  const props = { input: { ...input, onChange }, meta: {}, upload, uploadStatus }
  const wrapper = mount(<CloudinaryFileInput { ...props }/>)
  const onLoad = wrapper.find(FileInput).prop('onLoad')
  // internally calls upload, which resolves with url
  return onLoad().then(() => 
    expect(onChange).toHaveBeenCalledWith(PUBLIC_URL)
  )
})
