import React, {useState, useEffect} from 'react'
import './css/Cart.css'
import CartItem from '../components/cartitem/CartItem'
import { checkAuthState} from '../server/auth'
import { fetchUserByID } from '../server/data-handle'

const Cart = () => {
    const[uid,setUID]=useState(null)
    useEffect(() => {
      const getUID = async () => {
        const authState = await checkAuthState();
        if (authState && authState.user) {
          const uid = authState.user.uid;
          setUID(uid);
        }
      };

      getUID();
    }, []);

  return (
    <div>
    {uid?
      (<CartItem uid={uid}/>):
      (<div>Đang tải....</div>)
    }
    </div>
  )
}

export default Cart