const Service = require('../models/Service');

// Get all services (public endpoint for website)
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ displayOrder: 1, category: 1 });

    res.status(200).json({
      success: true,
      message: 'Services retrieved successfully',
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch services'
    });
  }
};

// Get all services for admin (includes inactive)
const getAllServicesAdmin = async (req, res) => {
  try {
    const services = await Service.find({})
      .sort({ displayOrder: 1, category: 1 });

    res.status(200).json({
      success: true,
      message: 'Services retrieved successfully',
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch services'
    });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        error: 'Service not found',
        message: `No service found with ID: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service retrieved successfully',
      data: service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch service'
    });
  }
};

// Get service by slug
const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug, isActive: true });

    if (!service) {
      return res.status(404).json({
        error: 'Service not found',
        message: `No service found with slug: ${slug}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service retrieved successfully',
      data: service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch service'
    });
  }
};

// Create new service category
const createService = async (req, res) => {
  try {
    const { category, slug, description, categoryImage, subServices, displayOrder } = req.body;

    if (!category || !slug) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Category and slug are required'
      });
    }

    // Check if service with this category or slug already exists
    const existingService = await Service.findOne({
      $or: [{ category }, { slug }]
    });

    if (existingService) {
      return res.status(400).json({
        error: 'Service already exists',
        message: 'A service with this category or slug already exists'
      });
    }

    const newService = new Service({
      category,
      slug,
      description: description || '',
      categoryImage: categoryImage || '/salon logo.jpg',
      subServices: subServices || [],
      displayOrder: displayOrder || 0
    });

    const savedService = await newService.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: savedService
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create service'
    });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        error: 'Service not found',
        message: `No service found with ID: ${id}`
      });
    }

    // Update the service
    const updatedService = await Service.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: updatedService
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update service'
    });
  }
};

// Delete service (soft delete)
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        error: 'Service not found',
        message: `No service found with ID: ${id}`
      });
    }

    // Soft delete by setting isActive to false
    service.isActive = false;
    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
      data: service
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete service'
    });
  }
};

// Add sub-service to existing service
const addSubService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, price, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name and price are required for sub-service'
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        error: 'Service not found',
        message: `No service found with ID: ${serviceId}`
      });
    }

    const newSubService = {
      name,
      price: parseFloat(price),
      image: image || '/salon logo.jpg'
    };

    service.subServices.push(newSubService);
    const updatedService = await service.save();

    res.status(201).json({
      success: true,
      message: 'Sub-service added successfully',
      data: updatedService
    });
  } catch (error) {
    console.error('Error adding sub-service:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to add sub-service'
    });
  }
};

// Update sub-service
const updateSubService = async (req, res) => {
  try {
    const { serviceId, subServiceId } = req.params;
    const { name, price, image, isActive } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        error: 'Service not found',
        message: `No service found with ID: ${serviceId}`
      });
    }

    const subService = service.subServices.id(subServiceId);
    if (!subService) {
      return res.status(404).json({
        error: 'Sub-service not found',
        message: `No sub-service found with ID: ${subServiceId}`
      });
    }

    // Update sub-service fields
    if (name !== undefined) subService.name = name;
    if (price !== undefined) subService.price = parseFloat(price);
    if (image !== undefined) subService.image = image;
    if (isActive !== undefined) subService.isActive = isActive;

    const updatedService = await service.save();

    res.status(200).json({
      success: true,
      message: 'Sub-service updated successfully',
      data: updatedService
    });
  } catch (error) {
    console.error('Error updating sub-service:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update sub-service'
    });
  }
};

// Delete sub-service (soft delete)
const deleteSubService = async (req, res) => {
  try {
    const { serviceId, subServiceId } = req.params;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        error: 'Service not found',
        message: `No service found with ID: ${serviceId}`
      });
    }

    const subService = service.subServices.id(subServiceId);
    if (!subService) {
      return res.status(404).json({
        error: 'Sub-service not found',
        message: `No sub-service found with ID: ${subServiceId}`
      });
    }

    // Soft delete by setting isActive to false
    subService.isActive = false;
    const updatedService = await service.save();

    res.status(200).json({
      success: true,
      message: 'Sub-service deleted successfully',
      data: updatedService
    });
  } catch (error) {
    console.error('Error deleting sub-service:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete sub-service'
    });
  }
};

module.exports = {
  getAllServices,
  getAllServicesAdmin,
  getServiceById,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  addSubService,
  updateSubService,
  deleteSubService
};