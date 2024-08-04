import React from "react";
import '../hero/ImageSlider.css'
import {Fade,Zoom,Slide} from 'react-slideshow-image'
import slide from "../assets/slide.jpg";
import slide2 from "../assets/coffee_date.jpg";
import slide3 from "../assets/slide3.jpg";

const slideImage = [
    {
        url: slide,
        caption: "First slide"
    },
    {
        url: slide2,
        caption: "Second slide"
    },
    {
        url: slide3,
        caption: "Third slide"
    }
];

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    backgroundSize: 'cover',
}
const spanStyle ={
    fontSize: '20px',
    background: "#efefef",
    color: "#000000",
}

function ImageSlider() {
  return (
    <div className="slide-container">
      <Fade>
        {slideImage.map((image,index)=> (
            <div key={index}>
                <div style={{ ...divStyle, backgroundImage: `url(${image.url})` }}>
                    <span style ={{spanStyle}}>{image.caption}</span>
                </div>
            </div>
        ))}
      </Fade>
    </div>
  )
}

export default ImageSlider
