import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db, collection, addDoc } from '../firebase';
import { motion } from 'framer-motion';

const PaymentFailure = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');
    const message = queryParams.get('message');
    const userId = queryParams.get('extraData') ? queryParams.get('extraData').split('=')[1] : null;

    const status = {
      orderId,
      message,
      userId,
      resultCode: -1
    };

    const handlePaymentFailure = async () => {
      try {
        await addDoc(collection(db, 'payments'), status);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };

    handlePaymentFailure();
  }, [location.search]);

  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  const message = queryParams.get('message');
  const userId = queryParams.get('extraData') ? queryParams.get('extraData').split('=')[1] : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{color: '#5d7a55'}}>Thanh toán thất bại</h1>
        <p style={{color: '#5d7a55'}}>Thật không may, đã có lỗi trong quá trình xử lý thanh toán.</p>
        <p style={{color: '#5d7a55'}}>Mã đơn hàng: <strong>{orderId}</strong></p>
        {userId && <p>ID người dùng: <strong>{userId}</strong></p>}
        <p style={{color: '#5d7a55'}}>Lỗi: <strong>{decodeURIComponent(message)}</strong></p>
        <img src="https://i.pinimg.com/564x/8c/00/d9/8c00d9c7c7c870f6f074c37968ec05cd.jpg" alt="Payment Failure" />
      </motion.div>
    </motion.div>
  );
};

export default PaymentFailure;
