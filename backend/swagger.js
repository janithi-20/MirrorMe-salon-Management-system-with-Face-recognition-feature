const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Salon Management System API',
      version: '1.0.0',
      description: 'A comprehensive API for managing salon operations including customer registration, authentication, bookings, and feedback.',
      contact: {
        name: 'Mirror Me Salon',
        email: 'mirrorme@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Customer: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'phoneNumber', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated ID of the customer',
            },
            customerId: {
              type: 'string',
              description: 'The unique customer ID',
            },
            firstName: {
              type: 'string',
              description: 'Customer first name',
            },
            lastName: {
              type: 'string',
              description: 'Customer last name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Customer email address',
            },
            phoneNumber: {
              type: 'string',
              description: 'Customer phone number',
            },
            password: {
              type: 'string',
              description: 'Customer password',
            },
            isVerified: {
              type: 'boolean',
              description: 'Email verification status',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
            },
          },
        },
        CustomerRegistration: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'phoneNumber', 'password'],
          properties: {
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@email.com',
            },
            phoneNumber: {
              type: 'string',
              example: '+94771234567',
            },
            password: {
              type: 'string',
              example: 'securePassword123',
            },
          },
        },
        CustomerLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@email.com',
            },
            password: {
              type: 'string',
              example: 'securePassword123',
            },
          },
        },
        EmailVerification: {
          type: 'object',
          required: ['otp'],
          properties: {
            customerId: {
              type: 'string',
              example: 'CUST_1634567890123',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@email.com',
            },
            otp: {
              type: 'string',
              example: '123456',
              description: '6-digit verification code',
            },
          },
        },
        Feedback: {
          type: 'object',
          required: ['name', 'message', 'rating'],
          properties: {
            name: {
              type: 'string',
              example: 'John Doe',
            },
            message: {
              type: 'string',
              example: 'Excellent service and friendly staff!',
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              example: 5,
            },
          },
        },
        ForgotPassword: {
          type: 'object',
          required: ['email'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@email.com',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully',
            },
            data: {
              type: 'object',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Bad Request',
            },
            message: {
              type: 'string',
              example: 'Invalid input provided',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};