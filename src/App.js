import React, { Component } from 'react'
import pt from 'prop-types'
import './App.css'
import styled from 'styled-components'

import Grid from './components/Grid'

import {getGrid, getAllComponents, updateGrid} from './utils/cf'

export default class App extends Component {

  static propTypes = {
    cf: pt.object.isRequired
  }

  state = {
    grid: getGrid(this.props.cf),
    allComponents: getAllComponents(this.props.cf)
  }

  componentDidMount(){
    this.props.cf.window.startAutoResizer()
  }

  render() {
    let {grid, allComponents} = this.state

    return (
      <div className="App">
        <GridWrapper>
          <Grid grid={grid} allComponents={allComponents} onGridChange={g => updateGrid(this.props.cf, g)}/>
        </GridWrapper>
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
