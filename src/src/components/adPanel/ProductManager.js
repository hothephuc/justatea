import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductController from '../../controller/Product.js';
import './css/ProductManager.css'


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
        <div className="table-container">
            <h1>Thực đơn</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="search-field"
                />
                <button onClick={handleSearchSubmit} className="search-submit">
                    Tìm kiếm
                </button>
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
                <button 
                    className='delete-product-button'
                    onClick={handleDeleteProduct}
                    disabled={!selectedProduct}
                >
                    Xóa sản phẩm
                </button>
            </div>
        </div>
    );
};

export default ProductMannager;
