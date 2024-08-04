import React, { useState } from 'react';
import '../pages/css/PaymentPage.css';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAmountChange = (e) => setAmount(e.target.value);

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (data.success) {
        const payment = data.payment;
        // Redirect to PayPal payment page
        window.location.href = payment.links.find(link => link.rel === 'approval_url').href;
      } else {
        setError(data.message || 'Payment creation failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="payment-form">
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min="1"
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with PayPal'}
        </button>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentPage;
