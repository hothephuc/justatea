import React, { useEffect, useState } from "react";
import './ImageSlider.css'
import AdminController from "../../controller/Admin";

function ImageSlider() {
    const [slideImages, setSlideImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        async function fetchSlides() {
            try {
                const slides = await AdminController.fetchAllSlideImageUrls();
                const formattedSlides = slides.map(url => ({ url }));
                setSlideImages(formattedSlides);
                console.log('Fetched images:', formattedSlides);
            } catch (error) {
                console.error('Error fetching slides:', error);
            }
        }

        fetchSlides();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevIndex) => (prevIndex + 1) % slideImages.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [slideImages.length]);

    const goToPreviousSlide = () => {
        setCurrentSlide((prevIndex) => (prevIndex - 1 + slideImages.length) % slideImages.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevIndex) => (prevIndex + 1) % slideImages.length);
    };

    return (
        <div className="image-gallery">
            <div className="slideshow-container">
                {slideImages.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img src={image.url} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
                <button className="arrow left" onClick={goToPreviousSlide}>&#10094;</button>
                <button className="arrow right" onClick={goToNextSlide}>&#10095;</button>
            </div>
        </div>
    );
}

export default ImageSlider;
