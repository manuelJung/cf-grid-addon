import React from 'react'
import pt from 'prop-types'
import styled from 'styled-components'

export default class Input extends React.Component {
  static propTypes = {
    value: pt.string.isRequired,
    onChange: pt.func.isRequired
  }

  state = {active: false}

  render () {
    return (
      <Wrapper>
        {this.props.value}
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  
`