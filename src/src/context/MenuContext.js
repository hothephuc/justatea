import React, {createContext, useState, useEffect} from 'react'
import { fetchProducts } from '../server/data-handle.js';
import { checkAuthState } from '../server/auth.js';

export const MenuContext = createContext(null);

const MenuContextProvider= (props) => {
    const [productData,setProductData]=useState([]);
    
    useEffect(() => {
        const getProducts = async () => {
          const products = await fetchProducts();
          setProductData(products);
        };
    
        getProducts();
    }, []);

    const contextValue= {productData};

    return (
        <MenuContext.Provider value={contextValue}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider;

