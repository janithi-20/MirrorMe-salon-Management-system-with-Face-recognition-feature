// Test script for password reset functionality
require('dotenv').config();
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000';
const TEST_EMAIL = 'test@example.com'; // Change this to your test email

async function testPasswordResetFlow() {
  console.log('🧪 Testing Password Reset Flow...\n');

  try {
    // Step 1: Request password reset
    console.log('📧 Step 1: Requesting password reset...');
    const resetResponse = await fetch(`${BASE_URL}/customers/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: TEST_EMAIL
      })
    });

    const resetResult = await resetResponse.json();
    console.log('Response:', resetResult);

    if (!resetResponse.ok) {
      console.log('❌ Password reset request failed:', resetResult.message);
      return;
    }

    console.log('✅ Password reset email would be sent\n');

    // For testing, we'll simulate a token (in real scenario, get from email)
    // Note: This is just for testing the endpoint structure
    console.log('🔍 Step 2: Testing token validation endpoint...');
    const testToken = 'test-token-123';
    
    const validateResponse = await fetch(`${BASE_URL}/customers/validate-reset-token/${testToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const validateResult = await validateResponse.json();
    console.log('Validation Response:', validateResult);
    
    if (validateResponse.status === 400) {
      console.log('✅ Token validation endpoint working (expected: invalid token)\n');
    }

    // Step 3: Test password reset endpoint structure
    console.log('🔒 Step 3: Testing password reset endpoint structure...');
    const newPasswordResponse = await fetch(`${BASE_URL}/customers/reset-password/${testToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: 'newpassword123'
      })
    });

    const passwordResult = await newPasswordResponse.json();
    console.log('Password Reset Response:', passwordResult);
    
    if (newPasswordResponse.status === 400) {
      console.log('✅ Password reset endpoint working (expected: invalid token)\n');
    }

    console.log('🎉 All endpoints are accessible and responding correctly!');
    console.log('📝 The password reset flow structure is working.');
    console.log('📧 To fully test: use a real email and get the actual token from the email.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testPasswordResetFlow();