export default function (Component) {
  return Component.displayName || Component.name || 'Component'
}
