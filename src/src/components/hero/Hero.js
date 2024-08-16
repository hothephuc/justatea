import React from 'react';
import "./Hero.css";
import ImageSlider from '../slider/ImageSlider';
import 'react-slideshow-image/dist/styles.css'; // Make sure this is imported
import hero_image from "../assets/hero.jpg"

const Hero = () => {
  return (
    <div className='hero'>    
      <ImageSlider/>
    </div>
  );
}

export default Hero;
