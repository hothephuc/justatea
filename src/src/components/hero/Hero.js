import React from 'react';
import "./Hero.css";
import ImageSlider from './ImageSlider';
import 'react-slideshow-image/dist/styles.css'; // Make sure this is imported
import hero_image from "../assets/hero.jpg"

const Hero = () => {
  return (
    <div>    
      <ImageSlider/>
    </div>
  );
}

export default Hero;
