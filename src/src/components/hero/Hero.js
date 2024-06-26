import React from 'react'
import "./Hero.css"
import hero_image from "../assets/hero-2.png"

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>Xin chào mọi người</h2>
            <p>Web thì chưa làm xong nhưng mà đây là vợ mình</p>
        </div>
        <div className='hero-right'>
            <img src={hero_image} alt=""/>
        </div>
    </div>
  )
}

export default Hero