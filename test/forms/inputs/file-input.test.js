import React from 'react'
import { mount } from 'enzyme'
import { FileInput } from '../../../src/'

const name = 'my.file.input'

test('Fileinput renders thumbnail with value as src when file is an image', () => {
  const value = 'foo'
  const file = { name: 'fileName', type: 'image/png' }
  const props = { input: { name, value }, meta: {} }
  const wrapper = mount(<FileInput { ...props }/>)
  wrapper.setState({ file })
  expect(wrapper.find('img').props().src).toEqual(value)
})

test('Fileinput renders file name when file is non-image type or value is empty', () => {
  const file = { name: 'fileName', type: 'application/pdf' }
  const props = { input: { name, value: '' }, meta: {} }
  const wrapper = mount(<FileInput { ...props } />)
  wrapper.setState({ file })
  expect(wrapper.find('p').text()).toEqual('fileName')
})

test('Fileinput sets thumbnail placeholder', () => {
  const thumbnail = 'thumb'
  const props = { input: { name, value: '' }, meta: {}, thumbnail }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('img').props().src).toEqual(thumbnail)
})

test('Fileinput hides preview correctly', () => {
  const props = { input: { name, value: '' }, meta: {}, hidePreview: true }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('img').exists()).toEqual(false)
})

test('Fileinput sets custom preview from children', () => {
  const Preview = () => <blink> My preview </blink>
  const props = { input: { name, value: '' }, meta: {} }
  const wrapper = mount(<FileInput { ...props }><Preview/></FileInput>)
  expect(wrapper.find('blink').exists()).toEqual(true)
})

test('Fileinput sets custom preview from props', () => {
  const Preview = ({ file }) => <blink>{ file && file.name }</blink> // eslint-disable-line react/prop-types
  const props = { input: { name, value: '' }, meta: {} }
  const wrapper = mount(<FileInput previewComponent={ Preview } { ...props }/>)
  expect(wrapper.find('blink').exists()).toEqual(true)
  wrapper.setState({ file: { name: 'fileName', type: 'image/png' } })
  expect(wrapper.find('blink').text()).toEqual('fileName')
})

test('FileInput reads files and calls change handlers correctly', () => {
  const FILE = 'my file'
  const FILEDATA = 'my file data'
  window.FileReader = createMockFileReader(FILEDATA)
  const onLoad = jest.fn()
  const onChange = jest.fn()
  const props = { input: { name, value: '', onChange }, meta: {}, onLoad }
  const wrapper = mount(<FileInput { ...props }/>)
  wrapper.find('input').simulate('change', { target: { files: [FILE] }})
  expect(onChange).toHaveBeenCalledWith(FILEDATA)
  expect(onLoad).toHaveBeenCalledWith(FILEDATA, FILE)
})

test('FileInput passes accept attribute to input component', () => {
  const props = { input: { name, value: '' }, meta: {}, accept: 'image/*' }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('input').prop('accept')).toEqual('image/*')
})

// Creates a mock FileReader that passes the given file data to its onload() handler
function createMockFileReader (fileData) {
  return class MockFileReader {
    readAsDataURL () {
      this.onload({ target: { result: fileData } })
    }
  }
}