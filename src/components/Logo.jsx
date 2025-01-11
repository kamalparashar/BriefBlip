import React from 'react'
import logo from '../assets/logo.png'

function Logo({width = '', className=''}) {
  return (
    <div className={`${className}`}>
      <img src={logo} className=' block'/>
    </div>
  )
}

export default Logo