import { default as SubmitButton } from './submit-button'
import { deprecateComponent } from '../../utils'

const warning = 
`Submit is deprecated and will be removed 
in the next major version of lp-components. 
Use SubmitButton instead.`

export default deprecateComponent(warning)(SubmitButton)