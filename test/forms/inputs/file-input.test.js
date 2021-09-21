import React from 'react'
import { mount } from 'enzyme'
import { FileInput } from '../../../src/'

const name = 'my.file.input'

test('FileInput renders thumbnail with value as src when file is an image', () => {
  const file = { name: 'fileName', type: 'image/png', url: 'foo' }
  const props = { input: { name, value: file }, meta: {} }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('img').props().src).toEqual(file.url)
})

test('FileInput renders file name when file is non-image type or value is empty', () => {
  const file = { name: 'fileName', type: 'application/pdf' }
  const props = { input: { name, value: file }, meta: {} }
  const wrapper = mount(<FileInput { ...props } />)
  expect(wrapper.find('p').text()).toEqual('fileName')
})

test('FileInput sets thumbnail placeholder', () => {
  const thumbnail = 'thumb'
  const props = { input: { name, value: '' }, meta: {}, thumbnail }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('img').props().src).toEqual(thumbnail)
})

test('FileInput hides preview correctly', () => {
  const props = { input: { name, value: '' }, meta: {}, hidePreview: true }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('img').exists()).toEqual(false)
})

test('FileInput sets custom preview from children', () => {
  const Preview = () => <p> My preview </p>
  const props = { input: { name, value: '' }, meta: {} }
  const wrapper = mount(<FileInput { ...props }><Preview/></FileInput>)
  expect(wrapper.find('p').exists()).toEqual(true)
})

test('FileInput sets custom preview from props', () => {
  const Preview = ({ value }) => <p>{ value && value.name }</p> // eslint-disable-line react/prop-types
  const props = { input: { name, value: { name: 'fileName', type: 'image/png' } }, meta: {} }
  const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
  expect(wrapper.find('p').exists()).toEqual(true)
  expect(wrapper.find('p').text()).toEqual('fileName')
})

test('FileInput passes extra props to custom preview', () => {
  const Preview = ({ message }) => <p>{ message }</p> // eslint-disable-line react/prop-types
  const props = { input: { name, value: '' }, meta: {}, message: 'FOO' }
  const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
  expect(wrapper.find('p').text()).toEqual('FOO')
})

test('FileInput passes value to custom preview', () => {
  const Preview = ({ value }) => <p>{ value.url }</p> // eslint-disable-line react/prop-types
  const file = { name: 'fileName', url: 'foo' }
  const props = { input: { name, value: file }, meta: {} }
  const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
  expect(wrapper.find('p').exists()).toEqual(true)
  expect(wrapper.find('p').text()).toEqual(file.url)
})

test('FileInput reads files and calls change handler correctly', () => {
  const FILE = { name: 'my file' }
  const FILEDATA = 'my file data'
  window.FileReader = createMockFileReader(FILEDATA)
  const onChange = jest.fn()
  const props = { input: { name, value: '', onChange }, meta: {} }
  const wrapper = mount(<FileInput { ...props }/>)
  wrapper.find('input').simulate('change', { target: { files: [FILE] }})

  // https://github.com/enzymejs/enzyme/issues/823#issuecomment-492984956
  const asyncCheck = setImmediate(() => {
    wrapper.update()
    expect(onChange).toHaveBeenCalled()
  })

  global.clearImmediate(asyncCheck)
})

test('FileInput passes accept attribute to input component', () => {
  const props = { input: { name, value: '' }, meta: {}, accept: 'image/*' }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('input').prop('accept')).toEqual('image/*')
})

test('FileInput is given an aria-describedby attribute when there is an input error', () => {
  const props = { input: { name, value: '' }, meta: { touched: true, invalid: true } }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('input').prop('aria-describedby')).toContain(name)
})

// Creates a mock FileReader that passes the given file data to its onload() handler
export function createMockFileReader (fileData) {
  return class MockFileReader {
    readAsDataURL () {
      this.onload({ target: { result: fileData } })
    }
  }
}
