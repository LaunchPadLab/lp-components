import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

const propTypes = {
  onClose: PropTypes.func.isRequired,
  hideCloseButton: PropTypes.bool,
  children: PropTypes.node,
}

const defaultProps = {
  hideCloseButton: false,
}

function getRootElement() {
  // Skip in SSR mode
  if (typeof window === 'undefined') return
  // Note that this expects a root element with id "root"
  // eslint-disable-next-line no-undef
  return window.document.querySelector('#root')
}

// A wrapper for react-modal that adds some styles and a close button.
// See https://github.com/reactjs/react-modal for usage.
function Modal({ onClose, hideCloseButton, children, ...rest }) {
  return (
    <ReactModal
      isOpen
      onRequestClose={onClose}
      portalClassName="modal"
      className="modal-inner"
      overlayClassName="modal-fade-screen"
      bodyOpenClassName="modal-open"
      appElement={getRootElement()}
      {...rest}
    >
      <div className="modal-content rich-text">{children}</div>
      {!!onClose && !hideCloseButton && (
        <>
          <button
            onClick={onClose}
            className="modal-close"
            aria-label="Close Modal"
          >
            ×
          </button>
        </>
      )}
    </ReactModal>
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal
