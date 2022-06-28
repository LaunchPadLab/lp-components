import React from 'react'

module.exports = function cloudinaryUploader () {
  return Wrapped => function Wrapper (props) {
    return <Wrapped { ...props }/>
  }
}