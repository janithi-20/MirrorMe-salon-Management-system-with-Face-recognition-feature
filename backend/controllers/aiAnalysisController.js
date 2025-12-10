const aiAnalysisService = require('../services/aiAnalysisService');
const faceAnnotationService = require('../services/faceAnnotationService');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});


const analyzeFaceImage = async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file uploaded',
        message: 'Please upload a valid image file'
      });
    }

    
    const { options = [] } = req.body;
    let analysisOptions = [];
    
    if (typeof options === 'string') {
      try {
        analysisOptions = JSON.parse(options);
      } catch (e) {
        analysisOptions = options.split(',').map(opt => opt.trim());
      }
    } else if (Array.isArray(options)) {
      analysisOptions = options;
    }

    console.log('Processing face analysis request...');
    console.log('File info:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: `${Math.round(req.file.buffer.length / 1024)}KB`
    });
    console.log('Analysis options:', analysisOptions);

    const startTime = Date.now();

    const analysisResult = await aiAnalysisService.analyzeFace(req.file.buffer, analysisOptions);

    // Create annotated image with visual overlays
    console.log('Creating annotated image...');
    const annotatedImageBuffer = await faceAnnotationService.createAnnotatedImage(
      req.file.buffer, 
      analysisResult.data
    );

    // Convert annotated image to base64 for frontend display
    const annotatedImageBase64 = annotatedImageBuffer.toString('base64');
    const annotatedImageUrl = `data:image/png;base64,${annotatedImageBase64}`;

    // Calculate processing time
    const processingTime = Date.now() - startTime;
    analysisResult.data.analysis.actualProcessingTime = processingTime;

    // Generate comprehensive beauty report
    const beautyReport = aiAnalysisService.generateBeautyReport(analysisResult.data);

    console.log('Face analysis completed successfully');
    console.log('Processing time:', `${processingTime}ms`);
    console.log('Detected face shape:', analysisResult.data.faceShape?.shape);
    console.log('Detected skin tone:', analysisResult.data.skinTone?.tone);

    res.status(200).json({
      success: true,
      message: 'Face analysis completed successfully',
      data: {
        ...analysisResult.data,
        beautyReport,
        annotatedImage: annotatedImageUrl,
        originalImage: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
      },
      meta: {
        processingTime,
        imageInfo: {
          originalName: req.file.originalname,
          size: req.file.buffer.length,
          type: req.file.mimetype
        },
        requestedOptions: analysisOptions
      }
    });

  } catch (error) {
    console.error('Face analysis error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Face analysis failed',
      message: error.message || 'An error occurred while analyzing the image',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Get available analysis options
 */
const getAnalysisOptions = async (req, res) => {
  try {
    const options = {
      available: [
        {
          id: 'Haircut',
          name: 'Haircut Recommendations',
          description: 'Get personalized haircut suggestions based on your face shape',
        },

        {
          id: 'Eye brow shape',
          name: 'Eyebrow Shaping',
          description: 'Find the perfect eyebrow shape for your facial features',
        }
        
      ],
      faceShapes: [
        { name: 'Oval', description: 'Balanced proportions, versatile styling options' },
        { name: 'Round', description: 'Soft curves, fuller cheeks' },
        { name: 'Square', description: 'Strong jawline, angular features' },
        { name: 'Heart', description: 'Wider forehead, narrow chin' },
        { name: 'Oblong', description: 'Longer face, balanced width' },
        { name: 'Diamond', description: 'Wide cheekbones, narrow forehead and jaw' }
      ],
      skinTones: [
        { name: 'Warm', description: 'Golden, yellow, or olive undertones' },
        { name: 'Cool', description: 'Pink, red, or blue undertones' },
        { name: 'Neutral', description: 'Balanced mix of warm and cool undertones' }
      ]
    };

    res.status(200).json({
      success: true,
      message: 'Analysis options retrieved successfully',
      data: options
    });

  } catch (error) {
    console.error('Error getting analysis options:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to get analysis options',
      message: error.message
    });
  }
};

/**
 * Get sample recommendations for demonstration
 */
const getSampleRecommendations = async (req, res) => {
  try {
    const { faceShape = 'oval', skinTone = 'neutral' } = req.query;

    const sampleData = {
      faceShape: { shape: faceShape, confidence: 85 },
      skinTone: { tone: skinTone, confidence: 82 }
    };

    const recommendations = {
      haircut: aiAnalysisService.getHaircutRecommendations(sampleData.faceShape),
      hairColor: aiAnalysisService.getHairColorRecommendations(sampleData.skinTone),
      eyebrows: aiAnalysisService.getEyebrowRecommendations(sampleData.faceShape)
    };

    const beautyReport = aiAnalysisService.generateBeautyReport({
      ...sampleData,
      ...recommendations
    });

    res.status(200).json({
      success: true,
      message: 'Sample recommendations generated',
      data: {
        ...sampleData,
        ...recommendations,
        beautyReport
      },
      note: 'These are sample recommendations. Upload your photo for personalized analysis.'
    });

  } catch (error) {
    console.error('Error generating sample recommendations:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate sample recommendations',
      message: error.message
    });
  }
};

module.exports = {
  analyzeFaceImage,
  getAnalysisOptions,
  getSampleRecommendations,
  upload
};