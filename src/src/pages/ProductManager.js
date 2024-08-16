import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductController from '../controller/Product.js';
import searchIcon from '../components/assets/search-icon.png'
import './css/ProductManager.css'
import SideBar from '../components/adPanel/SideBar.js';
import Checkbox from '../components/checkbox/checkbox.js';

const ProductMannager = () => {
    const [productData, setProductData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await ProductController.fetchProducts();
    
                // Sort products alphabetically by name
                const sortedProducts = products.sort((a, b) => {
                    if (a.name && b.name) {
                        return a.name.localeCompare(b.name);
                    }
                    return 0;
                });
    
                console.log(sortedProducts);
    
                // Filter products based on the search query
                const filteredProducts = sortedProducts.filter(product =>
                    product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
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

    return (
        <div className="grid-container">
            <SideBar/>
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
                            <th>STT</th> 
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Thể loại</th>
                            <th>Còn hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((product, index) => (
                            <tr
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className={selectedProduct?.id === product.id ? 'productManage-selected' : ''}
                            >
                                <td>{index + 1}</td> {/* Display product number */}
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.tag}</td>
                                <td><Checkbox checked={product.inStock} /></td>
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
