import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { startCase, stripNamespace, toggle } from '../utils'

const propTypes = {
  hint: PropTypes.node,
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.node,
  tooltipActive: PropTypes.bool,
  toggletooltip: PropTypes.func,
}

function InputLabel ({ hint, label, name, tooltip, tooltipActive, toggletooltip }) {
  const labelText = label || startCase(stripNamespace(name))
  return (
    <span>
      { label !== false &&
        <label htmlFor={ name }>
          { labelText }

          { tooltip &&
            <span className="tooltip-trigger" onClick={ toggletooltip }/>
          }

          { hint &&
            <i> { hint }</i>
          }
        </label>
      }

      { tooltip &&
        <div className={ classnames('tooltip-content', { 'is-active': tooltipActive }) }>
          { tooltip }
       </div>
      }
    </span>

  )
}

InputLabel.propTypes = propTypes

export default toggle('tooltip')(InputLabel)
