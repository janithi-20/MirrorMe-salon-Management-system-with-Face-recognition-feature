const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Public routes (for website)
router.get('/', teamController.getAllTeamMembers);
router.get('/:id', teamController.getTeamMemberById);

// Admin routes (for admin panel)
router.get('/admin/all', teamController.getAllTeamMembersAdmin);
router.get('/admin/stats', teamController.getTeamStats);
router.post('/', teamController.createTeamMember);
router.put('/:id', teamController.updateTeamMember);
router.delete('/:id', teamController.deleteTeamMember);

module.exports = router;