import PropTypes from 'prop-types'

export const columnPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  sortFunc: PropTypes.func,
  component: PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]),
  disabled: PropTypes.bool,
}

export const column = PropTypes.shape(columnPropTypes)