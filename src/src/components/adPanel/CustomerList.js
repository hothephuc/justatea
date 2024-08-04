import {React,useState,useEffect} from 'react'
import { fetchUsers } from '../../server/data-handle';
import noavatar from "../assets/noavatar.png";

const CustomerList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersList = await fetchUsers();
                setUsers(usersList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUsers();
    }, []);

    return (
        <div className="container">
            <h2>Users Information</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <img
                                    src={user.imageUrl || noavatar}
                                    alt={user.fullname}
                                    className="circular-image"
                                />
                            </td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerList
