import React from "react"
import pt from 'prop-types'
import RGL, { WidthProvider } from "react-grid-layout"
import {getColNumFromGrid, translateGridToLayout, types, updateLayout, translateLayoutToGrid} from '../utils/grid'
import styled from 'styled-components'

const ReactGridLayout = WidthProvider(RGL);

/**
 * This layout demonstrates how to use the `onResize` handler to enforce a min/max width and height.
 *
 * In this grid, all elements are allowed a max width of 2 if the height < 3,
 * and a min width of 2 if the height >= 3.
 */
export default class DynamicMinMaxLayout extends React.PureComponent {

  static propTypes = {
    grid: pt.string.isRequired,
    allComponents: pt.arrayOf(pt.string).isRequired,
    onGridChange: pt.func.isRequired
  }

  state = { layout: [], cols: getColNumFromGrid(this.props.grid), grid: this.props.grid }

  componentDidMount(){
    const layout = translateGridToLayout(this.state.grid, this.state.cols, this.props.allComponents)
    this.setState({layout})
  }

  setCols = num => () => {
    this.setState({
      cols: num,
      layout: translateGridToLayout(this.state.grid, num, this.props.allComponents)
    })
  }

  handleLayoutChange = nativeLayout => {
    const layout = updateLayout(this.state.layout, nativeLayout)
    const grid = translateLayoutToGrid(layout)
    this.setState({layout, grid})
    this.props.onGridChange(grid)
  }

  renderCols = (l,i) => {
    return (
      <Component key={l.i} data-grid={l} isStatic={l.static}>
        <button onClick={this.setCols(this.state.cols-1)}>-</button>
        <span>{this.state.cols-2}</span>
        <button onClick={this.setCols(this.state.cols+1)}>+</button>
      </Component>
    )
  }

  createComponent = (l,i) => {
    if(l.type === types.COLS){
      return this.renderCols(l,i)
    }
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
      onLayoutChange: this.handleLayoutChange,
      cols: this.state.cols
    }
    
    return (
      <ReactGridLayout {...gridProps} key={this.props.grid+this.state.cols}>
        {this.state.layout.map(this.createComponent)}
      </ReactGridLayout>
    );
  }
}

const Component = styled.div`
  background: ${({isStatic}) => isStatic ? 'none' : '#c3cfd5'};
  border: ${({isStatic}) => isStatic ? 'none' : '1px solid grey'};
  border-radius: 2px;
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