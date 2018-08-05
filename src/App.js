import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'

import Grid from './components/Grid'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <GridWrapper>
          <Grid />
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
