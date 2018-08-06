

export const getGrid = cf => cf.field.getValue()

export const getAllComponents = cf => {
  cf.entry.fields.content.onValueChanged(console.log)
  const value = cf.entry.fields.content.getValue()
  let hits = (value.match(/gridArea="[^"]+/g) || []).map(row => row.replace('gridArea="', ''))
  return hits
}

export const updateGrid = (cf, grid) => cf.field.getValue() !== grid && cf.field.setValue(grid)


