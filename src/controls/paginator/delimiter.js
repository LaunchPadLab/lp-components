import React from 'react'

function Delimiter({ children }) {
  return (
    <li>
      <span className="delimiter">{children}</span>
    </li>
  )
}

export default Delimiter
