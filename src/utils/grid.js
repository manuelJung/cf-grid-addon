export const types = {
    COMPONENT: 'COMPONENT',
    WIDTH: 'WIDTH',
    HEIGHT: 'HEIGHT',
    COLS: 'COLS',
    EXTERN: 'EXTERN',
}

export const translateGridToLayout = (grid, cols, allComponents) => {
    const components = {}

    const rawGrid = grid
      .split('/')[0]
      .split('\n')
      .map(row => row.split('"')[1])
      .filter(row => row)
      .map(row => row.split(/\s+/))
      .map(row => row.filter(x => x))

    if(!cols){ cols= rawGrid[0].length+2 }

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
    const widthBuffer = (grid.split('/')[1] || '').split(/\s+/).filter(x => x)
    const widths = Array(cols).fill().map((_,i) => widthBuffer[i]).map((row,i) => ({
      x:i+2, // +1 to shift all one right for grid heights
      y:0,  // should be first row
      w:1, 
      h:1, 
      i: ((row|| '1fr')+'-'+i), 
      static: true, 
      name: row || '1fr', 
      type: types.WIDTH
    }))

    const heights = grid
      .split('/')[0]
      .split('\n')
      .filter(row => row.split(/\s+/).length > 2)
      .map(row => row.split('"')[2])
      .map(row => row || 'auto')
      .map((row,i) => ({
        x:1, // must be first coll
        y:i+1, // +1 to shift all one bottom for grid widths
        w:1,
        h:1,
        i: (row+'-'+i),
        static: true,
        name: row,
        type: types.HEIGHT
      }))

    const buffer = allComponents
      .filter(comp => !components[comp])
      .map((row,i) => ({
        x: 0,
        y: i+1,
        w:1,
        h:1,
        i: (row+'-'+i),
        name: row,
        type: types.COMPONENT,
        isBuffer: true
      }))

    return [
      ...widths,
      ...heights,
      ...Object.values(components),
      ...buffer,
      // cols
      {x:1, y:0, w:1, h:1, i:'cols', static:true, name:'cols', type:types.COLS  },
      {x:0, y:0, w:1, h:1, i:'extern', static:true, name:'buffer', type:types.EXTERN  }
    ].filter(row => row.x+row.w <= cols)
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
    .map(row => row.name)

  const heights = layout
    .filter(row => row.type === types.HEIGHT)
    .sort((a,b) => a.y - b.y)
    .map(row => row.name)

  const result = grid
    .map((row,i) => `" ${row.join(' ')} " ${heights[i]}`)
    .concat(`/ ${widths.join(' ')}`)
    .join('\n')

  return result
}