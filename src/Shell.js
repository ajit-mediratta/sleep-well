import React from 'react'
import Navbar from './Components/Navbar'
import Container from './Components/Container'

const Shell = (props) => {
  return (
    <div className="">
      <Navbar isHome={props.isHome} />
      <Container>
        {props.children}
      </Container>
      
    </div>
  )
}

export default Shell