import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductController from '../../controller/Product.js';
import searchIcon from '../assets/search-icon.png'
import './css/ProductManager.css'
import SideBar from './SideBar.js';


const ProductMannager = () => {
    const [productData, setProductData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await ProductController.fetchProducts();
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setProductData(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = () => {
        // The useEffect hook will handle the search when the searchQuery state changes
    };

    const handleDeleteProduct = async () => {
        if (selectedProduct) {
            try {
                await ProductController.deleteProduct(selectedProduct.id);
                setProductData(prevData => prevData.filter(product => product.id !== selectedProduct.id));
                setSelectedProduct(null);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    return (
        <div className="grid-container">
            <SideBar openSidebarToggle={true} OpenSidebar={() => {}} /> {/* Add the sidebar */}
            <div className="table-container main-container">
                <h1>Thực đơn</h1>
                <div className="search-container">
                <form className="search-input-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="search-field"
                    />
                    <button type="submit" className="search-submit">
                        <img src={searchIcon} alt="Search Icon" />
                        Tìm kiếm
                    </button>
                </form>
            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Thể loại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map(product => (
                            <tr
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className={selectedProduct?.id === product.id ? 'selected' : ''}
                            >
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.tag}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="button-group">
                    <Link to='/AddProduct' style={{ textDecoration: 'none' }}>
                        <button className='add-product-button'>Thêm sản phẩm</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductMannager;
