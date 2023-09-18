import React from 'react'
import { render } from '@testing-library/react'
import cloudinaryUploader from '../../../../src/forms/inputs/cloudinary-file-input/cloudinary-uploader'

class MockResponse {
  #text

  constructor(url, options, body = null) {
    const { headers = {} } = options
    const isSuccess = !url.includes('/failure')
    const isJson = headers?.['Content-Type'] === 'application/json'
    const payload = body ?? { ...options, url }

    this.headers = {
      get: (header) => headers[header],
      ...headers,
    }
    this.body = isJson ? JSON.stringify(payload) : payload
    this.ok = isSuccess
    this.status = isSuccess ? 200 : 400
    this._config = options
    this.#text = typeof body === 'string' ? body : JSON.stringify(this.body)
  }

  json() {
    return Promise.resolve(this.body)
  }

  text() {
    return Promise.resolve(this.#text)
  }
}

const mockApi = {
  post: jest.fn(function (url, body, options = {}) {
    const response = new MockResponse(url, options, body)
    // Simulate server response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!response.ok) return reject(new Error('Failed'))
        return resolve(response)
      }, 10)
    })
  }),
}

const props = {
  bucket: 'test-bucket',
  cloudName: 'test-name',
  apiAdapter: mockApi,
}

const file = {
  name: 'test.jpg',
  type: 'image/jpg',
}

const fileData = 'mockData'

