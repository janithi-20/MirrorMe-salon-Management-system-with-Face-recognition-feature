# Backend Setup Instructions

## Installation
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Server
1. Start the development server:
   ```
   npm run dev
   ```
   Or for production:
   ```
   npm start
   ```

2. The server will run on `http://localhost:5000`

## API Endpoints

### POST /feedback/submit
Submit customer feedback

**Request Body:**
```json
{
  "name": "Customer Name",
  "message": "Feedback message",
  "rating": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "id": 1634567890123,
    "name": "Customer Name",
    "message": "Feedback message",
    "rating": 5,
    "timestamp": "2023-10-12T10:30:00.000Z",
    "status": "received"
  }
}
```

## Usage from Frontend
The React frontend is configured with a proxy to `http://localhost:5000`, so you can make requests directly to `/feedback/submit` from your React components.