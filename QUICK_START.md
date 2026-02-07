# 🚀 Quick Start Guide - Razorpay Integration

## ✅ What's Been Done

The complete Razorpay payment gateway integration has been implemented for your Alumni Association donation system!

### 📦 Files Created/Modified:

#### Backend Files:
1. ✅ **src/config/razorpay.js** - Razorpay instance configuration
2. ✅ **src/controllers/payment.controller.js** - Payment APIs (create order, verify)
3. ✅ **src/routes/payment.routes.js** - Payment routes
4. ✅ **src/services/payment.service.js** - Payment utility functions
5. ✅ **src/models/Donation.model.js** - Updated with Razorpay fields
6. ✅ **src/controllers/donation.controller.js** - Updated donation logic
7. ✅ **src/routes/donation.routes.js** - Updated routes
8. ✅ **src/app.js** - Added payment routes

#### Configuration Files:
9. ✅ **.env.example** - Environment variables template
10. ✅ **package.json** - Updated with `razorpay` dependency

#### Documentation & Testing:
11. ✅ **RAZORPAY_SETUP.md** - Complete setup guide
12. ✅ **test-razorpay.html** - HTML test page
13. ✅ **Razorpay_API_Collection.postman_collection.json** - Postman collection
14. ✅ **QUICK_START.md** - This file!

---

## 🎯 Next Steps (5 Minutes Setup)

### 1. Configure Environment Variables

Create `.env` file:

```bash
cp .env.example .env
```

Update these values in `.env`:

```env
# Get from https://dashboard.razorpay.com/app/website-app-settings/api-keys
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx

# Your existing MongoDB URI
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni_db

# Your existing JWT secret
JWT_SECRET=your_jwt_secret_key
```

### 2. Start the Server

```bash
npm run dev
```

Server will start at: `http://localhost:5000` 🚀

### 3. Test the Integration

#### Option A: HTML Test Page (Easiest)
1. Open `test-razorpay.html` in your browser
2. Enter your JWT token (get it by logging in)
3. Enter amount and purpose
4. Click "Donate Now"
5. Use test card: `4111 1111 1111 1111`

#### Option B: Postman
1. Import `Razorpay_API_Collection.postman_collection.json`
2. Update `JWT_TOKEN` variable
3. Test the endpoints

---

## 📋 API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/payment/key` | ❌ No | Get Razorpay public key |
| POST | `/api/payment/create-order` | ✅ Yes | Create payment order |
| POST | `/api/payment/verify` | ✅ Yes | Verify payment signature |
| GET | `/api/payment/details/:paymentId` | ✅ Yes | Get payment details |
| GET | `/api/donations/my-donations` | ✅ Yes | Get user's donations |
| GET | `/api/donations/stats` | ✅ Yes | Get donation statistics |
| GET | `/api/donations` | ✅ Admin | Get all donations |

---

## 🧪 Test Card Details

| Card Number | Type | Result |
|-------------|------|--------|
| 4111 1111 1111 1111 | Visa | ✅ Success |
| 5555 5555 5555 4444 | Mastercard | ✅ Success |
| 4000 0000 0000 0002 | Visa | ❌ Failed |

**CVV:** Any 3 digits  
**Expiry:** Any future date

---

## 🔄 Payment Flow

```
1. Frontend: User clicks "Donate"
   ↓
2. Backend: POST /api/payment/create-order
   ↓
3. Backend: Creates Razorpay order + Pending donation
   ↓
4. Frontend: Opens Razorpay Checkout modal
   ↓
5. User: Completes payment
   ↓
6. Frontend: POST /api/payment/verify
   ↓
7. Backend: Verifies signature using crypto
   ↓
8. Backend: Updates donation status to SUCCESS
   ↓
9. Frontend: Shows success message ✅
```

---

## 💻 Frontend Integration Examples

### Next.js Example

See [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md#-frontend-integration-nextjs) for complete code.

Quick snippet:
```javascript
// 1. Create order
const { data } = await axios.post('/api/payment/create-order', 
  { amount: 1000, purpose: 'Annual Fund' },
  { headers: { Authorization: `Bearer ${token}` } }
);

// 2. Open Razorpay
const razorpay = new Razorpay({
  key: razorpayKey,
  amount: data.order.amount,
  order_id: data.order.orderId,
  handler: async (response) => {
    // 3. Verify payment
    await axios.post('/api/payment/verify', {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      donationId: data.order.donationId
    });
  }
});
razorpay.open();
```

### React Native Example

See [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md#-frontend-integration-react-native) for complete code.

---

## 🛠 Database Schema

### Donation Model:

```javascript
{
  donor: ObjectId,              // Reference to User
  amount: Number,               // Amount in rupees
  purpose: String,              // Donation purpose
  razorpayOrderId: String,      // Razorpay order ID
  razorpayPaymentId: String,    // Razorpay payment ID
  razorpaySignature: String,    // Payment signature
  paymentStatus: String,        // PENDING | SUCCESS | FAILED
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🐛 Common Issues & Solutions

### Issue: Server won't start
**Solution:** Check if `.env` file exists and has correct values

### Issue: "Module not found: razorpay"
**Solution:** Run `npm install`

### Issue: Cannot create order
**Solution:** 
- Check if Razorpay keys are correct in `.env`
- Ensure MongoDB is connected
- Verify JWT token is valid

### Issue: Payment verification fails
**Solution:**
- Check `RAZORPAY_KEY_SECRET` in `.env`
- Ensure signature is passed correctly from frontend

---

## 📚 Documentation Files

| File | Description |
|------|-------------|
| [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md) | Complete setup guide with examples |
| [QUICK_START.md](QUICK_START.md) | This file - quick reference |
| [test-razorpay.html](test-razorpay.html) | HTML test page |
| [.env.example](.env.example) | Environment variables template |

---

## 🎬 Ready to Test?

1. ✅ Dependencies installed
2. ✅ `.env` configured with Razorpay keys
3. ✅ Server running on port 5000
4. ✅ Open `test-razorpay.html` in browser
5. ✅ Get JWT token from login
6. ✅ Test donation with card: `4111 1111 1111 1111`

---

## 📞 Need Help?

- **Full Documentation:** See `RAZORPAY_SETUP.md`
- **Razorpay Docs:** https://razorpay.com/docs/
- **Razorpay Dashboard:** https://dashboard.razorpay.com/

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Switch to Razorpay Live Mode keys
- [ ] Update `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up MongoDB backups
- [ ] Test with real payment (small amount)
- [ ] Configure webhooks for payment updates

---

**✨ Integration Complete! Happy Coding! 🎉**
