// Transform string options into object options

export default function objectify (optionArray) {
  return optionArray.map((option) => {
    return (typeof option === 'string') ? { key: option, value: option } : option
  })
}
