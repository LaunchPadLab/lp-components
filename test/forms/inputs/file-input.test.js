import React from 'react'
import { mount } from 'enzyme'
import { FileInput } from '../../../src/'

const name = 'my.file.input'

test('Fileinput renders thumbnail with value as src', () => {
  const value = 'foo'
  const props = { input: { name, value }, meta: {} }
  const wrapper = mount(<FileInput { ...props }/>)
  expect(wrapper.find('img').props().src).toEqual(value)
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
  wrapper.setState({ file: { name: 'fileName' } })
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

// Creates a mock FileReader that passes the given file data to its onload() handler
function createMockFileReader (fileData) {
  return class MockFileReader {
    readAsDataURL () {
      this.onload({ target: { result: fileData } })
    }
  }
}