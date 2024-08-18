import React, { useEffect, useState, useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
import CartController from '../controller/Cart';
import "./css/Checkout.css";
import { getUserDocument } from '../controller/Utils.js';
import { checkAuthState } from '../server/auth.js';
import VoucherController from '../controller/Voucher.js';
import OrderController from '../controller/Order.js';

const Checkout = () => {
    const [uid, setUID] = useState(null);
    const [role, setRole] = useState("Admin");
    const [contact, setContact] = useState({});
    const [cart, setCart] = useState({
        ProductList: [],
        priceList: [],
        quantityList: [],
        sizeList: [],
        toppingList: []
    });
    const [cartProducts, setCartProducts] = useState([]);
    const [useDefault, setUseDefault] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
    const [voucherID, setVoucherID] = useState("");
    const [voucher, setVoucher] = useState({
        Content: "",
        DataExpỉed: "",
        Discount: "",
        IsActive: true,
        IsExpired: false,
        VoucherID: ""
    });
    const [discount, setDiscount] = useState(0);

    const { productData } = useContext(MenuContext);

    useEffect(() => {
        const getContact = async () => {
            const authState = await checkAuthState();
            if (authState && authState.user) {
                const uid = authState.user.uid;
                const contact = await getUserDocument(uid);
                setUID(uid);
                setContact(contact);
                setName(contact.fullname);
                setPhone(contact.phone);
                setMail(contact.email);
                setAddress(contact.address);
            }
        };

        getContact();
    }, []);

    useEffect(() => {
        const getUID = async () => {
            const authState = await checkAuthState();
            if (authState && authState.user) {
                const uid = authState.user.uid;
                setRole(authState.userData.role);
                setUID(uid);
                const cart = await CartController.retrieveCart(uid);
                if (cart) {
                    setCart(cart);
                }
            }
        };

        getUID();
    }, []);

    useEffect(() => {
        if (productData.length > 0 && cart.ProductList.length > 0) {
            const productsInCart = cart.ProductList.map((productId, index) => {
                const product = productData.find(product => product.id === productId);
                if (product) {
                    const { name, imageUrl } = product;
                    return {
                        id: productId,
                        name,
                        imageUrl,
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

    const handleCheckboxChange = () => {
        setUseDefault(!useDefault);
        if (!useDefault) {
            setName(contact.fullname);
            setPhone(contact.phone);
            setAddress(contact.address);
            setMail(contact.email);
        }
    };

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    };

    const getVoucher = async () => {
        const voucher = await VoucherController.fetchVoucherById(voucherID);
        if (voucher) {
            setVoucher(voucher);
            if (!voucher.IsExpired) {
                setDiscount(totalPrice * voucher.Discount / 100);
            } else {
                setDiscount(0);
            }
        } else {
            alert("Voucher không đúng");
        }
    };

    const handleOrder = async () => {
        if (!name || !mail || !phone || !address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng.");
            return;
        }

        const contactInfo = { name, phone, mail, address };
        const totalPrice = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
        const shippingFee = 15000;
        const finalPrice = totalPrice + shippingFee - discount;

        try {
            const orderId = await OrderController.createOrder(uid, cart, paymentMethod, contactInfo, finalPrice);

            if (orderId) {
                console.log("Order ID:", orderId);
                if (paymentMethod === "Momo") {
                    await OrderController.placeOrderMomo(uid, finalPrice, orderId);
                } else if (paymentMethod === "Tiền mặt") {
                    await OrderController.placeOrder(uid, finalPrice, orderId);
                    await CartController.deleteUserCart(uid);
                } else {
                    alert("Đơn hàng của bạn đã được tạo thành công và sẽ được thanh toán bằng tiền mặt!");
                }
            } else {
                console.error("Order ID is undefined.");
                alert("Failed to create order.");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại sau.");
        }
    };

    const totalPrice = cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
    const shippingFee = 15000;
    const finalPrice = totalPrice + shippingFee - discount;

    return (
        <div>
            {uid && role === "Customer" && cartProducts.length > 0 ? (
                <div className='checkout'>
                    {contact && (
                        <div className='delivery-info'>
                            <div className='order-options'>
                                <h1>Thông tin giao hàng</h1>
                                <div className='delivery-field'>
                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={useDefault}
                                            onChange={handleCheckboxChange}
                                        />
                                        Sử dụng thông tin mặc định
                                    </label>
                                </div>
                                <div className='order-field'>
                                    <label>Tên người nhận</label>
                                    <input
                                        type='text'
                                        placeholder='Tên người nhận'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={useDefault}
                                    />
                                </div>
                                <div className='order-field'>
                                    <label>Số điện thoại</label>
                                    <input
                                        type='text'
                                        placeholder='Số điện thoại'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={useDefault}
                                    />
                                </div>
                                <div className='order-field'>
                                    <label>Email</label>
                                    <input
                                        type='text'
                                        placeholder='Email'
                                        value={mail}
                                        onChange={(e) => setMail(e.target.value)}
                                        disabled={useDefault}
                                    />
                                </div>
                                <div className='order-field'>
                                    <label>Địa chỉ</label>
                                    <input
                                        type='text'
                                        placeholder='Địa chỉ'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        disabled={useDefault}
                                    />
                                </div>
                                <div className='order-field'>
                                    <label>Phương thức thanh toán</label>
                                    <select
                                        name="category"
                                        value={paymentMethod}
                                        onChange={handlePaymentMethod}
                                    >
                                        <option value="Tiền mặt">Tiền mặt</option>
                                        <option value="Momo">Ví điện tử momo</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={handleOrder} disabled={!name || !mail || !phone || !address}>Lưu thông tin và thanh toán</button>
                        </div>
                    )}
                    <div className='order-info'>
                        <h1>Tổng số tiền</h1>
                        <div className='order-item-price'>
                            <p>Tổng giá tiền sản phẩm</p>
                            <p>{totalPrice}đ</p>
                        </div>
                        <div className='order-item-price'>
                            <p>Phí giao hàng</p>
                            <p>{shippingFee}đ</p>
                        </div>
                        <div className='order-item-price'>
                            <p>Giảm giá</p>
                            <p>{discount}đ</p>
                        </div>
                        <div className='order-item-price'>
                            <p>Đơn giá</p>
                            <p>{finalPrice}đ</p>
                        </div>
                        <div className='apply-voucher'>
                            <input
                                type='text'
                                placeholder='Mã khuyến mãi'
                                value={voucherID}
                                onChange={(e) => setVoucherID(e.target.value)}
                            />
                            <button onClick={getVoucher} disabled={!voucherID}>Kiểm tra</button>
                            {voucher.IsActive && voucher.IsExpired ? (
                                <p>Mã đã hết hạn</p>
                            ) : (
                                <p style={{ color: 'black' }}>{voucher.Content}</p>
                            )}
                        </div>
                        <hr />
                        {cartProducts.map((product, index) => (
                            <div className='order-item' key={index}>
                                <img src={product.imageUrl} alt="" />
                                <div>
                                    <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{product.name}</p>
                                    <div className='order-item-info'>
                                        <p>{product.size}</p>
                                        <p>x{product.quantity}</p>
                                    </div>
                                    <div className='order-item-info'>
                                        <div>
                                            {product.toppings ? <p>{product.toppings}</p> : <p>Không topping</p>}
                                        </div>
                                        <div>
                                            <p>{product.price * product.quantity}đ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='admin-checkout'>
                    <img src="https://i.pinimg.com/736x/95/2f/03/952f038d5f081be698b2bf8583319516.jpg" alt="" />
                </div>
            )}
        </div>
    );
};

export default Checkout;
