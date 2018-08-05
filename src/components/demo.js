import React from "react"
import RGL, { WidthProvider } from "react-grid-layout"
import {translateGridToLayout} from '../utils/grid'
import styled from 'styled-components'

const ReactGridLayout = WidthProvider(RGL);

/**
 * This layout demonstrates how to use the `onResize` handler to enforce a min/max width and height.
 *
 * In this grid, all elements are allowed a max width of 2 if the height < 3,
 * and a min width of 2 if the height >= 3.
 */
export default class DynamicMinMaxLayout extends React.PureComponent {

  state = { layout: [] }

  componentDidMount(){
    const layout = translateGridToLayout(`
      " Title Title Title Title "
      " Img1  Img1  Img1  Img1  "
      " Img2  Img2  Img3  Img4  "
      " Img5  Img5  Img6  Img6  "
      " Img7  Img8  Img9  Img9  "
      " Img10 Img10 desc  desc  "
      " Img11 Img11 Img11 Img11 "
      / 1fr   1fr   1fr   1fr
    `)
    this.setState({layout})
  }

  createComponent = (l,i) => {
    return (
      <Component key={l.i} data-grid={l} isStatic={l.static}>
        <span className="text">{l.name}</span>
      </Component>
    )
  }

  render() {
    const gridProps = {
      isDraggable: true,
      isResizable: true,
      items: 5,
      rowHeight: 30,
      onLayoutChange: console.log,
      cols: 6
    }
    return (
      <ReactGridLayout {...gridProps} >
        {this.state.layout.map(this.createComponent)}
      </ReactGridLayout>
    );
  }
}

const Component = styled.div`
  background: ${({isStatic}) => isStatic ? 'none' : 'lightgrey'};
  border: ${({isStatic}) => isStatic ? 'none' : '1px solid grey'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  > .react-resizable-handle {
    position: absolute;
    width: 10px;
    height: 10px;
    right: 0;
    bottom: 0;
    background: grey;
  }

  .el-static {
    background: none;
    border: none;
  }
`