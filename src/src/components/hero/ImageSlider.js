import React, { useEffect, useState } from "react";
import '../hero/ImageSlider.css';
import { Fade } from 'react-slideshow-image';
import AdminController from "../../controller/Admin";

function ImageSlider() {
    const [slideImages, setSlideImages] = useState([]);

    useEffect(() => {
        async function fetchSlides() {
            try {
                // Fetch all slide image URLs from the controller
                const slides = await AdminController.fetchAllSlideImageUrls();
                const formattedSlides = slides.map(url => ({ url })); // Format slides for slider
                setSlideImages(formattedSlides);
            } catch (error) {
                console.error('Error fetching slides:', error);
            }
        }

        fetchSlides();
    }, []);

    return (
        <div className="slide-container">
            <Fade>
                {slideImages.map((image, index) => (
                    <div key={index} className="slide" style={{ backgroundImage: `url(${image.url})` }}>
                    </div>
                ))}
            </Fade>
        </div>
    );
}

export default ImageSlider;
