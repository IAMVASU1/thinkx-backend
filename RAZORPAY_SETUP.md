# 💳 Razorpay Payment Gateway Integration

Complete Razorpay payment gateway integration for Alumni Association donation system.

---

## 📋 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Backend Setup](#backend-setup)
5. [API Documentation](#api-documentation)
6. [Frontend Integration (Next.js)](#frontend-integration-nextjs)
7. [Frontend Integration (React Native)](#frontend-integration-react-native)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)

---

## ✨ Features

✅ Secure Razorpay payment integration  
✅ Test mode support for development  
✅ Payment signature verification using crypto  
✅ MongoDB integration for storing donations  
✅ Complete payment flow (create order → verify payment)  
✅ Error handling and validation  
✅ User authentication required  
✅ Admin dashboard statistics  
✅ Payment status tracking (PENDING/SUCCESS/FAILED)  

---

## 🛠 Tech Stack

**Backend:**
- Node.js 18+
- Express.js 5.x
- MongoDB Atlas
- Razorpay SDK
- JWT Authentication
- Crypto (for signature verification)

**Frontend:**
- Next.js 14+ (Web)
- React Native (Mobile)
- Axios/Fetch API

---

## 📁 Folder Structure

```
thinkx-backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── jwt.js             # JWT configuration
│   │   └── razorpay.js        # Razorpay instance ✨
│   ├── controllers/
│   │   ├── donation.controller.js  # Donation CRUD
│   │   └── payment.controller.js   # Payment logic ✨
│   ├── models/
│   │   └── Donation.model.js       # Enhanced with Razorpay fields ✨
│   ├── routes/
│   │   ├── donation.routes.js      # Donation endpoints
│   │   └── payment.routes.js       # Payment endpoints ✨
│   ├── services/
│   │   └── payment.service.js      # Razorpay utilities ✨
│   ├── middlewares/
│   │   ├── auth.middleware.js      # JWT verification
│   │   └── error.middleware.js     # Error handling
│   ├── app.js                      # Express app
│   └── server.js                   # Server entry point
├── .env                            # Environment variables (create this)
├── .env.example                    # Example environment file ✨
├── package.json
└── RAZORPAY_SETUP.md              # This file ✨
```

---

## 🚀 Backend Setup

### Step 1: Install Dependencies

```bash
npm install razorpay
```

All code files have been created automatically! ✅

### Step 2: Get Razorpay Credentials

1. Sign up at [https://razorpay.com](https://razorpay.com)
2. Go to Dashboard → Settings → API Keys
3. Generate **Test Mode** keys
4. Copy `Key ID` and `Key Secret`

### Step 3: Configure Environment Variables

Create `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the following variables:

```env
# Razorpay Test Credentials
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here

# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni_db

# JWT
JWT_SECRET=your_jwt_secret_key

# Server
PORT=5000
```

### Step 4: Start the Server

```bash
npm run dev
# or
npm start
```

Server should start at `http://localhost:5000` 🚀

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/payment
```

### Authentication
All endpoints (except `/key`) require JWT token in headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### 1️⃣ Get Razorpay Key (Public)

**GET** `/api/payment/key`

**Response:**
```json
{
  "success": true,
  "key": "rzp_test_xxxxxxxxxxxxxx"
}
```

---

### 2️⃣ Create Order

**POST** `/api/payment/create-order`

**Request Body:**
```json
{
  "amount": 1000,
  "purpose": "Annual Fund 2024"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "orderId": "order_xxxxxxxxxxxxxx",
    "amount": 100000,
    "currency": "INR",
    "donationId": "65f123abc456def789012345"
  },
  "message": "Order created successfully"
}
```

---

### 3️⃣ Verify Payment

**POST** `/api/payment/verify`

**Request Body:**
```json
{
  "razorpay_order_id": "order_xxxxxxxxxxxxxx",
  "razorpay_payment_id": "pay_xxxxxxxxxxxxxx",
  "razorpay_signature": "signature_hash_here",
  "donationId": "65f123abc456def789012345"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "donation": {
    "_id": "65f123abc456def789012345",
    "donor": {
      "_id": "65f...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "amount": 1000,
    "purpose": "Annual Fund 2024",
    "razorpayOrderId": "order_xxx",
    "razorpayPaymentId": "pay_xxx",
    "paymentStatus": "SUCCESS",
    "createdAt": "2024-02-07T10:30:00.000Z"
  }
}
```

---

### 4️⃣ Get My Donations

**GET** `/api/donations/my-donations`

**Response:**
```json
{
  "success": true,
  "count": 5,
  "totalDonated": 5000,
  "donations": [...]
}
```

---

### 5️⃣ Get Donation Stats (Admin)

**GET** `/api/donations/stats`

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalDonations": 150,
    "totalAmount": 500000,
    "statusBreakdown": [
      { "_id": "SUCCESS", "count": 145, "total": 495000 },
      { "_id": "PENDING", "count": 3, "total": 3000 },
      { "_id": "FAILED", "count": 2, "total": 2000 }
    ]
  }
}
```

---

## 🌐 Frontend Integration (Next.js)

### Install Dependencies

```bash
npm install axios
```

### Create Donation Component

```jsx
'use client';

import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function DonateButton() {
  const [amount, setAmount] = useState(1000);
  const [purpose, setPurpose] = useState('Annual Fund 2024');
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    try {
      setLoading(true);

      // Get auth token from localStorage/cookies
      const token = localStorage.getItem('authToken');

      // 1. Get Razorpay Key
      const { data: keyData } = await axios.get(`${API_BASE_URL}/payment/key`);
      const razorpayKey = keyData.key;

      // 2. Create Order
      const { data: orderData } = await axios.post(
        `${API_BASE_URL}/payment/create-order`,
        { amount, purpose },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, amount: orderAmount, donationId } = orderData.order;

      // 3. Initialize Razorpay Checkout
      const options = {
        key: razorpayKey,
        amount: orderAmount,
        currency: 'INR',
        name: 'Alumni Association',
        description: purpose,
        order_id: orderId,
        handler: async function (response) {
          // 4. Verify Payment
          try {
            const verifyResponse = await axios.post(
              `${API_BASE_URL}/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donationId: donationId
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verifyResponse.data.success) {
              alert('✅ Donation Successful! Thank you!');
              // Redirect or refresh donations list
            }
          } catch (error) {
            alert('❌ Payment verification failed!');
            console.error(error);
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on('payment.failed', function (response) {
        alert('❌ Payment Failed!');
        console.error(response.error);
      });

    } catch (error) {
      console.error('Error:', error);
      alert('❌ Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border rounded"
          min="1"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Purpose</label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : `Donate ₹${amount}`}
      </button>
    </div>
  );
}
```

### Add Razorpay Script to Layout

In your `app/layout.js` or `pages/_document.js`:

```jsx
<Script src="https://checkout.razorpay.com/v1/checkout.js" />
```

---

## 📱 Frontend Integration (React Native)

### Install Dependencies

```bash
npm install react-native-razorpay axios
```

### iOS Setup (if using iOS)

```bash
cd ios && pod install && cd ..
```

### Create Donation Component

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function DonateScreen({ navigation }) {
  const [amount, setAmount] = useState('1000');
  const [purpose, setPurpose] = useState('Annual Fund 2024');
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    try {
      setLoading(true);

      // Get auth token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');

      // 1. Get Razorpay Key
      const keyResponse = await axios.get(`${API_BASE_URL}/payment/key`);
      const razorpayKey = keyResponse.data.key;

      // 2. Create Order
      const orderResponse = await axios.post(
        `${API_BASE_URL}/payment/create-order`,
        { amount: Number(amount), purpose },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, amount: orderAmount, donationId } = orderResponse.data.order;

      // 3. Open Razorpay Checkout
      const options = {
        description: purpose,
        image: 'https://your-logo-url.com/logo.png',
        currency: 'INR',
        key: razorpayKey,
        amount: orderAmount,
        name: 'Alumni Association',
        order_id: orderId,
        prefill: {
          email: 'john@example.com',
          contact: '9999999999',
          name: 'John Doe'
        },
        theme: { color: '#3399cc' }
      };

      RazorpayCheckout.open(options)
        .then(async (data) => {
          // 4. Verify Payment
          const verifyResponse = await axios.post(
            `${API_BASE_URL}/payment/verify`,
            {
              razorpay_order_id: data.razorpay_order_id,
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_signature: data.razorpay_signature,
              donationId: donationId
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (verifyResponse.data.success) {
            Alert.alert('Success', '✅ Donation Successful! Thank you!');
            navigation.goBack();
          }
        })
        .catch((error) => {
          Alert.alert('Error', `Payment Failed: ${error.description}`);
        });

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make a Donation</Text>

      <Text style={styles.label}>Amount (₹)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Purpose</Text>
      <TextInput
        style={styles.input}
        value={purpose}
        onChangeText={setPurpose}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleDonate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : `Donate ₹${amount}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: '#3399cc',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#ccc'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
```

---

## 🧪 Testing

### Test Cards (Razorpay Test Mode)

| Card Number          | CVV | Expiry    | Result  |
|---------------------|-----|-----------|---------|
| 4111 1111 1111 1111 | Any | Any Future| Success |
| 5555 5555 5555 4444 | Any | Any Future| Success |
| 4000 0000 0000 0002 | Any | Any Future| Failed  |

### Test UPI ID
```
success@razorpay
```

### Test Wallet
- Use any test credentials provided by Razorpay

### Testing Flow

1. **Test Order Creation:**
```bash
curl -X POST http://localhost:5000/api/payment/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"amount": 100, "purpose": "Test Donation"}'
```

2. **Test Payment Verification:**
- Use Razorpay Checkout UI with test cards
- Payment signature will be generated automatically
- Verification endpoint will validate the signature

3. **Check Database:**
- Verify donation record is created with status = 'PENDING'
- After successful payment, status should update to 'SUCCESS'

---

## 🐛 Troubleshooting

### Issue: "Razorpay is not defined"
**Solution:** Make sure Razorpay script is loaded:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Issue: "Payment verification failed"
**Solution:** 
- Check if `RAZORPAY_KEY_SECRET` is correctly set in `.env`
- Verify the signature generation logic matches Razorpay's algorithm

### Issue: "Order creation failed"
**Solution:**
- Ensure MongoDB is connected
- Check if user is authenticated (JWT token is valid)
- Verify Razorpay credentials are correct

### Issue: CORS Error
**Solution:** 
- Add frontend URL to CORS configuration in `app.js`
- Ensure `credentials: true` is set in CORS options

### Issue: "Module not found: razorpay"
**Solution:**
```bash
npm install razorpay
```

---

## 🔐 Security Best Practices

✅ **Never expose Key Secret to frontend** - Keep it in backend only  
✅ **Always verify payment signature** - Don't trust frontend data  
✅ **Use HTTPS in production** - Encrypt all communications  
✅ **Implement rate limiting** - Prevent abuse  
✅ **Log all transactions** - For audit purposes  
✅ **Use environment variables** - Never commit secrets to Git  
✅ **Validate all inputs** - Prevent injection attacks  

---

## 📝 Production Checklist

Before going live:

- [ ] Switch to Razorpay **Live Mode** keys
- [ ] Update `NODE_ENV=production` in `.env`
- [ ] Enable HTTPS on your backend
- [ ] Add rate limiting middleware
- [ ] Set up MongoDB backups
- [ ] Configure error monitoring (Sentry, etc.)
- [ ] Test with real payment (small amount)
- [ ] Update CORS to allow only your frontend domains
- [ ] Add webhook handling for payment updates
- [ ] Implement email notifications for donations

---

## 📞 Support

- **Razorpay Docs:** https://razorpay.com/docs/
- **Razorpay Dashboard:** https://dashboard.razorpay.com/
- **Support Email:** support@razorpay.com

---

## 📄 License

MIT License - Feel free to use this integration in your projects!

---

**Made with ❤️ for Alumni Association Platform**
