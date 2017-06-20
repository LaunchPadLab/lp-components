import { omit } from '../../utils'

// A function that omits the `InputLabel` props from form component props
// Omits the following props:
//  - `hint`
//  - `tooltip`
//  - `label`

function omitLabelProps (props) {
  return omit([
    'hint',
    'tooltip',
    'label'
  ], props)
}

export default omitLabelProps