const Settings = require('../models/Settings');

// Get all settings (for frontend display)
const getAllSettings = async (req, res) => {
  try {
    const settings = await Settings.find({ isActive: true }).sort({ category: 1, key: 1 });
    
    // Group settings by category
    const groupedSettings = settings.reduce((acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = {};
      }
      acc[setting.category][setting.key] = {
        value: setting.value,
        label: setting.label,
        type: setting.type
      };
      return acc;
    }, {});

    console.log(`📋 Retrieved ${settings.length} active settings`);
    
    res.status(200).json({
      success: true,
      data: groupedSettings,
      count: settings.length
    });
  } catch (error) {
    console.error('❌ Error fetching settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings',
      error: error.message
    });
  }
};

// Get settings for admin (including metadata)
const getAdminSettings = async (req, res) => {
  try {
    const settings = await Settings.find().sort({ category: 1, key: 1 });
    
    // Group settings by category with full metadata
    const groupedSettings = settings.reduce((acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = {};
      }
      acc[setting.category][setting.key] = {
        id: setting._id,
        value: setting.value,
        label: setting.label,
        type: setting.type,
        description: setting.description,
        isActive: setting.isActive,
        updatedAt: setting.updatedAt
      };
      return acc;
    }, {});

    console.log(`📋 Admin: Retrieved ${settings.length} settings`);
    
    res.status(200).json({
      success: true,
      data: groupedSettings,
      count: settings.length
    });
  } catch (error) {
    console.error('❌ Error fetching admin settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings',
      error: error.message
    });
  }
};

// Update a setting
const updateSetting = async (req, res) => {
  try {
    const { value } = req.body;
    const key = req.params.key; // Get key from URL parameter
    
    console.log(`🔄 Received update request - Key: ${key}, Value: ${value}`);
    console.log(`📝 Request body:`, req.body);
    console.log(`🔗 Request params:`, req.params);
    
    if (!key || value === undefined || value === null) {
      console.log(`❌ Validation failed - Key: ${key}, Value: ${value}`);
      return res.status(400).json({
        success: false,
        message: 'Key and value are required'
      });
    }
    
    const setting = await Settings.findOneAndUpdate(
      { key: key },
      { value: String(value).trim() },
      { new: true, runValidators: true }
    );
    
    console.log(`🔍 Query result for key "${key}":`, setting);
    
    if (!setting) {
      console.log(`❌ Setting not found for key: ${key}`);
      // Let's check what settings actually exist
      const allSettings = await Settings.find({});
      console.log(`📋 All settings in database:`, allSettings.map(s => ({ key: s.key, category: s.category })));
      
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }
    
    console.log(`✅ Setting updated: ${key} = ${value}`);
    
    res.status(200).json({
      success: true,
      message: 'Setting updated successfully',
      data: {
        key: setting.key,
        value: setting.value,
        category: setting.category,
        updatedAt: setting.updatedAt
      }
    });
  } catch (error) {
    console.error('❌ Error updating setting:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update setting',
      error: error.message
    });
  }
};

// Bulk update settings
const bulkUpdateSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    
    if (!settings || !Array.isArray(settings)) {
      return res.status(400).json({
        success: false,
        message: 'Settings array is required'
      });
    }
    
    const updatePromises = settings.map(({ key, value }) => {
      if (!key || value === undefined || value === null) {
        throw new Error(`Invalid setting: key=${key}, value=${value}`);
      }
      
      return Settings.findOneAndUpdate(
        { key: key },
        { value: String(value).trim() },
        { new: true, runValidators: true }
      );
    });
    
    const updatedSettings = await Promise.all(updatePromises);
    
    const validSettings = updatedSettings.filter(setting => setting !== null);
    
    console.log(`✅ Bulk updated ${validSettings.length} settings`);
    
    res.status(200).json({
      success: true,
      message: `${validSettings.length} settings updated successfully`,
      data: validSettings.map(setting => ({
        key: setting.key,
        value: setting.value,
        category: setting.category,
        updatedAt: setting.updatedAt
      }))
    });
  } catch (error) {
    console.error('❌ Error bulk updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message
    });
  }
};

// Create or restore default settings
const resetToDefaults = async (req, res) => {
  try {
    const defaultSettings = [
      {
        key: 'weekdays',
        category: 'businessHours',
        label: 'Weekdays',
        value: 'Monday - Friday: 9:00 AM - 6:00 PM',
        type: 'text',
        description: 'Business hours for weekdays'
      },
      {
        key: 'weekends',
        category: 'businessHours',
        label: 'Weekends',
        value: 'Saturday - Sunday: 9:00 AM - 7:00 PM',
        type: 'text',
        description: 'Business hours for weekends'
      },
      {
        key: 'phone',
        category: 'contact',
        label: 'Phone Number',
        value: '+94 77 123 4567',
        type: 'phone',
        description: 'Main phone number'
      },
      {
        key: 'email',
        category: 'contact',
        label: 'Email Address',
        value: 'info@mirrormesalon.com',
        type: 'email',
        description: 'Main email address'
      },
      {
        key: 'address',
        category: 'contact',
        label: 'Address',
        value: '123 Elegance Street, Colombo, Sri Lanka',
        type: 'textarea',
        description: 'Physical address'
      },
      {
        key: 'website',
        category: 'contact',
        label: 'Website',
        value: 'www.mirrormesalon.com',
        type: 'url',
        description: 'Website URL'
      }
    ];
    
    // Use upsert to create or update each setting
    const upsertPromises = defaultSettings.map(setting => 
      Settings.findOneAndUpdate(
        { key: setting.key },
        setting,
        { upsert: true, new: true, runValidators: true }
      )
    );
    
    const results = await Promise.all(upsertPromises);
    
    console.log(`✅ Reset/created ${results.length} default settings`);
    
    res.status(200).json({
      success: true,
      message: `${results.length} default settings restored`,
      data: results
    });
  } catch (error) {
    console.error('❌ Error resetting to defaults:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset to default settings',
      error: error.message
    });
  }
};

module.exports = {
  getAllSettings,
  getAdminSettings,
  updateSetting,
  bulkUpdateSettings,
  resetToDefaults
};