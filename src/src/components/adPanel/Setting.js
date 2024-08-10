import React, { useEffect, useState } from "react";
import AdminController from "../../controller/Admin";
import './css/Setting.css';

function Setting() {
    const [slideImages, setSlideImages] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchSlides() {
            try {
                const slides = await AdminController.fetchAllSlideImageUrls();
                setSlideImages(slides);
                console.log('Setting fetch: ',slides)
                console.log('Setting fetch: ',slideImages)
            } catch (error) {
                console.error('Error fetching slides:', error);
               
            }
        }

        fetchSlides();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setNewImageUrl(URL.createObjectURL(file));
        }
    };

    const addSlide = async () => {
        if (imageFile) {
            setLoading(true);
            try {
                const updatedSlides = await AdminController.addSlideImageFile(imageFile);
                setSlideImages(updatedSlides);
                setImageFile(null);
                setNewImageUrl('');
            } catch (error) {
                console.error('Error adding slide:', error);
                alert('Failed to add slide. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const removeSlide = async (index) => {
        try {
            const updatedSlides = await AdminController.removeSlideImage(index);
            setSlideImages(updatedSlides);
        } catch (error) {
            console.error('Error removing slide:', error);
            alert('Failed to remove slide. Please try again.');
        }
    };

    return (
        <div className="slide-manager">
            <h2>Manage Slides</h2>
            <ul>
                    {slideImages.map((image, index) => {
                    console.log(`Slide ${index + 1} URL:`, image.imageUrl); // Log the URL
                    return (
                        <li key={index} className="slide-item">
                            <img src={image.imageUrl} alt={`Slide ${index + 1}`} className="slide-image" />
                            <button name={`remove-slide-${index}`} onClick={() => removeSlide(index)}>
                                Remove
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className="add-product-fields">
                <p>Image</p>
                <div className="add-product-image">
                    <label htmlFor="file-input">
                        <img
                            src={newImageUrl ? newImageUrl : "https://static.thenounproject.com/png/187803-200.png"}
                            alt="Preview"
                            className="image-preview"
                            style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} 
                        />
                    </label>
                    <input
                        onChange={handleFileChange}
                        type="file"
                        name="image"
                        id="file-input"
                        hidden
                    />
                </div>
                <button
                    name="add-slide"
                    onClick={addSlide}
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Add Slide'}
                </button>
            </div>
        </div>
    );
}

export default Setting;
