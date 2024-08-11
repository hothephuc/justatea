import React, { useEffect, useState } from 'react';
import AdminController from '../../controller/Admin';
import './css/CustomerList.css';
import SideBar from './SideBar';
import searchIcon from '../assets/search-icon.png'; 

function CustomerList() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await AdminController.getAllUsers();
                const sortedUsers = usersList.sort((a, b) => {
                    if (a.role === 'Admin' && b.role !== 'Admin') return -1;
                    if (a.role !== 'Admin' && b.role === 'Admin') return 1;
                    return 0;
                });
                setUsers(sortedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            if (newRole === 'Admin') {
                await AdminController.setAdmin(userId);
            } else if (newRole === 'Customer') {
                await AdminController.setCustomer(userId);
            }
            window.location.reload();
        } catch (error) {
            console.error('Error changing user role:', error);
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredUsers = users.filter((user) =>
        user.fullname.toLowerCase().includes(searchQuery) ||
        user.phone.toLowerCase().includes(searchQuery) ||
        user.address.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="grid-container">
            <SideBar />
            <div className="main-container">
                <h1>Danh sách người sử dụng</h1>
                <div className="search-container">
                    <form className="search-input-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input-field"
                        />
                        <button type="submit" className="search-submit-button">
                            <img src={searchIcon} alt="Search Icon" />
                            Search
                        </button>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Vai trò</th>
                            <th>Ngày sinh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr
                                key={user.id}
                                onClick={() => handleUserClick(user)}
                                className={selectedUser?.id === user.id ? 'selected' : ''}
                            >
                                <td>{user.fullname}</td>
                                <td>{user.gender}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>{user.dob}</td>
                                <td>
                                    {selectedUser?.id === user.id && (
                                        <div className="role-change-buttons">
                                            {user.role === 'Admin' ? (
                                                <button onClick={() => handleRoleChange(user.id, 'Customer')}>
                                                    Change to Customer
                                                </button>
                                            ) : (
                                                <button onClick={() => handleRoleChange(user.id, 'Admin')}>
                                                    Change to Admin
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default CustomerList;
