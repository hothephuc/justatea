import React, { useContext, useState, useEffect } from 'react';
import './CartItem.css';
import { MenuContext } from '../../context/MenuContext';
import CartController from '../../controller/Cart';
import OrderController from '../../controller/Order';
import { Link } from 'react-router-dom';

const CartItem = ({ uid }) => { 
    const { productData } = useContext(MenuContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [cart, setCart] = useState({
        ProductList: [],
        priceList: [],
        quantityList: [],
        sizeList: [],
        toppingList: []
    });
    const [paymentInfo, setPaymentInfo] = useState({}); 
    const [contactInfo, setContactInfo] = useState({}); 

    useEffect(() => {
        const getCart = async () => {
            const cartData = await CartController.retrieveCart(uid);
            setCart(cartData);
        };

        getCart();
    }, [uid]);

    const getProductById = (productId) => {
        const product = productData.find(product => product.id === productId);
        return product ? { name: product.name, imageUrl: product.imageUrl } : null;
    };

    useEffect(() => {
        if (productData.length > 0 && cart.ProductList.length > 0) {
            const productsInCart = cart.ProductList.map((productId, index) => {
                const product = getProductById(productId);
                if (product) {
                    return {
                        id: productId,
                        name: product.name,
                        imageUrl: product.imageUrl,
                        price: cart.priceList[index],
                        quantity: cart.quantityList[index],
                        size: cart.sizeList[index],
                        toppings: cart.toppingList[index]
                    };
                }
                return null;
            }).filter(product => product !== null);

            setCartProducts(productsInCart);
        }
    }, [productData, cart]);

    const handleQuantityChange = async (index, action) => {
        const updatedCartProducts = [...cartProducts];
        const newQuantity = action === "increase" 
            ? updatedCartProducts[index].quantity + 1 
            : updatedCartProducts[index].quantity - 1;

        if (newQuantity > 0) {
            updatedCartProducts[index].quantity = newQuantity;
            setCartProducts(updatedCartProducts);

            // Update the quantity in the database
            await CartController.modifyItemQuantity(uid, updatedCartProducts[index].id, newQuantity);
        }
    };

    const handleRemoveItem = async (index) => {
        const updatedCartProducts = cartProducts.filter((_, i) => i !== index);
        setCartProducts(updatedCartProducts);

        // Remove the item from the database
        await CartController.removeItemFromCart(uid, cart.ProductList[index]);


        const updatedCart = {
            ProductList: cart.ProductList.filter((_, i) => i !== index),
            priceList: cart.priceList.filter((_, i) => i !== index),
            quantityList: cart.quantityList.filter((_, i) => i !== index),
            sizeList: cart.sizeList.filter((_, i) => i !== index),
            toppingList: cart.toppingList.filter((_, i) => i !== index)
        };

        setCart(updatedCart);
    };

    const totalPrice = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
    const shippingFee = 15000;
    const finalPrice = totalPrice + shippingFee;

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    const handleCreateOrder = async () => { // Hàm này chỉ tạo order và redirect tới trang show order thôi. Còn bước placeOrder gọi ở đây để test payment
        try {
            await OrderController.createOrder(uid, cart, paymentInfo, contactInfo, finalPrice);
            const orders = await OrderController.getUserOrders(uid);
            const newOrder = orders[orders.length - 1];

            if (newOrder) {
                await OrderController.placeOrder(uid, finalPrice, newOrder.orderID);
            } else {
                alert("Order not found.");
            }

            alert("Order created successfully!");
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to create order.");
        }
    };

    return (
        <div className='cart-items'>
            <div className='cart-item-up'>
                <div className='cart-items-header'>
                    <p>Sản phẩm</p>
                    <p>Tên sản phẩm</p>
                    <p>Kích cỡ</p>
                    <p>Topping</p>
                    <p>Giá</p>
                    <p>Số lượng</p>
                    <p>Tổng cộng</p>
                    <p>Tùy chỉnh</p>
                </div>
                <hr />
                <div>
                    {cartProducts.map((product, index) => (
                        <div className='cart-items-item cart-items-header' key={product.id}>
                            <div className='cart-item-icon'>
                                <img src={product.imageUrl} alt={product.name} />
                            </div>
                            <p>{product.name}</p>
                            <p>{product.size}</p>
                            <div>
                                {product.toppings ? (<p>{product.toppings}</p>) : (<p>Không</p>)}
                            </div>
                            <p>{product.price}đ</p>
                            <button className='cart-item-quanity'>{product.quantity}</button>
                            <p>{product.price * product.quantity}đ</p>
                            <div>
                                <button className='change-button' onClick={() => handleQuantityChange(index, "increase")}>+</button>
                                <button className='change-button' onClick={() => handleQuantityChange(index, "decrease")}>-</button>
                                <button className='change-button' onClick={() => handleRemoveItem(index)}>x</button>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
            </div>
            <div className='cart-items-down'>
                <img src="https://i.pinimg.com/originals/b7/d5/99/b7d599e139a3eda7d5490245a136cb04.jpg" alt="Promotional" />
                <div className='cart-items-total'>
                    <h2>Tổng giá tiền</h2>
                    <div className='cart-items-total-price'>
                        <p>Tổng giá tiền sản phẩm</p>
                        <p>{totalPrice}đ</p>
                    </div>
                    <div className='cart-items-total-price'>
                        <p>Phí giao hàng</p>
                        <p>{shippingFee}đ</p>
                    </div>
                    <div className='cart-items-total-price'>
                        <p>Đơn giá</p>
                        <p>{finalPrice}đ</p>
                    </div>
                    <Link to='/Checkout' style={{ textDecoration: 'none' }} onClick={handleClick}>
                    <button>Đi đến mục thanh toán</button>
                    </Link>
                </div>
            </div>
    </div>
    );
};

export default CartItem;
