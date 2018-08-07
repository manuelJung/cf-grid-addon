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
  background: #c3cfd5;
  border: 1px solid grey;
  border-radius: 3px;
  display: flex;


  > button {
      border: none;
      background: none;
      padding: 5px 10px;
      font-size: 16px;
      cursor: pointer;
  }

  > span {
    padding: 5px 10px;
    background white;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
  }

`