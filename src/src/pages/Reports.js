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
        order?.orderID?.toString().includes(searchQuery.toLowerCase())
    );
    const timestampToDate = (timestamp) => new Date(timestamp);

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
    };
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
        return date.toLocaleDateString(); // Adjust format as needed
      };
    
    return (
        <div className="grid-container">
            <SideBar/>
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
                            <th>STT</th>
                            <th>OrderID</th>
                            <th>Ngày tạo đơn</th>
                            <th>Ngày giao</th>
                            <th>Tên người nhận</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Mã thanh toán</th>
                            <th>Tổng giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr
                                key={order?.orderID ?? Math.random()} 
                                onClick={() => handleOrderClick(order)}
                                className={selectedOrder?.orderID === order?.orderID ? 'selected' : ''}
                            >
                                <td>{index + 1}</td> 
                                <td>{order?.orderID ?? 'N/A'}</td>
                                <td>{formatTimestamp(order?.dateCreated)}</td>
                                <td>{order?.dateshipped ? formatTimestamp(order.dateshipped) : 'N/A'}</td>
                                <td>{order?.contactInfo?.name || 'N/A'}</td>
                                <td>{order?.contactInfo?.phone || 'N/A'}</td>
                                <td>{order?.contactInfo?.address || 'N/A'}</td>
                                <td>{order?.paymentInfo.paymentDocId ?? 'N/A'}</td>
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
