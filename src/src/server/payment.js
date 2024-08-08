const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require("/home/phuc/Desktop/SE_project/justatea/src/src/config/service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(express.json());

app.post('/payment', async (req, res) => {
  const { amount, userId } = req.body;

  if (!amount || !userId) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Payment amount and user ID are required'
    });
  }

  const accessKey = 'F8BBA842ECF85';
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  const orderInfo = 'pay with MoMo';
  const partnerCode = 'MOMO';
  const redirectUrl = 'http://localhost:3000/payment-success';
  const ipnUrl = 'http://localhost:3001/callback';
  const requestType = 'payWithMethod';
  const orderId = `${partnerCode}-${userId}-${new Date().getTime()}`;
  const requestId = orderId;
  const extraData = `userId=${userId}`;
  const orderGroupId = '';
  const autoCapture = true;
  const lang = 'vi';

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature
  });

  const options = {
    method: 'POST',
    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Server error'
    });
  }
});



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
