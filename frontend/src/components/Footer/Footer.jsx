import React from 'react'
import './Footer.css'
import { BsTelephoneFill } from 'react-icons/bs';

function Footer() {
  return (
    <footer>
      <div className='footerCore'>
        <div>Address: 272 Dandenong South Rd, Dandenong South</div>
        <div>Email: soanynsafo127@gmail.com <span style={{marginLeft:"2rem"}}> <BsTelephoneFill style={{position:"relative", top:"2px"}}/>13000000000</span></div>
        <div>ABC trades all rights reserved</div>
      </div>
    </footer>
  )
}

export default Footer