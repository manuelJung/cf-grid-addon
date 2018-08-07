import React, { Component } from 'react'
import pt from 'prop-types'
import './App.css'
import styled from 'styled-components'

import Grid from './components/Grid'

import {getGrid, getAllComponents, updateGrid, listenToComponentsUpdate} from './utils/cf'

export default class App extends Component {

  static propTypes = {
    cf: pt.object.isRequired
  }

  state = {
    grid: getGrid(this.props.cf),
    allComponents: getAllComponents(this.props.cf)
  }

  unlistenToComponentsChange = () => null

  componentDidMount(){
    let {cf} = this.props
    cf.window.startAutoResizer()
    this.unlistenToComponentsChange = listenToComponentsUpdate(cf, allComponents => this.setState({allComponents}))
  }

  render() {
    let {grid, allComponents} = this.state

    return (
      <div className="App">
        <GridWrapper key={allComponents}>
          <Grid grid={grid} allComponents={allComponents} onGridChange={g => updateGrid(this.props.cf, g)}/>
        </GridWrapper>
        { process.env.NODE_ENV !== 'production' && <button onClick={() => {
          this.setState({allComponents: [
            'Title', 'Img1', 'Img2', 'Img3', 'Img4', 'Img5', 'XCYZ',
            'Img8', 'Img9', 'Img10', 'Img11', 'desc', 'Test'
          ]})
        }}>add</button>}
      </div>
    );
  }
}

const GridWrapper = styled.section`
  .react-grid-placeholder {
    background: green;
    opacity: .3;
  }
`
