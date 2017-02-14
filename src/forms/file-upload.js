import React from 'react'
import classnames from 'classnames'
import InputError from './input-error'
import InputLabel from './input-label'

class FileUpload extends React.Component {

  constructor () {
    super()
    this.state = { preview: null }
    this.readImage = this.readImage.bind(this)
    this.setImage = this.setImage.bind(this)
    this.reader = new FileReader()
    this.reader.onload = this.setImage
  }

  readImage (event) {
    const file = event.target.files[0]
    if (file)
      this.reader.readAsDataURL(file)
  }

  setImage () {
    this.setState({ preview: this.reader.result })
  }

  render () {
    const {
      input: { name, value, onBlur, onChange },
      meta: { error, touched, invalid },
      className,
      hint,
      label,
      tooltip,
      type,
      ...rest
    } = this.props
    const { preview } = this.state

    return (
      <fieldset>
        <InputLabel { ...{ hint, name, tooltip } } />
        <input { ...{
          id: name,
          name,
          type: 'file',
          onChange: this.readImage,
        } }/>

        { preview && <img src={ preview } height="100px" width="100px" alt="Image preview..."/> }
        <InputError { ...{ error, invalid, touched } } />
      </fieldset>
    )
  }
}

export default FileUpload

// function sendIt (data) {
//   fetch('https://api.cloudinary.com/v1_1/launchpad-lab/image/upload', {
//     method: 'POST',
//     body: JSON.stringify({
//       file: data,
//       upload_preset: 'default',
//     }),
//     headers: {
//       'Accept': 'application/json',
//       'X-Requested-With': 'XMLHttpRequest',
//       'Content-Type': 'application/json',
//     },
//     mode: 'cors',
//   })
// }
