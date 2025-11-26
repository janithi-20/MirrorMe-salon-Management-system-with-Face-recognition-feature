const TeamMember = require('../models/TeamMember');

// Get all team members (public endpoint for website)
const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ 
      isActive: true, 
      status: { $in: ['active', 'on-leave'] } 
    })
    .select('name position specialization experience image bio displayOrder')
    .sort({ displayOrder: 1, name: 1 });

    res.status(200).json({
      success: true,
      message: 'Team members retrieved successfully',
      data: teamMembers
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch team members'
    });
  }
};

// Get all team members for admin (includes all data)
const getAllTeamMembersAdmin = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({})
      .sort({ displayOrder: 1, name: 1 });

    res.status(200).json({
      success: true,
      message: 'Team members retrieved successfully',
      data: teamMembers
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch team members'
    });
  }
};

// Get team member by ID
const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await TeamMember.findById(id);

    if (!teamMember) {
      return res.status(404).json({
        error: 'Team member not found',
        message: `No team member found with ID: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member retrieved successfully',
      data: teamMember
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch team member'
    });
  }
};

// Create new team member
const createTeamMember = async (req, res) => {
  try {
    const {
      name,
      position,
      specialization,
      experience,
      email,
      phone,
      address,
      salary,
      joinDate,
      status,
      specialties,
      image,
      bio,
      displayOrder
    } = req.body;

    // Check if email already exists
    const existingMember = await TeamMember.findOne({ email });
    if (existingMember) {
      return res.status(400).json({
        error: 'Email already exists',
        message: 'A team member with this email already exists'
      });
    }

    // Create new team member
    const newTeamMember = new TeamMember({
      name,
      position,
      specialization,
      experience,
      email,
      phone,
      address,
      salary,
      joinDate: joinDate || Date.now(),
      status: status || 'active',
      specialties: specialties || [],
      image: image || '/salon-logo.jpg',
      bio,
      displayOrder: displayOrder || 0
    });

    const savedTeamMember = await newTeamMember.save();

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: savedTeamMember
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create team member'
    });
  }
};

// Update team member
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return res.status(404).json({
        error: 'Team member not found',
        message: `No team member found with ID: ${id}`
      });
    }

    // Check if email is being updated and if it already exists
    if (updateData.email && updateData.email !== teamMember.email) {
      const existingMember = await TeamMember.findOne({ 
        email: updateData.email, 
        _id: { $ne: id } 
      });
      if (existingMember) {
        return res.status(400).json({
          error: 'Email already exists',
          message: 'Another team member with this email already exists'
        });
      }
    }

    // Update the team member
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedTeamMember
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update team member'
    });
  }
};

// Delete team member (soft delete)
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return res.status(404).json({
        error: 'Team member not found',
        message: `No team member found with ID: ${id}`
      });
    }

    // Soft delete - set isActive to false
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      id,
      { isActive: false, status: 'inactive' },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully',
      data: updatedTeamMember
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete team member'
    });
  }
};

// Get team statistics
const getTeamStats = async (req, res) => {
  try {
    const totalMembers = await TeamMember.countDocuments({ isActive: true });
    const activeMembers = await TeamMember.countDocuments({ 
      isActive: true, 
      status: 'active' 
    });
    const onLeaveMembers = await TeamMember.countDocuments({ 
      isActive: true, 
      status: 'on-leave' 
    });
    
    // Calculate total payroll
    const payrollData = await TeamMember.aggregate([
      { $match: { isActive: true, status: { $in: ['active', 'on-leave'] } } },
      { $group: { _id: null, totalPayroll: { $sum: '$salary' } } }
    ]);
    
    const totalPayroll = payrollData.length > 0 ? payrollData[0].totalPayroll : 0;

    res.status(200).json({
      success: true,
      message: 'Team statistics retrieved successfully',
      data: {
        totalMembers,
        activeMembers,
        onLeaveMembers,
        totalPayroll
      }
    });
  } catch (error) {
    console.error('Error fetching team statistics:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch team statistics'
    });
  }
};

module.exports = {
  getAllTeamMembers,
  getAllTeamMembersAdmin,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamStats
};