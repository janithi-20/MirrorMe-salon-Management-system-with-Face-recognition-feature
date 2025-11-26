# Salon Management System - Backend

This is the backend API for the Salon Management System built with Express.js and MongoDB.

## Features

- **Persistent Data Storage**: All data is now stored in MongoDB database
- **Appointment Management**: Create, read, update appointments
- **Customer Management**: User registration and authentication
- **Dashboard Analytics**: Real-time statistics and insights
- **Feedback System**: Customer feedback collection
- **API Documentation**: Swagger/OpenAPI documentation

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas account)

### Installing MongoDB locally:
- **Windows**: Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **macOS**: `brew install mongodb-community`
- **Ubuntu**: Follow [official MongoDB installation guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory with the following:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/salon_management
# Alternative: Use MongoDB Atlas cloud database
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salon_management

# Server Configuration
PORT=5000

# JWT Secret (for future authentication improvements)
JWT_SECRET=your_jwt_secret_here
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Start MongoDB service:
   - **Windows**: MongoDB should start automatically after installation
   - **macOS/Linux**: `sudo systemctl start mongod` or `brew services start mongodb-community`

2. Seed the database with sample data:
```bash
npm run seed
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file

### 4. Start the Server

#### Development mode (with auto-restart):
```bash
npm run dev
```

#### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Documentation

Once the server is running, you can access the Swagger API documentation at:
- **Swagger UI**: http://localhost:5000/api-docs

## API Endpoints

### Bookings
- `POST /bookings` - Create a new booking
- `GET /bookings/customer/{customerId}` - Get bookings for a specific customer
- `PUT /bookings/{id}/status` - Update booking status

### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /dashboard/bookings` - Get all bookings
- `GET /dashboard/customers` - Get all customers
- `GET /dashboard/feedbacks` - Get all feedbacks

### Authentication
- `POST /customers/createCustomer` - Register new customer
- `POST /customers/login` - Customer login
- `POST /customers/verify-email` - Verify email
- `POST /customers/resend-verification` - Resend verification email

### Feedback
- `POST /feedback/submit` - Submit customer feedback

### Password Reset
- `POST /customers/forgot-password` - Request password reset
- `POST /customers/reset-password` - Reset password

## Database Schema

### Booking Model
```javascript
{
  bookingId: String (unique),
  customerId: String,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  services: [{ service: String, subService: String, price: Number }],
  datetime: Date,
  staff: String,
  totalAmount: Number,
  status: String (pending|confirmed|completed|cancelled),
  paymentStatus: String (pending|completed|failed),
  isNew: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Key Changes Made

### Problem Fixed: Data Persistence
**Before**: All appointment data was stored in memory (JavaScript arrays) and was lost on server restart.

**After**: All data is now stored in MongoDB database with proper schemas and persistence.

### What was implemented:
1. **MongoDB Integration**: Added mongoose for database connectivity
2. **Database Models**: Created schemas for Bookings, Users, and Feedback
3. **Updated Controllers**: Modified all controllers to use database operations
4. **Environment Configuration**: Added proper environment variable support
5. **Database Seeding**: Created script to populate initial sample data

## Troubleshooting

### MongoDB Connection Issues
1. **"Connection failed"**: Ensure MongoDB service is running
2. **"Authentication failed"**: Check your connection string credentials
3. **"Database not found"**: MongoDB will create the database automatically

### Port Issues
- If port 5000 is busy, change the PORT in `.env` file

### Dependencies Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

1. **View Database Data**: Use MongoDB Compass or Studio 3T for GUI database management
2. **API Testing**: Use Postman or the built-in Swagger UI
3. **Logs**: Check console output for database connection status and errors
4. **Hot Reload**: Use `npm run dev` for development with automatic restarts

## Future Enhancements

- [ ] Implement JWT-based authentication
- [ ] Add data validation middleware
- [ ] Implement rate limiting
- [ ] Add unit and integration tests
- [ ] Implement database indexing for better performance
- [ ] Add file upload functionality for profile pictures
- [ ] Implement email notifications