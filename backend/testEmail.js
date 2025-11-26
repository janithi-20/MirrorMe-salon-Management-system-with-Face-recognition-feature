// testEmail.js - Test email functionality
require('dotenv').config();
const { sendVerificationEmail, sendPasswordResetEmail, generateVerificationCode } = require('./services/emailService');

async function testEmailService() {
  console.log('🧪 Testing Email Service...\n');

  // Check if environment variables are set
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ Missing email configuration in .env file');
    console.log('Please set GMAIL_USER and GMAIL_APP_PASSWORD in your .env file');
    console.log('See EMAIL_SETUP_GUIDE.md for instructions');
    process.exit(1);
  }

  console.log('✅ Email configuration found');
  console.log('📧 Gmail User:', process.env.GMAIL_USER);
  console.log('🔑 App Password:', process.env.GMAIL_APP_PASSWORD ? '***configured***' : '❌ missing');
  console.log('');

  // Test email address (replace with your test email)
  const testEmail = process.env.TEST_EMAIL || process.env.GMAIL_USER;
  const testName = 'Test User';

  try {
    // Test 1: Verification Email
    console.log('📧 Test 1: Sending verification email...');
    const verificationCode = generateVerificationCode();
    console.log('Generated code:', verificationCode);
    
    const verificationResult = await sendVerificationEmail(testEmail, testName, verificationCode);
    console.log('✅ Verification email sent successfully');
    console.log('Message ID:', verificationResult.messageId);
    console.log('');

    // Test 2: Password Reset Email
    console.log('🔒 Test 2: Sending password reset email...');
    const resetToken = 'test_reset_token_12345';
    
    const resetResult = await sendPasswordResetEmail(testEmail, testName, resetToken);
    console.log('✅ Password reset email sent successfully');
    console.log('Message ID:', resetResult.messageId);
    console.log('');

    console.log('🎉 All email tests passed!');
    console.log('📬 Check your inbox at:', testEmail);
    console.log('💡 Tip: Check spam folder if emails are not in inbox');

  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting tips:');
    console.log('1. Check your Gmail credentials in .env file');
    console.log('2. Ensure 2FA is enabled on your Google account');
    console.log('3. Make sure you\'re using an App Password, not your regular password');
    console.log('4. See EMAIL_SETUP_GUIDE.md for detailed setup instructions');
  }
}

// Run the test
testEmailService();