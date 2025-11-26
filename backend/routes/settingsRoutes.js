const express = require('express');
const router = express.Router();
const {
  getAllSettings,
  getAdminSettings,
  updateSetting,
  bulkUpdateSettings,
  resetToDefaults
} = require('../controllers/settingsController');

// Middleware to log all requests to settings routes
router.use((req, res, next) => {
  console.log(`🔍 Settings Route: ${req.method} ${req.originalUrl}`);
  console.log(`📝 Body:`, req.body);
  console.log(`🔗 Params:`, req.params);
  next();
});

// Public routes (for frontend)
router.get('/', getAllSettings);

// Admin routes
router.get('/admin', getAdminSettings);
router.put('/admin/:key', updateSetting);
router.put('/admin/bulk', bulkUpdateSettings);
router.post('/admin/reset', resetToDefaults);

module.exports = router;