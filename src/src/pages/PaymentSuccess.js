import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, collection, addDoc } from '../firebase';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get('orderId');
    const amount = query.get('amount');
    const transId = query.get('transId');
    const message = query.get('message');
    const resultCode = query.get('resultCode');

    const status = {
      orderId,
      amount,
      transId,
      message,
      resultCode: parseInt(resultCode, 10)
    };
    setPaymentStatus(status);

    const handlePaymentStatus = async () => {
      try {
        await addDoc(collection(db, 'payments'), status);
        if (status.resultCode !== 0) {
          navigate('/payment-fail', { state: { status } });
        }
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };

    handlePaymentStatus();
  }, [location.search, navigate]);

  if (!paymentStatus) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center', marginTop: '50px' }}
    >
      {paymentStatus.resultCode === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Payment Successful!</h1>
          <p>Order ID: <strong>{paymentStatus.orderId}</strong></p>
          <p>Amount: <strong>{paymentStatus.amount}</strong></p>
          <p>Transaction ID: <strong>{paymentStatus.transId}</strong></p>
          <p>Message: <strong>{paymentStatus.message}</strong></p>
        </motion.div>
      ) : (
        <h1>Payment Failed: {paymentStatus.message}</h1>
      )}
    </motion.div>
  );
};

export default PaymentSuccess;
