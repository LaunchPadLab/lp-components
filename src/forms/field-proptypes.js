import { PropTypes } from 'react'

export default {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    dirty: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
  }).isRequired,
}
