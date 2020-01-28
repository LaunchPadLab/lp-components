import { getConfiguration } from '../../configuration'

// Grab the global form adapter and apply it to the component
function applyFormAdapter(Component) {
  const { formAdapter } = getConfiguration()
  if (!formAdapter) return Component
  // We'll trust that people know what they're doing here.
  return formAdapter ? formAdapter(Component) : Component
}

export default applyFormAdapter
