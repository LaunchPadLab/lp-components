import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  post: function (url, body, options = {}) {
    const response = new MockResponse(url, options, body)
    // Simulate server response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!response.ok) return reject(new Error('Failed'))
        return resolve(response)
      }, 10)
    })
  },
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

const AsyncWrapper = ({ onSuccess=() => {}, fileData, file, uploadStatus, upload }) => (
  <div>
    <p>{uploadStatus}</p>
    <button onClick={async () => {
      return onSuccess(await upload(fileData, file))
    }}>Upload</button>
  </div>
)

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

  test('sends the api request with the correct options', async () => {
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={file} {...props} />
    const Wrapper = cloudinaryUploader(props)(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)

    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })

    const responseJson = JSON.parse(response.body)
    expect(responseJson.file).toEqual(fileData)
    expect(responseJson.folder).toEqual(props.bucket)
    expect(responseJson.public_id).toEqual('test')
    expect(responseJson.upload_preset).toEqual('default')
  })

  test('sets `publicId`', async () => {
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={file} {...props} />
    const Wrapper = cloudinaryUploader({
      ...props,
      cloudinaryPublicId: 'custom-name',
    })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('custom-name')
  })

  test('allows custom `publicId` creator', async () => {
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={file} {...props} />
    const createPublicId = (file) => 'foo-' + file.name
    const Wrapper = cloudinaryUploader({ ...props, createPublicId })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('foo-test')
  })

  test('overrides custom `publicId` creator with `cloudinaryPublicId`', async () => {
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={file} {...props} />
    const createPublicId = (file) => 'foo-' + file.name
    const Wrapper = cloudinaryUploader({
      ...props,
      createPublicId,
      cloudinaryPublicId: 'custom-name',
    })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('custom-name')
  })

  test('adds extension to `publicId` of raw files', async () => {
    const rawFile = { name: 'test.xls', type: 'application/xls' }
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={rawFile} {...props} />
    const Wrapper = cloudinaryUploader({
      ...props,
      cloudinaryPublicId: 'custom-name',
    })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('custom-name.xls')
  })

  test('does not set an empty `publicId`', async () => {
    const rawFile = { name: 'test.xls', type: 'application/xls' }
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={rawFile} {...props} />
    const Wrapper = cloudinaryUploader({
      ...props,
      createPublicId: () => ''
    })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toBeUndefined()
  })

  test('removes invalid characters from the default `publicId`', async () => {
    const FORBIDDEN_PATTERN = /[\s?&#\\%<>]/gi
    const illegallyNamedFile = {
      name: 'Final \\ Master %20 Schedule? #S1&S2 <100%> & finished.pdf',
      type: 'application/pdf',
    }
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={illegallyNamedFile} {...props} />
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).not.toMatch(FORBIDDEN_PATTERN)
    expect(responseJson.public_id).toEqual('Final_Master_Schedule_S1_S2_100_finished')
  })

  test('removes html escaped characters from the default `publicId`', async () => {
    const illegallyNamedFile = {
      name: 'SY%20S1%26S2.pdf',
      type: 'application/pdf',
    }
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={illegallyNamedFile} {...props} />
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('SY_S1_S2')
  })

  test('sanitizes the original `publicId` when decoding fails', async () => {
    const illegallyNamedFile = {
      name: 'Final \\ Master %20 Schedule? #S1&S2 <100%> & finished.pdf',
      type: 'application/pdf',
    }

    // eslint-disable-next-line no-undef
    const spy = jest.spyOn(window, 'decodeURIComponent').mockImplementation(() => {
      throw Error('Oops!')
    })
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={illegallyNamedFile} {...props} />
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('Final_Master_20_Schedule_S1_S2_100_finished')

    spy.mockRestore()
  })

  test('replaces spaces and removes superfluous underscores from the default `publicId`', async () => {
    const illegallyNamedFile = {
      name: '     SY     S1___S2.pdf',
      type: 'application/pdf',
    }
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={illegallyNamedFile} {...props} />
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('SY_S1_S2')
  })

  test('trims spaces from the start of the default `publicId`', async () => {
    const illegallyNamedFile = {
      name: '     Example.pdf',
      type: 'application/pdf',
    }
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={illegallyNamedFile} {...props} />
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })
    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toEqual('Example')
  })

  test('defaults file name if not provided when creating the default `publicId`', async () => {
    const fileWithNoName = { name: '', type: 'application/pdf' }
    let response
    const Wrapped = (props) => <AsyncWrapper onSuccess={(res) => { response = res }} fileData={fileData} file={fileWithNoName} {...props} />
    const Wrapper = cloudinaryUploader({ ...props })(Wrapped)
    const user = userEvent.setup()
    render(<Wrapper />)
    // eslint-disable-next-line no-undef
    const spy = jest.spyOn(global.Date, 'now')
    await user.click(screen.getByText('Upload'))
    await waitFor(() => {
      expect(screen.getByText('upload-success')).toBeInTheDocument()
    })

    const responseJson = JSON.parse(response.body)
    expect(responseJson.public_id).toContain('file_upload')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  test('throws an error if request fails', async () => {
    const Wrapped = jest.fn(() => <h1>Hi</h1>)
    const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(
      Wrapped
    )
    render(<Wrapper />)
    const { upload } = Wrapped.mock.calls[0][0]

    expect.assertions(1)

    await act(async () => {
      await expect(upload(fileData, file)).rejects.toThrow()
    })
  })

  test('updates the `uploadStatus` prop if request fails', async () => {
    const Wrapped = (props) => <AsyncWrapper fileData={fileData} file={file} {...props} upload={(...args) => {
      props.upload(...args).catch(() => {
        // ignore thrown error
      })
    }} />
    const Wrapper = cloudinaryUploader({ ...props, endpoint: '/failure' })(
      Wrapped
    )
    const user = userEvent.setup()
    render(<Wrapper />)
    await act(async () => {
      await user.click(screen.getByText('Upload'))
    })

    await waitFor(() => {
      expect(screen.getByText('upload-failure')).toBeInTheDocument()
    })
  })
})