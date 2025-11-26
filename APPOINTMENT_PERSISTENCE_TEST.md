# Testing Appointment Persistence

This document explains how to test that appointments are now properly saved to the database.

## Quick Test Steps

### 1. Start the Backend Server
```bash
cd backend
npm start
```
You should see: `✅ MongoDB connected: localhost`

### 2. Test Creating an Appointment

#### Option A: Using the Frontend
1. Start the frontend (in a new terminal):
```bash
npm start  # (from the root directory)
```
2. Go to http://localhost:3000
3. Create a new appointment through the booking interface
4. Restart the backend server (`Ctrl+C` then `npm start` again)
5. Check if the appointment is still there in the admin dashboard

#### Option B: Using API directly (Postman/curl)
```bash
curl -X POST http://localhost:5000/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"service": "Hair Cut", "label": "Basic Cut", "price": 2500}],
    "datetime": "2024-12-01T14:00:00",
    "staff": "Sarah Johnson",
    "subtotal": 2500,
    "customerInfo": {
      "firstName": "Test",
      "lastName": "Customer",
      "email": "test@example.com",
      "phoneNumber": "+1234567890"
    }
  }'
```

### 3. Verify Persistence
```bash
# Get all bookings
curl http://localhost:5000/dashboard/bookings
```

### 4. Restart Server Test
1. Stop the server (Ctrl+C)
2. Start it again (`npm start`)
3. Check if your appointment is still there:
```bash
curl http://localhost:5000/dashboard/bookings
```

## What Changed

### Before (Problem)
- Appointments stored in JavaScript arrays in memory
- Data lost on server restart
- No persistent storage

### After (Solution) 
- Appointments stored in MongoDB database
- Data persists across server restarts
- Proper database schemas and models
- Environment-based configuration

## Database Management

### View Data
- **MongoDB Compass**: Download from https://www.mongodb.com/products/compass
- **Command Line**: `mongo` then `use salon_management` then `db.bookings.find()`

### Clear All Data
```bash
cd backend
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/salon_management').then(async () => {
  await mongoose.connection.db.dropDatabase();
  console.log('Database cleared');
  process.exit();
});
"
```

### Reset with Sample Data
```bash
cd backend
npm run seed
```

## Expected Results
✅ Appointments should persist after server restart  
✅ Dashboard should show correct data  
✅ Customer can see their booking history  
✅ Admin can manage all bookings

## Troubleshooting

### "Cannot connect to MongoDB"
1. Install MongoDB locally or use MongoDB Atlas
2. Check if MongoDB service is running
3. Verify connection string in `.env` file

### "Port already in use"
1. Change PORT in `.env` file
2. Kill existing processes on port 5000

### "Data not appearing"
1. Check if seeding was successful
2. Verify API endpoints are working
3. Check browser console for frontend errors