import React, { useContext, useState } from 'react'
import { MenuContext } from '../context/MenuContext.js'
import Item from '../components/item/Item.js'
import './css/Menu.css'
import banner from '../components/assets/banner.jpg'
import menu_category from '../components/assets/Category.js'
import searchIcon from '../components/assets/search-icon.png'; // Assuming you have a search icon
import { Link } from 'react-router-dom'

const Menu = () => {
  const { product_data } = useContext(MenuContext);
  const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.toLowerCase());
  };

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
  };

  // const filteredProducts = product_data.filter(item =>
  //   (category === "All" || item.tag === category) &&
  //   (item.name.toLowerCase().includes(searchQuery) || 
  //    item.description.toLowerCase().includes(searchQuery)) && // assuming each item has a description
  //   filterByPrice(item)
  // );

  const filteredProducts = product_data.filter(item =>
    (category === "All" || item.tag === category) &&
    ((item.name && item.name.toLowerCase().includes(searchQuery)) || 
     (item.tag && item.tag.toLowerCase().includes(searchQuery))) && // assuming each item has a description
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
      <div className='search-icon-wrapper'>
        <img src={searchIcon} alt="Search" className='search-icon' />
        <div className='search-form-wrapper'>
          <form className='search-form' onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearchInputChange}
              className='search-bar'
            />
            <button type="submit" className='search-button'>Search</button>
          </form>
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
        </div>
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
        {sortedProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} tag={item.tag} />
        ))}
      </div>
      <Link to='/AddProduct' style={{ textDecoration: 'none' }}>
        <button className='add-product-button'>Thêm sản phẩm</button>
      </Link>
    </div>
  );
}

export default Menu;
