import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const PaymentPage = () => {
  const location = useLocation();

  useEffect(() => {
    const initiatePayment = async () => {
      const { amount, userId } = queryString.parse(location.search);

      if (!amount || !userId) {
        console.error('Payment amount and user ID are required');
        return;
      }

      try {
        const response = await axios.post('/payment', {
          amount: amount,
          userId: userId, // Include userId in the request body
        });

        if (response.data && response.data.payUrl) {
          window.location.href = response.data.payUrl;
        } else {
          console.error('Error fetching payUrl:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    initiatePayment();
  }, [location.search]);

  return <div>Redirecting to payment...</div>;
};

export default PaymentPage;
