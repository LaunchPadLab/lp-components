import React from 'react'

function cloudinaryUploader() {
  return (Wrapped) =>
    function Wrapper(props) {
      return <Wrapped {...props} />
    }
}

export default cloudinaryUploader
