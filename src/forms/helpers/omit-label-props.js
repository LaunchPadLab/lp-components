import { omit } from '../../utils'

// A function that omits the `InputLabel` props from form component props

function omitLabelProps (props) {
  return omit([
    'hint',
    'tooltip'
  ], props)
}

export default omitLabelProps