describe('cloudinaryUploader', () => {
  // eslint-disable-next-line no-undef
  const initialEnv = process.env

  beforeEach(() => {
    // eslint-disable-next-line no-undef
    process.env = { ...initialEnv }
  })

  afterEach(() => {
    // eslint-disable-next-line no-undef
    process.env = initialEnv
  })

  test('has correct displayName', () => {
    const Wrapped = () => <h1>Hi</h1>
    const Wrapper = cloudinaryUploader(props)(Wrapped)
    expect(Wrapper.displayName).toEqual('cloudinaryUploader(Wrapped)')
  })

  test('throws an error if `bucket` is not provided', () => {
    // eslint-disable-next-line no-undef
    process.env.CLOUDINARY_CLOUD_NAME = 'foo'
    jest.spyOn(console, 'error').mockImplementation(() => null) // avoid console bloat
    const Wrapped = () => <h1>Hi</h1>
    const Wrapper = cloudinaryUploader({ apiAdapter: props.apiAdapter })(Wrapped)
    expect(() => render(<Wrapper />)).toThrow()
    jest.restoreAllMocks()
  })

  test('throws an error if `cloudName` is not provided', () => {
    // eslint-disable-next-line no-undef
    process.env.CLOUDINARY_BUCKET = 'bar'
    jest.spyOn(console, 'error').mockImplementation(() => null) // avoid console bloat
    const Wrapped = () => <h1>Hi</h1>
    const Wrapper = cloudinaryUploader({ apiAdapter: props.apiAdapter })(Wrapped)
    expect(() => render(<Wrapper />)).toThrow()
    jest.restoreAllMocks()
  })

  test('throws an error if `apiAdapter` is not provided', () => {
    // eslint-disable-next-line no-undef
    process.env.CLOUDINARY_CLOUD_NAME = 'foo'
    // eslint-disable-next-line no-undef
    process.env.CLOUDINARY_BUCKET = 'bar'
    jest.spyOn(console, 'error').mockImplementation(() => null) // avoid console bloat
    const Wrapped = () => <h1>Hi</h1>
    const Wrapper = cloudinaryUploader()(Wrapped)
    expect(() => render(<Wrapper />)).toThrow()
    jest.restoreAllMocks()
  })

  test('can receive arguments via env vars', () => {
    // eslint-disable-next-line no-undef
    process.env.CLOUDINARY_CLOUD_NAME = 'foo'
    // eslint-disable-next-line no-undef
    process.env.CLOUDINARY_BUCKET = 'bar'
    const Wrapped = () => <h1>Hi</h1>
    const Wrapper = cloudinaryUploader({ apiAdapter: props.apiAdapter })(Wrapped)
    expect(() => render(<Wrapper />)).not.toThrow()
  })

  test('can receive options as props', () => {
    const Wrapped = () => <h1>Hi</h1>
    const Wrapper = cloudinaryUploader()(Wrapped)
    expect(() => render(
      <Wrapper cloudName="foo" bucket="bar" apiAdapter={() => {}} />
    )).not.toThrow()
  })

  test('adds upload props to component', () => {
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const Wrapper = cloudinaryUploader(props)(Wrapped)
    render(<Wrapper />)
    expect(Wrapped).toHaveBeenCalledWith(expect.objectContaining({
      upload: expect.any(Function),
      uploadStatus: expect.any(String),
    }), {})
  })

  test('sends the api request with the correct options', () => {
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const Wrapper = cloudinaryUploader(props)(Wrapped)
    render(<Wrapper />)

    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, file).then((response) => {
      const { uploadStatus } = Wrapped.mock.calls[2][0]
      expect(uploadStatus).toEqual('upload-success')
      const responseJson = JSON.parse(response.body)
      expect(responseJson.file).toEqual(fileData)
      expect(responseJson.folder).toEqual(props.bucket)
      expect(responseJson.public_id).toEqual('test')
      expect(responseJson.upload_preset).toEqual('default')
    })
  })

  test('sets `publicId`', () => {
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const Wrapper = cloudinaryUploader({
      ...props,
      cloudinaryPublicId: 'custom-name',
    })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, file).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toEqual('custom-name')
    })
  })

  test('allows custom `publicId` creator', () => {
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const createPublicId = (file) => 'foo-' + file.name
    const Wrapper = cloudinaryUploader({ ...props, createPublicId })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, file).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toEqual('foo-test')
    })
  })

  test('overrides custom `publicId` creator with `cloudinaryPublicId`', () => {
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const createPublicId = (file) => 'foo-' + file.name
    const Wrapper = cloudinaryUploader({
      ...props,
      createPublicId,
      cloudinaryPublicId: 'custom-name',
    })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, file).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toEqual('custom-name')
    })
  })

  test('adds extension to `publicId` of raw files', () => {
    const rawFile = { name: 'test.xls', type: 'application/xls' }
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const Wrapper = cloudinaryUploader({
      ...props,
      cloudinaryPublicId: 'custom-name',
    })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, rawFile).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toEqual('custom-name.xls')
    })
  })

  test('does not set an empty `publicId`', () => {
    const rawFile = { name: 'test.xls', type: 'application/xls' }
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const Wrapper = cloudinaryUploader({
      ...props,
      createPublicId: () => ''
    })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, rawFile).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toBeUndefined()
    })
  })

  test('removes invalid characters from the default `publicId`', () => {
    const FORBIDDEN_PATTERN = /[\s?&#\\%<>]/gi
    const illegallyNamedFile = {
      name: 'Final \\ Master %20 Schedule? #S1&S2 <100%> & finished.pdf',
      type: 'application/pdf',
    }
    const Wrapped = jest.fn(() => <h1>Howdy</h1>)
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]


    return upload(fileData, illegallyNamedFile).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).not.toMatch(FORBIDDEN_PATTERN)
      expect(responseJson.public_id).toEqual('Final_Master_Schedule_S1_S2_100_finished')
    })
  })

  test('removes html escaped characters from the default `publicId`', () => {
    const illegallyNamedFile = {
      name: 'SY%20S1%26S2.pdf',
      type: 'application/pdf',
    }
    const Wrapped = jest.fn(() => <h1>Howdy</h1>)
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, illegallyNamedFile).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toEqual('SY_S1_S2')
    })
  })

  test('sanitizes the original `publicId` when decoding fails', () => {
    const illegallyNamedFile = {
      name: 'Final \\ Master %20 Schedule? #S1&S2 <100%> & finished.pdf',
      type: 'application/pdf',
    }

    // eslint-disable-next-line no-undef
    const spy = jest.spyOn(window, 'decodeURIComponent').mockImplementation(() => {
      throw Error('Oops!')
    })
    const Wrapped = jest.fn(() => <h1>Howdy</h1>)
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, illegallyNamedFile).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toEqual('Final_Master_20_Schedule_S1_S2_100_finished')

      spy.mockRestore()
    })
  })

  test('replaces spaces and removes superfluous underscores from the default `publicId`', () => {
    const illegallyNamedFile = {
      name: '     SY     S1___S2.pdf',
      type: 'application/pdf',
    }
    const Wrapped = jest.fn(() => <h1>Howdy</h1>)
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, illegallyNamedFile).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toEqual('SY_S1_S2')
    })
  })

  test('trims spaces from the start of the default `publicId`', () => {
    const illegallyNamedFile = {
      name: '     Example.pdf',
      type: 'application/pdf',
    }
    const Wrapped = jest.fn(() => <h1>Howdy</h1>)
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    return upload(fileData, illegallyNamedFile).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toEqual('Example')
    })
  })

  test('defaults file name if not provided when creating the default `publicId`', () => {
    const fileWithNoName = { name: '', type: 'application/pdf' }
    const Wrapped = jest.fn(() => <h1>Howdy</h1>)
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]
    // eslint-disable-next-line no-undef
    const spy = jest.spyOn(global.Date, 'now')

    return upload(fileData, fileWithNoName).then((response) => {
      const responseJson = JSON.parse(response.body)
      expect(responseJson.public_id).toContain('file_upload')
      expect(spy).toHaveBeenCalled()

      spy.mockRestore()
    })
  })

  test('throws an error if request fails', () => {
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(
      Wrapped
    )
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    expect.assertions(1)

    return expect(upload(fileData, file)).rejects.toThrow()
  })

  test('updates the `uploadStatus` prop if request fails', () => {
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(
      Wrapped
    )
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    expect.assertions(1)
    return upload(fileData, file).catch(() => {
      const { uploadStatus } = Wrapped.mock.calls[2][0]
      expect(uploadStatus).toEqual('upload-failure')
    })
  })
})