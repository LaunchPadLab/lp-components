import React from 'react'
import PropTypes from 'prop-types'
import { ChromePicker } from 'react-color'
import { compose, toggle, togglePropTypes, modifyProps, noop } from '../utils'

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  active: PropTypes.bool,
  ...togglePropTypes('expanded'),
}

const defaultProps = {
  value: '#000000',
  onChange: noop,
  onOpen: noop,
  onClose: noop,
}

function ColorPicker ({
  value,
  onChange,
  onOpen,
  onClose,
  expanded,
  toggleExpanded,
  ...rest
}) {
  return (
    <div className="color-picker">
      <span 
        className="swatch"
        style={{ background: value || 'black' }} 
        onClick={ () => {
          toggleExpanded()
          return onOpen()
        }} 
      />
      {
        expanded &&
         <div className="popover">
          <div 
            className="cover"
            onClick={() => {
              toggleExpanded()
              return onClose()
            }}
          />
          <ChromePicker
            color={ value }
            onChange={ ({ hex }) => onChange(hex) }
            disableAlpha={ true }
            { ...rest }
          />
        </div>
      }
    </div>
  )
}

ColorPicker.propTypes = propTypes
ColorPicker.defaultProps = defaultProps

// Allow active to override expanded
function modify ({ active, expanded }) {
  return {
    expanded: (active === undefined) ? expanded : active
  }
}

export default compose(
  toggle('expanded'),
  modifyProps(modify),
)(ColorPicker)