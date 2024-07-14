import React from 'react'
import product_data from '../components/assets/Data.js'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../components/productdisplay/ProductDisplay.js'

const Product = () => {
  const {productID} = useParams();
  const product = product_data.find((e)=>e.id===Number(productID));
  return (
    <div>
        <ProductDisplay product={product}/>
    </div>
  )
}

export default Product