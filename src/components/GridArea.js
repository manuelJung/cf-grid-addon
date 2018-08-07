import React from 'react'
import pt from 'prop-types'
import styled from 'styled-components'

export default class Input extends React.Component {
  static propTypes = {
    value: pt.number.isRequired,
    exists: pt.bool.isRequired
  }

  render () {
      let {value, exists} = this.props
    return (
      <Wrapper>
        {value}
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  

`