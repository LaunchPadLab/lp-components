export default function (str) {
  if (!str || typeof str !== 'string') return str
  return str.split('.').pop()
}
