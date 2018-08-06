
export const types = {
  COMPONENT: 'COMPONENT',
  WIDTH: 'WIDTH',
  HEIGHT: 'HEIGHT',
  COLS: 'COLS',
  EXTERN: 'EXTERN',
}

const createWidths = rawWidths => rawWidths.map((val,i) => ({
x:i+2, // +2 to shift all two right for grid heights and buffer
y:0,  // should be first row
w:1, 
h:1, 
i: 'width-'+i, 
static: true, 
name: val, 
type: types.WIDTH
}))

const createHeights = rawHeights => rawHeights.map((val,i) => ({
x:1, // always second column
y:i+1, // +1 to shift all one to bottom for widths
w:1,
h:1,
i: 'height-'+i,
static: true,
name: val,
type: types.HEIGHT
}))

const createBuffer = rawBuffer => rawBuffer.map((val, i) => ({
x: 0, // always first column
y: i+1, // +1 to shift all one to bottom for widths
w:1,
h:1,
i: 'buffer-'+i,
name: val,
type: types.COMPONENT,
isBuffer: true
}))

const createGrid = rawGrid => {
const components = {}
const getWidth = (x,y,g) => g[y].filter(n => n === g[y][x]).length
const getHeight = (x,y,g) => g.map((_,i) => g[i][x]).filter(n => n === g[y][x]).length
for(let x=0;x<rawGrid[0].length;x++){
  for(let y=0;y<rawGrid.length;y++){
    const name = rawGrid[y][x]
    if(!components[name] && name !== '.'){
      const w = getWidth(x,y, rawGrid)
      const h = getHeight(x,y, rawGrid)
      components[name] = {
        x: x+2, // +1 to shift all one right for grid heights
        y: y+1, // +1 to shift all one bottom for grid widths
        w: w,
        h: h,
        i: name,
        name: name,
        type: types.COMPONENT
      }
    }
  }
}
return Object.values(components)
}

export const translateGridToLayout = (grid, cols, allComponents) => {
const gridCols = cols -2
const rawGrid = grid
  .split('/')[0]
  .split('\n')
  .map(row => row.split('"')[1])
  .filter(row => row)
  .map(row => row.split(/\s+/))
  .map(row => row.filter(x => x))
  .map(row => row.slice(0,gridCols))

const rawHeights = grid
  .split('/')[0]
  .split('\n')
  .filter(row => row.split(/\s+/).length > 2)
  .map(row => row.split('"')[2])
  .map(row => row || 'auto')
  .slice(0, rawGrid.length)

const rawWidths = (grid.split('/')[1] || '')
  .split(/\s+/)
  .filter(x => x)
  .reduce((p,n,i,list) => {
    if(list.length !== i+1) return null
    if(list.length < gridCols) return Array(gridCols).fill().map((_,i) => list[i] || '1fr')
    if(list.length > gridCols) return list.slice(0, gridCols)
    return list
  })

const allUsedComponents = rawGrid
  .map(row => row.join('|'))
  .join('|')
  .split('|')
  .reduce((p,n,i,list) => list.length === i+1 && [...new Set(list)])

const allUnusedComponents = allComponents.filter(comp => !allUsedComponents.find(name => name === comp))

return [
  {x:1, y:0, w:1, h:1, i:'cols', static:true, name:'cols', type:types.COLS  },
  {x:0, y:0, w:1, h:1, i:'extern', static:true, name:'buffer', type:types.EXTERN  },
  ...createWidths(rawWidths),
  ...createBuffer(allUnusedComponents),
  ...createHeights(rawHeights),
  ...createGrid(rawGrid)
]
}

export const getColNumFromGrid = grid => {
  const result = grid
      .split('/')[0]
      .split('\n')
      .map(row => row.split('"')[1])
      .filter(row => row)
      .map(row => row.split(/\s+/))
      .map(row => row.filter(x => x))

  return result[0].length +2
}

export const updateLayout = (ownLayout, nativeLayout) => {
  const dict = nativeLayout.reduce((p,n) => Object.assign(p, {[n.i]: n}), {})

  const layout = ownLayout.map(row => ({
    ...row,
    x: dict[row.i].x,
    y: dict[row.i].y,
    w: dict[row.i].w,
    h: dict[row.i].h
  }))

  return layout
}

export const translateLayoutToGrid = layout => {
  const components = layout
    .filter(row => row.type === types.COMPONENT)
    .map(row => ({
      ...row,
      x: row.x-2,
      y: row.y-1
    }))
  
  const GRID_WIDTH = components.reduce((p,n) => {
    const width = n.w + n.x
    return width > p ? width : p
  },1)

  const GRID_HEIGHT = components.reduce((p,n) => {
    const height = n.h + n.y
    return height > p ? height : p
  },1)

  const grid = Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill().map(() => '.'))

  // set components
  components.forEach(row => Array(row.h).fill().forEach((_,y) => Array(row.w).fill().forEach((_,x) => {
    grid[y+row.y][x+row.x] = row.name
  })))

  const widths = layout
    .filter(row => row.type === types.WIDTH)
    .sort((a,b) => a.x - b.x)
    .map(row => row.name || '1fr')

  const heights = layout
    .filter(row => row.type === types.HEIGHT)
    .sort((a,b) => a.y - b.y)
    .map(row => row.name || 'auto')

  const result = grid
    .map((row,i) => `" ${row.join(' ')} " ${heights[i]}`)
    .concat(`/ ${widths.join(' ')}`)
    .join('\n')

  return result
}