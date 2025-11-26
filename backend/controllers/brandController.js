const Brand = require('../models/Brand');

// Get all brands (for frontend display)
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).sort({ createdAt: -1 });
    console.log(`📋 Retrieved ${brands.length} active brands`);
    
    res.status(200).json({
      success: true,
      data: brands,
      count: brands.length
    });
  } catch (error) {
    console.error('❌ Error fetching brands:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch brands',
      error: error.message
    });
  }
};

// Get all brands for admin (including inactive)
const getAdminBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    console.log(`📋 Admin: Retrieved ${brands.length} brands (including inactive)`);
    
    res.status(200).json({
      success: true,
      data: brands,
      count: brands.length
    });
  } catch (error) {
    console.error('❌ Error fetching admin brands:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch brands',
      error: error.message
    });
  }
};

// Create a new brand
const createBrand = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    
    // Validate required fields
    if (!name || !description || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and image are required'
      });
    }
    
    // Check if brand with same name already exists
    const existingBrand = await Brand.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });
    
    if (existingBrand) {
      return res.status(409).json({
        success: false,
        message: 'Brand with this name already exists'
      });
    }
    
    const brand = new Brand({
      name: name.trim(),
      description: description.trim(),
      image: image.trim()
    });
    
    const savedBrand = await brand.save();
    console.log('✅ Brand created:', savedBrand.name);
    
    res.status(201).json({
      success: true,
      message: 'Brand created successfully',
      data: savedBrand
    });
  } catch (error) {
    console.error('❌ Error creating brand:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create brand',
      error: error.message
    });
  }
};

// Update a brand
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, isActive } = req.body;
    
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    // Check if name is being changed and if it conflicts with existing brand
    if (name && name !== brand.name) {
      const existingBrand = await Brand.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: id }
      });
      
      if (existingBrand) {
        return res.status(409).json({
          success: false,
          message: 'Brand with this name already exists'
        });
      }
    }
    
    // Update fields
    if (name) brand.name = name.trim();
    if (description) brand.description = description.trim();
    if (image) brand.image = image.trim();
    if (typeof isActive === 'boolean') brand.isActive = isActive;
    
    const updatedBrand = await brand.save();
    console.log('✅ Brand updated:', updatedBrand.name);
    
    res.status(200).json({
      success: true,
      message: 'Brand updated successfully',
      data: updatedBrand
    });
  } catch (error) {
    console.error('❌ Error updating brand:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update brand',
      error: error.message
    });
  }
};

// Delete a brand (soft delete - set isActive to false)
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    // Soft delete by setting isActive to false
    brand.isActive = false;
    await brand.save();
    
    console.log('🗑️ Brand soft deleted:', brand.name);
    
    res.status(200).json({
      success: true,
      message: 'Brand deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting brand:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete brand',
      error: error.message
    });
  }
};

// Permanently delete a brand (hard delete)
const permanentDeleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    console.log('🗑️ Brand permanently deleted:', brand.name);
    
    res.status(200).json({
      success: true,
      message: 'Brand permanently deleted'
    });
  } catch (error) {
    console.error('❌ Error permanently deleting brand:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to permanently delete brand',
      error: error.message
    });
  }
};

module.exports = {
  getAllBrands,
  getAdminBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  permanentDeleteBrand
};