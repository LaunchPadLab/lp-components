import React from 'react'

// Mock cloudinaryUploader for testing CloudinaryFileInput 

function cloudinaryUploader () {
  return Wrapped => function Wrapper (props) {
    return <Wrapped { ...props }/>
  }
}

const lpHoc = require('@launchpadlab/lp-hoc')
lpHoc.cloudinaryUploader = cloudinaryUploader
module.exports = lpHoc