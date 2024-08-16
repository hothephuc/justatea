import React, { useEffect, useState } from 'react';
import AdminController from '../controller/Admin';
import { Link } from 'react-router-dom';
import SideBar from '../components/adPanel/SideBar';
import searchIcon from '../components/assets/search-icon.png';


function Reports (){
    const [orderData, setOrderData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch the orders when the component mounts
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const fetchedOrders = await AdminController.fetchAllOrders();
                setOrderData(fetchedOrders);
            } catch (error) {
                console.error('Error loading orders:', error);
            }
        };
        loadOrders();
    }, []);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredOrders = orderData.filter(order =>
        order?.orderId?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="grid-container">
            <SideBar openSidebarToggle={true} OpenSidebar={() => {}} /> {/* Add the sidebar */}
            <div className="table-container main-container">
                <h1>Quản lý Đơn Hàng</h1>
                <div className="search-container">
                    <form className="search-input-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo Order ID..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="search-field"
                        />
                        <button type="submit" className="search-submit">
                            <img src={searchIcon} alt="Search Icon" />
                            Tìm kiếm
                        </button>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>OrderID</th>
                            <th>DateCreated</th>
                            <th>DateShipped</th>
                            <th>Customer</th>
                            <th>PhoneNumber</th>
                            <th>Address</th>
                            <th>Payment</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr
                                key={order?.orderId ?? Math.random()} 
                                onClick={() => handleOrderClick(order)}
                                className={selectedOrder?.orderId === order?.orderId ? 'selected' : ''}
                            >
                                <td>{index + 1}</td> 
                                <td>{order?.orderId ?? 'N/A'}</td>
                                <td>{order?.dateCreated ?? 'N/A'}</td>
                                <td>{order?.dateshipped ?? 'N/A'}</td>
                                <td>{order?.contactInfo?.name ?? 'N/A'}</td>
                                <td>{order?.contactInfo?.phone ?? 'N/A'}</td>
                                <td>{order?.contactInfo?.address ?? 'N/A'}</td>
                                <td>{order?.paymentInfo ?? 'N/A'}</td>
                                <td>{order?.totalPrice ?? 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Reports
