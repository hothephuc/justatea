import React, {useState, useEffect} from 'react'
import './css/Cart.css'
import CartItem from '../components/cartitem/CartItem'
import { checkAuthState} from '../server/auth'


const Cart = () => {
    const[uid,setUID]=useState(null)
    const[role, setRole]=useState("Admin")

    useEffect(() => {
      const getUID = async () => {
        const authState = await checkAuthState();
        if (authState && authState.user) {
          const uid = authState.user.uid
          setRole(authState.userData.role)
          console.log(authState.userData.role)
          setUID(uid);
        }
      };

      getUID();
    }, []);

  return (
    <div>
    {uid?
      (role==="Admin"?
      (<div className="admin-cart">
          <h1>Xin lỗi. Hiện tại chính sách của cửa hàng không cho phép quản lý đặt hàng.</h1>
          <img src="https://i.pinimg.com/474x/24/d4/45/24d445fddd1c415bfea68f49a8e739dc.jpg" alt=""/>
          <p>Nếu bạn vẫn muốn hưởng thức những sản phẩm tuyệt vời nhất của JustaTea, vui lòng chuyển sang tài khoản khách.</p>
      </div>):
      (<CartItem uid={uid}/>)
      ):
      (<div>Đang tải....</div>)
    }
    </div>
  )
}

export default Cart;