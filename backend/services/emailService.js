const nodemailer = require('nodemailer');

// Create transporter for Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD // Your Gmail App Password (not regular password)
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Generate 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
const sendVerificationEmail = async (email, firstName, verificationCode) => {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification - Mirror Me Salon</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px 20px;
            border-radius: 0 0 10px 10px;
          }
          .verification-code {
            background: #667eea;
            color: white;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 6px;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
            font-family: monospace;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 14px;
            color: #666;
          }
          .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🪞 Mirror Me Salon</h1>
          <p>Welcome to our beauty family!</p>
        </div>
        
        <div class="content">
          <h2>Hi ${firstName}! 👋</h2>
          
          <p>Thank you for registering with Mirror Me Salon! To complete your registration and secure your account, please verify your email address.</p>
          
          <p><strong>Your verification code is:</strong></p>
          
          <div class="verification-code">
            ${verificationCode}
          </div>
          
          <p>Please enter this code in the verification page to activate your account. This code will expire in 15 minutes for security purposes.</p>
          
          <div style="background: #e8f4f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>🔒 Security Notice:</strong><br>
            • Never share this code with anyone<br>
            • This code expires in 15 minutes<br>
            • If you didn't request this, please ignore this email
          </div>
          
          <p>Once verified, you'll be able to:</p>
          <ul>
            <li>✨ Book appointments online</li>
            <li>💬 Leave feedback and reviews</li>
            <li>📱 Access your customer profile</li>
            <li>🎯 Get personalized beauty recommendations</li>
          </ul>
          
          <div class="footer">
            <p>Need help? Contact us:</p>
            <p>📧 Email: info@mirrormesalon.com<br>
            📞 Phone: +94 77 123 4567<br>
            🌐 Website: www.mirrormesalon.com</p>
            
            <p><em>This is an automated email. Please do not reply to this message.</em></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
      Mirror Me Salon - Email Verification
      
      Hi ${firstName}!
      
      Thank you for registering with Mirror Me Salon!
      
      Your verification code is: ${verificationCode}
      
      Please enter this code to complete your registration.
      This code will expire in 15 minutes.
      
      If you didn't request this, please ignore this email.
      
      Contact us:
      Email: info@mirrormesalon.com
      Phone: +94 77 123 4567
      Website: www.mirrormesalon.com
    `;

    const mailOptions = {
      from: `"Mirror Me Salon" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '🪞 Verify Your Mirror Me Salon Account',
      text: textContent,
      html: htmlContent
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Verification email sent successfully:', {
      to: email,
      messageId: result.messageId,
      verificationCode: verificationCode
    });
    
    return {
      success: true,
      messageId: result.messageId
    };
    
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, firstName, resetToken) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Mirror Me Salon</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px 20px;
            border-radius: 0 0 10px 10px;
          }
          .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🪞 Mirror Me Salon</h1>
          <p>Password Reset Request</p>
        </div>
        
        <div class="content">
          <h2>Hi ${firstName}! 👋</h2>
          
          <p>We received a request to reset your password for your Mirror Me Salon account.</p>
          
          <p>Click the button below to reset your password:</p>
          
          <a href="${resetUrl}" class="btn">Reset My Password</a>
          
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">${resetUrl}</p>
          
          <div style="background: #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>⚠️ Important:</strong><br>
            • This link will expire in 1 hour<br>
            • If you didn't request this, please ignore this email<br>
            • Your current password remains unchanged until you complete the reset
          </div>
          
          <div class="footer">
            <p>Need help? Contact us:</p>
            <p>📧 Email: info@mirrormesalon.com<br>
            📞 Phone: +94 77 123 4567</p>
            
            <p><em>This is an automated email. Please do not reply to this message.</em></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Mirror Me Salon" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '🔒 Reset Your Mirror Me Salon Password',
      html: htmlContent
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Password reset email sent successfully:', {
      to: email,
      messageId: result.messageId
    });
    
    return {
      success: true,
      messageId: result.messageId
    };
    
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  generateVerificationCode
};