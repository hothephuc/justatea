import React, {createContext} from 'react'
import product_data from '../components/assets/Data.js'

export const MenuContext = createContext(null);

const MenuContextProvider= (props) => {
    const contextValue= {product_data};

    return (
        <MenuContext.Provider value={contextValue}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider;

