import { omit } from '../../utils'

const inputLabelProps = [
  'hint',
  'tooltip'
]

function omitLabelProps (props) {
  return omit(inputLabelProps, props)
}

export default omitLabelProps