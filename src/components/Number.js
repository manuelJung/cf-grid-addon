import React from 'react'
import pt from 'prop-types'
import styled from 'styled-components'

export default class Input extends React.Component {
  static propTypes = {
    value: pt.number.isRequired,
    onChange: pt.func.isRequired,
  }

  render () {
      let {value, onChange} = this.props
    return (
      <Wrapper>
        <button onClick={onChange(value-1)}>-</button>
        <span>{value-2}</span>
        <button onClick={onChange(value+1)}>+</button>
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  
`