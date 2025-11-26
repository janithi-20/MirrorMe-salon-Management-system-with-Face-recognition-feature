const express = require('express');
const router = express.Router();
const {
  getAllBrands,
  getAdminBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  permanentDeleteBrand
} = require('../controllers/brandController');

// Public routes (for frontend)
router.get('/', getAllBrands);

// Admin routes
router.get('/admin', getAdminBrands);
router.post('/admin', createBrand);
router.put('/admin/:id', updateBrand);
router.delete('/admin/:id', deleteBrand);
router.delete('/admin/:id/permanent', permanentDeleteBrand);

module.exports = router;