import React, { useEffect, useState } from 'react';
import AdminController from '../controller/Admin';
import './css/CustomerList.css';
import SideBar from '../components/adPanel/SideBar';
import searchIcon from '../components/assets/search-icon.png'

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
            // Update the role locally
            setUsers(users.map(user => 
                user.id === userId ? { ...user, role: newRole } : user
            ));
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

    const filteredUsers = users.filter(user =>
        user.fullname.toLowerCase().includes(searchQuery) ||
        user.phone.toLowerCase().includes(searchQuery) ||
        user.address.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="grid-container">
            <SideBar />
            <div className="table-container main-container">
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
                            <th>Admin</th>
                            <th>Ngày sinh</th>
                            <th>Thay đổi quyền</th> {/* New column for button */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr
                                key={user.id}
                                onClick={() => handleUserClick(user)}
                                className={selectedUser?.id === user.id ? 'customer-selected' : ''}
                            >
                                <td>{user.fullname}</td>
                                <td>{user.gender}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>{user.dob}</td>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering row click
                                            const newRole = user.role === 'Admin' ? 'Customer' : 'Admin';
                                            handleRoleChange(user.id, newRole);
                                        }}
                                        className="role-change-button"
                                    >
                                        {user.role === 'Admin' ? 'Thay đổi' : 'Thay đổi'}
                                    </button>
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