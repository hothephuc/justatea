import './css/History.css'
import React, {useEffect, useState, useContext} from 'react'
import { MenuContext } from '../context/MenuContext';
import { getUserDocument} from '../controller/Utils.js'
import { checkAuthState } from '../server/auth.js';
import OrderController from '../controller/Order';

const History = () => {
    const[uid,setUID]=useState(null)
    const[role, setRole]=useState("Admin")
    const[order, setOrder]=useState([])
    const[orderProducts,setOrderProducts]=useState([])
    const {productData} =useContext(MenuContext)
    const [visibleDivs, setVisibleDivs] = useState([])



    useEffect(() => {
        const getUID = async () => {
            const authState = await checkAuthState();
            if (authState && authState.user) {
                const uid = authState.user.uid
                setRole(authState.userData.role)
                setUID(uid);
                const order = await OrderController.getUserOrders(uid)
                if (order){
                    setOrder(order);
                    setVisibleDivs(order.map(() => false))
                }
            }
        };
        getUID();
    }, []);

    const getProductById = (productId) => {
        const product = productData.find(product => product.id === productId);
        return product ? { name: product.name, imageUrl: product.imageUrl } : null;
    };

    useEffect(() => {
        if (productData.length > 0 && order.length > 0) {
            const updatedOrders = order.map(order => {
                const updatedOrderList = order.orderList.map(orderItem => {
                    const product = getProductById(orderItem.ProductID);
                    if (product) {
                        return {
                            ...orderItem,
                            name: product.name,
                            imageUrl: product.imageUrl,
                        };
                    }
                    return orderItem;
                });
    
                return {
                    ...order,
                    orderList: updatedOrderList,
                };
            });
    
            setOrderProducts(updatedOrders);
        }
    }, [productData, order]);

    console.log(orderProducts)

    // Hàm để toggle trạng thái của div tại index cụ thể
    const toggleVisibility = (index) => {
        const updatedVisibility = visibleDivs.map((isVisible, i) =>
            i === index ? !isVisible : isVisible
        );
        setVisibleDivs(updatedVisibility);
    };

    
  return (
    <div className='history'>
        <h1>Lịch sử đơn hàng</h1>
        <div className='history-headers'>
            <p>Mã đơn hàng</p>
            <p>Trạng thái</p>
            <p>Ngày đặt</p>
            <p>Ngày giao</p>
            <p>Đơn giá</p>
            <p>Xem</p>
        </div>
        <hr/>
        {orderProducts.map((order,index)=>(
            <div className='history-orders'>
                <div className='history-orders-info history-headers'>
                    <p style={{fontWeight: 600}}>{order.orderID}</p>
                    {order.orderStatus==='Pending'?(<p>Đang xử lý</p>):(<></>)}
                    {order.orderStatus==='Shipping'?(<p>Đang giao</p>):(<></>)}
                    {order.orderStatus==='Paid'?(<p>Đã thanh toán</p>):(<></>)}
                    {order.orderStatus==='Delivered'?(<p style={{color: 'green'}}>Hoàn tất</p>):(<></>)}
                    <p>{order.dateCreated.toString()}</p>
                    {order.dateshipped?
                    (<p>{order.dateshipped.toString()}</p>):(<p>Chưa có</p>)
                    }
                    <p>{order.totalPrice}</p>
                    <div onClick={() => toggleVisibility(index)}>
                    <img src={visibleDivs[index]? "https://www.svgrepo.com/show/93813/up-arrow.svg":
                    "https://cdn-icons-png.flaticon.com/256/54/54785.png"
                    }
                    alt=""/>
                    </div>
                    {/* <button onClick={() => toggleVisibility(index)}>Nhấn</button> */}
                </div> 
                {visibleDivs[index] && (
                <div className='history-orders-item-list'>
                    {order.orderList.map((item,index)=>(
                    <div className='history-orders-item'>
                        <img src={item.imageUrl} alt=""/>
                        <div className='history-orders-item-info'>
                        <p style={{fontWeight: 600, marginBottom: '5px'}}>{item.name}</p>
                        <p style={{fontSize: '14px'}}>{item.Size}</p>
                        <p style={{fontSize: '14px'}}>x{item.Quantity}</p>
                        {item.Toppings?
                            (<p style={{fontSize: '14px'}}>{item.Toppings}</p>):(<p style={{fontSize: '14px'}}>Không topping</p>)
                        }
                        </div>
                    </div>
                    ))}
                </div>)}
                <hr/>
            </div>
        ))}
    </div>
  )
}

export default History