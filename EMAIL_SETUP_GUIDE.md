# Gmail SMTP Setup Guide for Email Verification

## 📧 Setting up Gmail for Email Verification

To enable email verification in the salon management system, you need to configure Gmail SMTP with an App Password (not your regular Gmail password).

### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Follow the instructions to enable 2FA if not already enabled

### Step 2: Generate App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter "Mirror Me Salon" as the name
5. Click **Generate**
6. Copy the 16-character password (spaces will be removed automatically)

### Step 3: Update Environment Variables
Update your `.env` file in the backend directory:

```env
# Email Configuration (Gmail SMTP)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password

# Frontend URL (for password reset links)
FRONTEND_URL=http://localhost:3000
```

### Step 4: Restart the Backend Server
After updating the `.env` file, restart your backend server:
```bash
cd backend
node server.js
```

## ✅ Features Enabled

Once configured, the following email features will work:

### 1. **Email Verification on Registration**
- Users receive a 6-digit verification code via email
- Code expires after 15 minutes
- Professional HTML email template with salon branding

### 2. **Resend Verification Code**
- Users can request a new verification code
- Previous codes are invalidated when new ones are generated

### 3. **Password Reset via Email**
- Users receive a secure reset link via email
- Token expires after 1 hour
- Professional HTML email template

## 📧 Email Templates

The system includes professionally designed HTML email templates:

### Verification Email Features:
- ✨ Salon branding and colors
- 🔢 Large, easy-to-read verification code
- ⏰ Clear expiration time (15 minutes)
- 🔒 Security tips and warnings
- 📞 Contact information

### Password Reset Email Features:
- 🔗 Secure reset button and link
- ⚠️ Security warnings and expiration info
- 🎨 Professional design matching salon theme
- 📱 Mobile-responsive layout

## 🚨 Security Features

- **Code Expiration**: Verification codes expire after 15 minutes
- **One-time Use**: Codes are cleared after successful verification
- **Token Security**: Password reset tokens expire after 1 hour
- **Input Validation**: All email inputs are validated
- **Error Handling**: Graceful error handling for email failures

## 🧪 Testing

To test the email functionality:

1. Register a new user with a real email address
2. Check your inbox for the verification email
3. Use the 6-digit code to verify your account
4. Test password reset from the login page

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**
   - Make sure you're using an App Password, not your regular Gmail password
   - Verify 2FA is enabled on your Google account

2. **"Less secure app access" error**
   - This shouldn't happen with App Passwords, but if it does, use App Passwords instead

3. **Email not received**
   - Check spam/junk folder
   - Verify the email address is correct
   - Check backend logs for email sending errors

4. **"Authentication failed" error**
   - Double-check your Gmail username and app password in `.env`
   - Ensure no extra spaces in the credentials

### Backend Logs
Check the backend console for email-related logs:
- ✅ `Verification email sent to: user@email.com`
- ❌ `Failed to send verification email: [error details]`

## 📝 Environment Variables Reference

```env
# Required for email functionality
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
FRONTEND_URL=http://localhost:3000

# Optional: Email debugging (for development)
EMAIL_DEBUG=true
```

## 🚀 Production Considerations

For production deployment:
- Use environment-specific `.env` files
- Consider using a dedicated business email address
- Set up proper domain authentication (SPF, DKIM)
- Monitor email delivery rates
- Implement rate limiting for email sending
- Consider using professional email services (SendGrid, Mailgun) for higher volume

## 🎨 Customizing Email Templates

Email templates are located in `backend/services/emailService.js`. You can customize:
- Colors and branding
- Email content and messaging
- Logo and images (ensure they're publicly accessible)
- Contact information
- Legal disclaimers