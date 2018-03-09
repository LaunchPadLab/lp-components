import React from 'react'
import PropTypes from 'prop-types'
import { ChromePicker } from 'react-color'
import { compose, toggle, togglePropTypes, noop } from '../utils'

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  ...togglePropTypes('expanded'),
}

const defaultProps = {
  value: '#000000',
  onChange: noop,
  onBlur: noop,
}

function ColorPicker ({
  value,
  onChange,
  onBlur,
  expanded,
  toggleExpanded,
  ...rest
}) {
  return (
    <div className="color-picker">
      <span 
        className="swatch"
        style={{ background: value || 'black' }} 
        onClick={ toggleExpanded } 
      />
      {
        expanded &&
         <div className="popover">
          <div 
            className="cover"
            onClick={() => {
              toggleExpanded()
              return onBlur()
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

export default compose(
  toggle('expanded'),
)(ColorPicker)