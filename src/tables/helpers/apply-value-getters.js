export default function applyValueGetters(columns, data) {
  let annotatedData = data

  columns.forEach(({ name, valueGetter }) => {
    if (valueGetter) {
      annotatedData = data.map((datum) => {
        return {
          ...datum,
          [name]: valueGetter(datum)
        }
      })
    }
  })

  return annotatedData
}
