import React, { Component } from 'react'
import pt from 'prop-types'
import './App.css'
import styled from 'styled-components'

import Grid from './components/Grid'

import {getGrid, getAllComponents, updateGrid} from './utils/cf'

export default class App extends Component {

  static propTypes = {
    cf: pt.func.isRequired
  }

  componentDidMount(){
    this.props.cf.window.startAutoResizer()
  }

  render() {
    const grid = getGrid(this.props.cf)
    const allComponents = getAllComponents(this.props.cf)
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
