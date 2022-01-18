import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { isServer } from './utils'

/**
 * A modal component with a built-in close button. Uses [`react-modal`](https://github.com/reactjs/react-modal) under the hood, and can accept any props `react-modal` does.
 *
 * Unlike `react-modal`, this component does not require an `isOpen` prop to render. However, that prop can still be used in the case where animations are necessary- see [this issue](https://github.com/reactjs/react-modal/issues/25).
 *
 * Note: this component requires custom styles. These styles can be imported from the `lib/styles` folder as shown inn the example below.
 *
 * @name Modal
 * @type Function
 * @param {Function} onClose - A handler for closing the modal. May be triggered via the close button, and outside click, or a key press.
 * @param {Boolean} [preventClose=false] - A flag for preventing the modal from being closed (close button, escape, or overlay click).
 *
 * @example
 *
 * // application.scss
 *
 * // @import "../../node_modules/@launchpadlab/lp-components/lib/styles/modal";
 *
 * // MyView.js
 *
 * function MyView () {
 *   const [ modalShown, setModalShown ] = useState(false)
 *   return (
 *     <div>
 *       <button onClick={() => setModalShown(true)}>Show modal</button>
 *       {
 *          <Modal onClose={ () => setModalShown(false) }>
 *            This is the modal content!
 *          </Modal>
 *       }
 *     </div>
 *   )
 * }
 */

const propTypes = {
  onClose: PropTypes.func.isRequired,
  preventClose: PropTypes.bool,
  children: PropTypes.node,
}

const defaultProps = {
  preventClose: false,
}

function getRootElement() {
  // Skip in SSR mode
  if (isServer()) return
  // eslint-disable-next-line no-undef
  return window.document.querySelector('body')
}

// A wrapper for react-modal that adds some styles and a close button.
// See https://github.com/reactjs/react-modal for usage.
function Modal({ onClose, preventClose, children, ...rest }) {
  const canClose = !preventClose
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      portalClassName="modal"
      className="modal-inner"
      overlayClassName="modal-fade-screen"
      bodyOpenClassName="modal-open"
      appElement={getRootElement()}
      ariaHideApp={isServer()} // Opt out of setting appElement on the server.
      shouldCloseOnEsc={canClose}
      shouldCloseOnOverlayClick={canClose}
      {...rest}
    >
      <div className="modal-content">{children}</div>
      {canClose && (
        <>
          <button
            type="button"
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
