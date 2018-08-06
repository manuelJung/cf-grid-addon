const DEMO_GRID = (`
" Title Title Title Title " auto
" Img1  Img1  Img1  Img1  " auto
" Img2  Img2  Img3  Img4  " auto
" Img5  Img5  Img6  Img6  " auto
" Img7  Img8  Img9  Img9  " auto
" Img10 Img10 desc  desc  " auto
" Img11 Img11 Img11 Img11 " auto
/ 1fr   1fr   1fr   1fr
`)

const DEMO_COMPONENTS = [
  'Title', 'Img1', 'Img2', 'Img3', 'Img4', 'Img5', 'Img6', 'Img7',
  'Img8', 'Img9', 'Img10', 'Img11', 'desc', 'Test'
] 

export const getGrid = cf => {
  if(process.env.NODE_ENV !== 'production'){ return DEMO_GRID }
  return cf.field.getValue()
}

export const getAllComponents = cf => {
  if(process.env.NODE_ENV !== 'production'){ return DEMO_COMPONENTS }
  cf.entry.fields.content.onValueChanged(console.log)
  const value = cf.entry.fields.content.getValue()
  let hits = (value.match(/gridArea="[^"]+/g) || []).map(row => row.replace('gridArea="', ''))
  return hits
}

export const updateGrid = (cf, grid) => {
  if(process.env.NODE_ENV !== 'production'){ console.log(grid); return }
  cf.field.getValue() !== grid && cf.field.setValue(grid)
}


