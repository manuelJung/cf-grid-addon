export const types = {
    COMPONENT: 'COMPONENT',
    WIDTH: 'WIDTH',
    HEIGHT: 'HEIGHT',
    COLS: 'COLS'
}

export const translateGridToLayout = grid => {
    const components = {}

    const rawGrid = grid
      .split('/')[0]
      .split('\n')
      .map(row => row.split('"')[1])
      .filter(row => row)
      .map(row => row.split(/\s+/))
      .map(row => row.filter(x => x))

    const getWidth = (x,y,g) => g[y].filter(n => n === g[y][x]).length
    const getHeight = (x,y,g) => g.map((_,i) => g[i][x]).filter(n => n === g[y][x]).length

    for(let x=0;x<rawGrid[0].length;x++){
      for(let y=0;y<rawGrid.length;y++){
        const name = rawGrid[y][x]
        if(!components[name] && name !== '.'){
          components[rawGrid[y][x]] = {
            x: x+1, // +1 to shift all one right for grid heights
            y: y+1, // +1 to shift all one bottom for grid widths
            w: getWidth(x,y, rawGrid),
            h: getHeight(x,y, rawGrid),
            i: name,
            name: name,
            type: types.COMPONENT
          }
        }
      }
    }

    const widths = (grid.split('/')[1] || '').split(/\s+/).filter(x => x).map((row,i) => ({
      x:i+1, // +1 to shift all one right for grid heights
      y:0,  // should be first row
      w:1, 
      h:1, 
      i: (row+'-'+i), 
      static: true, 
      name: row, 
      type: types.WIDTH
    }))

    console.log(grid
      .split('/')[0])

    const heights = grid
      .split('/')[0]
      .split('\n')
      .filter(row => row.split(/\s+/).length > 2)
      .map(row => row.split('"')[2])
      .map(row => row || 'auto')
      .map((row,i) => ({
        x:0, // must be first coll
        y:i+1, // +1 to shift all one bottom for grid widths
        w:1,
        h:1,
        i: (row+'-'+i),
        static: true,
        name: row,
        type: types.HEIGHT
      }))

    return [
      ...widths,
      ...heights,
      ...Object.values(components),
      // cols
      {x:0, y:0, w:1, h:1, i:'cols', static:true, name:2, type:types.COLS  }
    ]
}