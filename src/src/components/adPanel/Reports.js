import React, { useEffect, useState } from 'react';
import AdminController from '../../controller/Admin';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import searchIcon from '../assets/search-icon.png'


const sampleOrders = [
    {
        OrderId: '001',
        dateCreated: '2024-08-01',
        dateShipped: '2024-08-03',
        peopleName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
        address: '123 Elm Street'
    },
    {
        OrderId: '002',
        dateCreated: '2024-08-02',
        dateShipped: '2024-08-05',
        peopleName: 'Jane Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '234-567-8901',
        address: '456 Oak Avenue'
    },
    {
        OrderId: '003',
        dateCreated: '2024-08-03',
        dateShipped: '2024-08-06',
        peopleName: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        phoneNumber: '345-678-9012',
        address: '789 Pine Road'
    },
    {
        OrderId: '004',
        dateCreated: '2024-08-04',
        dateShipped: '2024-08-07',
        peopleName: 'Alice Brown',
        email: 'alice.brown@example.com',
        phoneNumber: '456-789-0123',
        address: '101 Maple Drive'
    },
    {
        OrderId: '005',
        dateCreated: '2024-08-05',
        dateShipped: '2024-08-08',
        peopleName: 'Charlie Green',
        email: 'charlie.green@example.com',
        phoneNumber: '567-890-1234',
        address: '202 Birch Boulevard'
    },
    {
        OrderId: '006',
        dateCreated: '2024-08-06',
        dateShipped: '2024-08-09',
        peopleName: 'Diana White',
        email: 'diana.white@example.com',
        phoneNumber: '678-901-2345',
        address: '303 Cedar Street'
    },
    {
        OrderId: '007',
        dateCreated: '2024-08-07',
        dateShipped: '2024-08-10',
        peopleName: 'Evan Black',
        email: 'evan.black@example.com',
        phoneNumber: '789-012-3456',
        address: '404 Spruce Lane'
    }
];

function Reports (){
    const [orderData, setOrderData] = useState(sampleOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredOrders = orderData.filter(order =>
        order.OrderId.toLowerCase().includes(searchQuery.toLowerCase())
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
                            <th>Order ID</th>
                            <th>Date Created</th>
                            <th>Date Shipped</th>
                            <th>People Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr
                                key={order.OrderId}
                                onClick={() => handleOrderClick(order)}
                                className={selectedOrder?.OrderId === order.OrderId ? 'selected' : ''}
                            >
                                <td>{order.OrderId}</td>
                                <td>{order.dateCreated}</td>
                                <td>{order.dateShipped}</td>
                                <td>{order.peopleName}</td>
                                <td>{order.email}</td>
                                <td>{order.phoneNumber}</td>
                                <td>{order.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports
