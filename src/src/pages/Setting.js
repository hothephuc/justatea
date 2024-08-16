import React, { useEffect, useState } from "react";
import AdminController from "../controller/Admin";
import './css/Setting.css';

function Setting() {
    const [slideImages, setSlideImages] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [slideDoc,setSlideDoc] = useState({
        imageUrl : '',
    });

    useEffect(() => {
        async function fetchSlides() {
            try {
                const slides = await AdminController.fetchAllSlideImageUrls();
                const formattedSlides = slides.map(url => ({ url }));
                setSlideImages(formattedSlides);
                console.log('Fetched images:', formattedSlides);
                console.log(slideImages)
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
                const newImageUrl = await AdminController.uploadImageSlide(imageFile);
                setSlideImages(prevImages => [...prevImages, { url: newImageUrl }]);
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
            const imageUrl = slideImages[index].url; // Lấy imageUrl từ slideImages
    
            console.log('Đang xoá slide với URL:', imageUrl);
    
            const result = await AdminController.removeSlideImage(imageUrl);
            
            if (result) {
                setSlideImages(prevImages => prevImages.filter((_, i) => i !== index));
            } else {
                console.error('Không thể xoá slide. Hãy thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi xoá slide:', error);
            alert('Failed to remove slide. Please try again.');
        }
    };
    
    return (
        <div className="slide-manager">
            <h2>Manage Slides</h2>
            <ul>
                    {slideImages.map((image, index) => {
                    console.log(`Slide ${index + 1} URL:`, image.url);
                    return (
                        <li key={index} className="slide-item">
                            <img src={image.url} alt={`Slide ${index + 1}`} className="slide-image" />
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
