import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'

import Demo from './components/demo'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <GridWrapper>
          <Demo />
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
