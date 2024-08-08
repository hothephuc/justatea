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
      style={{ textAlign: 'center', marginTop: '50px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Payment Failed</h1>
        <p>Unfortunately, your payment could not be processed.</p>
        <p>Order ID: <strong>{orderId}</strong></p>
        {userId && <p>User ID: <strong>{userId}</strong></p>}
        <p>Error Message: <strong>{decodeURIComponent(message)}</strong></p>
      </motion.div>
    </motion.div>
  );
};

export default PaymentFailure;
