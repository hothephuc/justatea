
import React, { useEffect, useState } from 'react';
import { fetchProductByID } from '../server/data-handle';
import product_data from '../components/assets/Data.js'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../components/productdisplay/ProductDisplay.js'
import DescriptionBox from '../components/descriptionbox/DescriptionBox.js'
import CommentSection from '../components/commentsection/CommentSection.js'


const Product = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchProductByID(productID);
        setProduct(fetchedProduct);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
        <ProductDisplay product={product}/>
        {/* <DescriptionBox/> */}
        <CommentSection productID={product.id}/>
    </div>
  );
};

export default Product;
