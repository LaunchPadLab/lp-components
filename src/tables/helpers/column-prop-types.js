import PropTypes from 'prop-types'

const componentType = PropTypes.oneOfType([ PropTypes.func, PropTypes.object ])

export const columnPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  sortFunc: PropTypes.func,
  disabled: PropTypes.bool,
  component: componentType,
}

export const Types = {
  column: PropTypes.shape(columnPropTypes),
  component: componentType,
}
