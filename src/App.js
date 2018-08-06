import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'

import Grid from './components/Grid'

import {getGrid, getAllComponents} from './utils/cf'

export default class App extends Component {
  render() {
    const grid = getGrid()
    const allComponents = getAllComponents()
    return (
      <div className="App">
        <GridWrapper>
          <Grid grid={grid} allComponents={allComponents}/>
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
