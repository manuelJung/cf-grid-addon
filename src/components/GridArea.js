import React from 'react'
import pt from 'prop-types'
import styled from 'styled-components'

export default class GridArea extends React.Component {
  static propTypes = {
    value: pt.string.isRequired,
    wasRemoved: pt.bool
  }

  render () {
      let {value, wasRemoved} = this.props
    return (
      <Wrapper wasRemoved={wasRemoved}>
        {value}
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.wasRemoved ? '#ff5722' : '#c3cfd5'};
  border: 1px solid grey;
  border-radius: 2px;
`