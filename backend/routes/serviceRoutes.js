const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Public routes (for website)
router.get('/', serviceController.getAllServices);
router.get('/slug/:slug', serviceController.getServiceBySlug);

// Admin routes (for admin panel)
router.get('/admin/all', serviceController.getAllServicesAdmin);
router.get('/:id', serviceController.getServiceById);
router.post('/', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

// Sub-service management routes
router.post('/:serviceId/sub-services', serviceController.addSubService);
router.put('/:serviceId/sub-services/:subServiceId', serviceController.updateSubService);
router.delete('/:serviceId/sub-services/:subServiceId', serviceController.deleteSubService);

module.exports = router;