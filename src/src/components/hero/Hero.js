import React from 'react';
import "./Hero.css";
import ImageSlider from './ImageSlider';
import 'react-slideshow-image/dist/styles.css'; // Make sure this is imported
import hero_image from "../assets/hero.jpg"

const Hero = () => {
  return (
    <div>
   
     
      <ImageSlider/>
      {/* <div className='hero'>
        <div className='hero-left'>
            <h2>Xin chào mọi người</h2>
            <p>Web thì chưa làm xong nhưng mà đây là vợ mình</p>
        </div>
        <div className='hero-right'>
            <img src={hero_image} alt=""/>
        </div> 
      </div> */}
    </div>
  );
}

export default Hero;
