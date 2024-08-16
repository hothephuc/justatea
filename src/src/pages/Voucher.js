import React, { useState, useEffect } from 'react';
import './css/Voucher.css'
import { Link } from 'react-router-dom'
import SideBar from '../components/adPanel/SideBar'
import Checkbox from '../components/checkbox/checkbox'
import VoucherController from '../controller/Voucher';
import AdminController from '../controller/Admin';

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const getVouchers = async () => {
      try {
        const allVouchers = await AdminController.fetchAllVouchers();
        console.log('Fetch:',allVouchers)
        setVouchers(allVouchers);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    };

    getVouchers();
  }, []);

  return (
    <div>
      <div className="grid-container">
        <SideBar />
        <div className="table-container main-container">
          <h1>Danh sách mã giảm giá</h1>
          <div className="voucher-table-container">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>ID</th>
                  <th>Nội dung</th>
                  <th>Ngày hết hạn</th>
                  <th>Mức giảm</th>
                  <th>Đang hoạt động</th>
                  <th>Đã hết hạn</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher, index) => (
                  <tr key={voucher.VoucherID}>
                    <td>{index + 1}</td>
                    <td>{voucher.VoucherID}</td>
                    <td>{voucher.Content}</td>
                    <td>{voucher.DateExpired}</td>
                    <td>{voucher.Discount}%</td>
                    <td><Checkbox checked={voucher.IsActive} /></td>
                    <td><Checkbox checked={voucher.IsExpired} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vouchers
