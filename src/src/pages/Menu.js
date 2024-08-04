// src/pages/Menu.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Item from '../components/item/Item.js';
import './css/Menu.css';
import banner from '../components/assets/banner.jpg';
import menu_category from '../components/assets/Category.js';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../server/data-handle';


const Menu = () => {
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || "";
    setSearchQuery(query.toLowerCase());
  }, [location.search]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts(); // Fetch all products
        const filteredProducts = products.filter(product =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.tag.toLowerCase().includes(searchQuery)
        );
        setProductData(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [searchQuery]); // Fetch products whenever searchQuery changes

  


  // const {productData} = useContext(MenuContext)

  // const handleSearchInputChange = (e) => {
  //   setSearchInput(e.target.value);
  // };

  // const handleSearchSubmit = (searchInput) => {
  //   setSearchQuery(searchInput.toLowerCase());
  // };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const filterByPrice = (item) => {
    if (priceFilter === "all") return true;
    if (priceFilter === "below20") return item.price < 20000;
    if (priceFilter === "20to50") return item.price >= 20000 && item.price <= 50000;
    if (priceFilter === "above50") return item.price > 50000;
    return false; // Ensure all cases are handled
  };

  const filteredProducts = productData.filter(item =>
    (category === "All" || item.tag === category) &&
    filterByPrice(item)
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className='menu'>
      <img className='banner' src={banner} alt="" />
      <h1 className='menu-header'>Thực đơn</h1>
      <div className='filter-sort'>
        <select onChange={handleSortChange} value={sortOrder} className='sort-dropdown'>
          <option value="default">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <select onChange={handlePriceFilterChange} value={priceFilter} className='filter-dropdown'>
          <option value="all">All Prices</option>
          <option value="below20">Dưới 20000</option>
          <option value="20to50">20000 - 50000</option>
          <option value="above50">Trên 50000</option>
        </select>
      </div>
      <div className='category'>
        {menu_category.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.category_name ? "All" : item.category_name)}
            key={index}
            className='category-item'
          >
            <img className={category === item.category_name ? "active" : ""} src={item.category_image} alt="" />
            <p>{item.category_name}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className='menu-items'>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} imageUrl={item.imageUrl} price={item.price} tag={item.tag} />
          ))
        ) : (
          <p>No products found matching your search criteria.</p>
        )}
      </div>
      <Link to='/AddProduct' style={{ textDecoration: 'none' }}>
        <button className='add-product-button'>Thêm sản phẩm</button>
      </Link>
    </div>
  );
}

export default Menu;
