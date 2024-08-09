import React, { useEffect, useState } from 'react';
import AdminController from '../../controller/Admin';
import './css/CustomerList.css'

function CustomerList() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

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
            // Reload the page to reflect the role changes
            window.location.reload();
        } catch (error) {
            console.error('Error changing user role:', error);
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="table-container">
            <h1>Danh sách người sử dụng</h1>
            <table>
                <thead>
                    <tr>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Vai trò</th>
                        <th>Ngày sinh</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
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
                                                Change to admin
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
    );
};


export default CustomerList;