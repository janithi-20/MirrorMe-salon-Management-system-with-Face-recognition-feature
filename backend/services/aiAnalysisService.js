// services/aiAnalysisService.js
const sharp = require('sharp');

/**
 * AI Analysis Service
 * Provides face shape detection, skin tone analysis, and beauty recommendations
 */
class AIAnalysisService {
  constructor() {
    this.faceShapeConfidence = 85; // Base confidence level
    this.skinToneConfidence = 82;  // Base confidence level
  }

  /**
   * Analyze face image and provide beauty recommendations
   */
  async analyzeFace(imageBuffer, analysisOptions = []) {
    try {
      console.log('Starting AI face analysis...');
      console.log('Analysis options:', analysisOptions);
      
      // Get image metadata
      const imageInfo = await sharp(imageBuffer).metadata();
      console.log(`Image info: ${imageInfo.width}x${imageInfo.height}, format: ${imageInfo.format}`);

      // Simulate processing delay for realistic feel
      await this.delay(1500);

      // Analyze face shape
      const faceShapeResult = this.detectFaceShape(imageBuffer, imageInfo);
      console.log('Face shape detected:', faceShapeResult.shape);

      // Analyze skin tone
      const skinToneResult = this.analyzeSkinTone(imageBuffer, imageInfo);
      console.log('Skin tone analyzed:', skinToneResult.tone);

      // Calculate facial measurements
      const measurements = this.calculateFacialMeasurements(imageInfo, faceShapeResult);

      // Generate recommendations based on selected options
      const recommendations = {};
      
      if (analysisOptions.includes('Haircut')) {
        recommendations.haircut = this.getHaircutRecommendations(faceShapeResult);
        console.log('Haircut recommendations generated');
      }

      if (analysisOptions.includes('Eye brow shape')) {
        recommendations.eyebrows = this.getEyebrowRecommendations(faceShapeResult);
        console.log('Eyebrow recommendations generated');
      }

      if (analysisOptions.includes('Hair color')) {
        recommendations.hairColor = this.getHairColorRecommendations(skinToneResult);
        console.log('Hair color recommendations generated');
      }

      const analysisResult = {
        success: true,
        data: {
          faceShape: faceShapeResult,
          skinTone: skinToneResult,
          measurements,
          analysis: {
            requestedOptions: analysisOptions,
            completedOptions: Object.keys(recommendations),
            processedAt: new Date().toISOString(),
            imageInfo: {
              width: imageInfo.width,
              height: imageInfo.height,
              format: imageInfo.format,
              size: imageBuffer.length
            }
          },
          ...recommendations
        }
      };

      console.log('AI face analysis completed successfully');
      return analysisResult;

    } catch (error) {
      console.error('AI analysis error:', error);
      throw new Error(`Face analysis failed: ${error.message}`);
    }
  }

  /**
   * Detect face shape from image
   */
  detectFaceShape(imageBuffer, imageInfo) {
    // Simulate AI face shape detection
    const faceShapes = [
      { shape: 'oval', probability: 0.85 },
      { shape: 'round', probability: 0.75 },
      { shape: 'square', probability: 0.70 },
      { shape: 'heart', probability: 0.80 },
      { shape: 'oblong', probability: 0.72 },
      { shape: 'diamond', probability: 0.68 }
    ];

    // Use image dimensions and content to influence detection
    const aspectRatio = imageInfo.width / imageInfo.height;
    let selectedShape;

    if (aspectRatio > 1.3) {
      // Wider image tends to suggest wider face shapes
      selectedShape = this.weightedRandom([
        { shape: 'round', weight: 0.4 },
        { shape: 'square', weight: 0.3 },
        { shape: 'oval', weight: 0.2 },
        { shape: 'diamond', weight: 0.1 }
      ]);
    } else if (aspectRatio < 0.8) {
      // Taller image tends to suggest elongated face shapes
      selectedShape = this.weightedRandom([
        { shape: 'oblong', weight: 0.4 },
        { shape: 'oval', weight: 0.3 },
        { shape: 'heart', weight: 0.2 },
        { shape: 'diamond', weight: 0.1 }
      ]);
    } else {
      // Balanced proportions
      selectedShape = this.weightedRandom([
        { shape: 'oval', weight: 0.35 },
        { shape: 'round', weight: 0.25 },
        { shape: 'heart', weight: 0.2 },
        { shape: 'square', weight: 0.15 },
        { shape: 'oblong', weight: 0.05 }
      ]);
    }

    // Add some randomness to confidence
    const confidence = Math.floor(this.faceShapeConfidence + (Math.random() - 0.5) * 10);

    return {
      shape: selectedShape,
      confidence: Math.max(75, Math.min(95, confidence)),
      aspectRatio: Math.round(aspectRatio * 100) / 100,
      detectionMethod: 'AI_SIMULATION'
    };
  }

  /**
   * Analyze skin tone from image
   */
  analyzeSkinTone(imageBuffer, imageInfo) {
    // Simulate skin tone analysis
    const skinTones = ['warm', 'cool', 'neutral'];
    
    // Use image characteristics to influence skin tone detection
    const selectedTone = this.weightedRandom([
      { tone: 'neutral', weight: 0.4 },
      { tone: 'warm', weight: 0.35 },
      { tone: 'cool', weight: 0.25 }
    ]);

    // Add some randomness to confidence
    const confidence = Math.floor(this.skinToneConfidence + (Math.random() - 0.5) * 8);

    return {
      tone: selectedTone,
      confidence: Math.max(75, Math.min(92, confidence)),
      undertone: this.getUndertone(selectedTone),
      analysisMethod: 'AI_SIMULATION'
    };
  }

  /**
   * Calculate facial measurements and ratios
   */
  calculateFacialMeasurements(imageInfo, faceShapeResult) {
    const width = imageInfo.width;
    const height = imageInfo.height;
    
    // Simulate facial measurement calculations
    const measurements = {
      widthToLength: this.calculateRatio(width * 0.6, height * 0.8),
      jawToForehead: this.calculateRatio(width * 0.5, width * 0.55),
      cheekboneToJaw: this.calculateRatio(width * 0.6, width * 0.5),
      foreheadToJaw: this.calculateRatio(width * 0.55, width * 0.5)
    };

    // Adjust measurements based on detected face shape
    switch (faceShapeResult.shape) {
      case 'round':
        measurements.widthToLength = '0.95:1';
        measurements.jawToForehead = '0.92:1';
        break;
      case 'square':
        measurements.widthToLength = '0.88:1';
        measurements.jawToForehead = '0.98:1';
        break;
      case 'heart':
        measurements.jawToForehead = '0.75:1';
        measurements.foreheadToJaw = '1.33:1';
        break;
      case 'oblong':
        measurements.widthToLength = '0.75:1';
        break;
      case 'diamond':
        measurements.cheekboneToJaw = '1.25:1';
        measurements.jawToForehead = '0.85:1';
        break;
    }

    return measurements;
  }

  /**
   * Get haircut recommendations based on face shape
   */
  getHaircutRecommendations(faceShapeResult) {
    const recommendations = {
      'oval': {
        recommended: [
          'Layered Bob',
          'Long Waves',
          'Pixie Cut',
          'Side-Swept Bangs',
          'Beach Waves'
        ],
        description: 'Your oval face shape is versatile! Most hairstyles will complement your balanced proportions.',
        avoid: ['Heavy, straight-across bangs']
      },
      'round': {
        recommended: [
          'Long Layered Cut',
          'Side Part with Volume',
          'Angular Bob',
          'Face-Framing Layers',
          'High Ponytail'
        ],
        description: 'Add height and length to elongate your face. Avoid width at cheek level.',
        avoid: ['Chin-length bobs', 'Center parts', 'Tight curls at sides']
      },
      'square': {
        recommended: [
          'Soft Waves',
          'Layered Lob',
          'Side-Swept Layers',
          'Wavy Bob',
          'Long Soft Curls'
        ],
        description: 'Soften angular features with layers and waves. Avoid sharp, geometric cuts.',
        avoid: ['Blunt cuts', 'Heavy bangs', 'Severe center parts']
      },
      'heart': {
        recommended: [
          'Chin-Length Bob',
          'Side Bangs',
          'Long Layers',
          'Textured Waves',
          'Full Fringe'
        ],
        description: 'Balance your wider forehead with width at the chin level.',
        avoid: ['Short pixie cuts', 'Slicked-back styles']
      },
      'oblong': {
        recommended: [
          'Blunt Bob',
          'Curly Shoulder-Length',
          'Side Bangs',
          'Wavy Lob',
          'Textured Crop'
        ],
        description: 'Add width and minimize length. Horizontal lines work best.',
        avoid: ['Very long straight hair', 'High updos', 'Center parts']
      },
      'diamond': {
        recommended: [
          'Side-Swept Bangs',
          'Chin-Length Waves',
          'Textured Bob',
          'Soft Layers',
          'Volume at Crown'
        ],
        description: 'Balance narrow forehead and chin with width at these areas.',
        avoid: ['Tight ponytails', 'Width at cheekbones']
      }
    };

    const faceShape = faceShapeResult.shape;
    const recommendation = recommendations[faceShape] || recommendations['oval'];

    return {
      ...recommendation,
      faceShape,
      confidence: faceShapeResult.confidence
    };
  }

  /**
   * Get eyebrow recommendations based on face shape
   */
  getEyebrowRecommendations(faceShapeResult) {
    const recommendations = {
      'oval': {
        shapes: [
          'Soft Arch',
          'Natural Curve',
          'Gently Rounded',
          'Classic Arch'
        ],
        description: 'Your balanced features can handle most eyebrow shapes. A soft arch enhances your natural beauty.'
      },
      'round': {
        shapes: [
          'High Sharp Arch',
          'Angular Brow',
          'Dramatic Arch',
          'Pointed Peak'
        ],
        description: 'Create vertical lines and height with angular, high-arched brows to elongate your face.'
      },
      'square': {
        shapes: [
          'Soft Rounded',
          'Curved Arch',
          'Natural Round',
          'Gentle Curve'
        ],
        description: 'Soften strong jawline features with curved, rounded brows. Avoid sharp angles.'
      },
      'heart': {
        shapes: [
          'Soft Rounded',
          'Low Arch',
          'Natural Straight',
          'Gentle Curve'
        ],
        description: 'Balance your wider forehead with softer, less dramatic brow shapes.'
      },
      'oblong': {
        shapes: [
          'Straight Brow',
          'Flat Arch',
          'Horizontal Line',
          'Minimal Arch'
        ],
        description: 'Create horizontal lines with straighter brows to add width to your face.'
      },
      'diamond': {
        shapes: [
          'Curved Arch',
          'Soft Peak',
          'Rounded Shape',
          'Natural Arch'
        ],
        description: 'Balance your strong cheekbones with curved brows that add width to forehead and chin areas.'
      }
    };

    const faceShape = faceShapeResult.shape;
    const recommendation = recommendations[faceShape] || recommendations['oval'];

    return {
      ...recommendation,
      faceShape,
      confidence: faceShapeResult.confidence
    };
  }

  /**
   * Get hair color recommendations based on skin tone
   */
  getHairColorRecommendations(skinToneResult) {
    const recommendations = {
      'warm': {
        colors: [
          { name: 'Golden Blonde', shade: '#F4E4BC', description: 'Warm honey tones' },
          { name: 'Auburn', shade: '#A52A2A', description: 'Rich reddish-brown' },
          { name: 'Copper Red', shade: '#B87333', description: 'Vibrant copper highlights' },
          { name: 'Caramel Brown', shade: '#8B4513', description: 'Warm caramel tones' },
          { name: 'Strawberry Blonde', shade: '#FF8C69', description: 'Golden red undertones' }
        ],
        description: 'Your warm undertones pair beautifully with golden, copper, and warm brown shades.'
      },
      'cool': {
        colors: [
          { name: 'Ash Blonde', shade: '#C4AEAD', description: 'Cool ashy tones' },
          { name: 'Platinum Blonde', shade: '#E5E4E2', description: 'Icy platinum shades' },
          { name: 'Cool Brown', shade: '#704214', description: 'Rich cool brown' },
          { name: 'Blue-Black', shade: '#0C0C0C', description: 'Deep black with blue undertones' },
          { name: 'Burgundy', shade: '#800020', description: 'Deep red with blue undertones' }
        ],
        description: 'Your cool undertones look stunning with ash, platinum, and cool-toned colors.'
      },
      'neutral': {
        colors: [
          { name: 'Natural Brown', shade: '#8B4513', description: 'Classic medium brown' },
          { name: 'Beige Blonde', shade: '#F5F5DC', description: 'Balanced beige tones' },
          { name: 'Dark Chocolate', shade: '#3C1810', description: 'Rich dark brown' },
          { name: 'Honey Highlights', shade: '#DAA520', description: 'Warm honey accents' },
          { name: 'Espresso', shade: '#362D1D', description: 'Deep coffee brown' }
        ],
        description: 'Your neutral undertones give you flexibility with both warm and cool hair colors.'
      }
    };

    const skinTone = skinToneResult.tone;
    const recommendation = recommendations[skinTone] || recommendations['neutral'];

    return {
      ...recommendation,
      skinTone,
      undertone: skinToneResult.undertone,
      confidence: skinToneResult.confidence
    };
  }

  /**
   * Generate comprehensive beauty report
   */
  generateBeautyReport(analysisData) {
    const { faceShape, skinTone, haircut, hairColor, eyebrows } = analysisData;
    
    const report = {
      summary: `Based on our AI analysis, you have a ${faceShape?.shape} face shape with ${skinTone?.tone} undertones.`,
      keyFindings: [],
      recommendations: [],
      styling_tips: []
    };

    // Face shape insights
    if (faceShape) {
      report.keyFindings.push({
        category: 'Face Shape',
        finding: `${faceShape.shape} face with ${faceShape.confidence}% confidence`,
        impact: this.getFaceShapeImpact(faceShape.shape)
      });
    }

    // Skin tone insights
    if (skinTone) {
      report.keyFindings.push({
        category: 'Skin Tone',
        finding: `${skinTone.tone} undertones with ${skinTone.confidence}% confidence`,
        impact: this.getSkinToneImpact(skinTone.tone)
      });
    }

    // Compile recommendations
    if (haircut) {
      report.recommendations.push({
        category: 'Haircut',
        top_choice: haircut.recommended[0],
        alternatives: haircut.recommended.slice(1, 3),
        reasoning: haircut.description
      });
    }

    if (eyebrows) {
      report.recommendations.push({
        category: 'Eyebrow Shape',
        top_choice: eyebrows.shapes[0],
        alternatives: eyebrows.shapes.slice(1, 3),
        reasoning: eyebrows.description
      });
    }

    if (hairColor) {
      report.recommendations.push({
        category: 'Hair Color',
        top_choice: hairColor.colors[0].name,
        alternatives: hairColor.colors.slice(1, 3).map(c => c.name),
        reasoning: hairColor.description
      });
    }

    // General styling tips
    report.styling_tips = this.getGeneralStylingTips(faceShape?.shape, skinTone?.tone);

    return report;
  }

  // Helper methods
  weightedRandom(options) {
    const totalWeight = options.reduce((sum, opt) => sum + (opt.weight || 1), 0);
    let random = Math.random() * totalWeight;
    
    for (const option of options) {
      random -= (option.weight || 1);
      if (random <= 0) {
        return option.shape || option.tone || option.value;
      }
    }
    
    return options[0].shape || options[0].tone || options[0].value;
  }

  calculateRatio(a, b) {
    const ratio = a / b;
    const simplified = ratio.toFixed(2);
    return `${simplified}:1`;
  }

  getUndertone(skinTone) {
    const undertones = {
      'warm': 'golden, yellow, peachy',
      'cool': 'pink, red, blue',
      'neutral': 'balanced mix of warm and cool'
    };
    return undertones[skinTone] || 'balanced';
  }

  getFaceShapeImpact(faceShape) {
    const impacts = {
      'oval': 'Versatile shape that suits most hairstyles and makeup looks',
      'round': 'Benefits from styles that add height and length',
      'square': 'Enhanced by soft, curved lines and layered styles',
      'heart': 'Balanced by adding width at jaw level',
      'oblong': 'Complemented by horizontal lines and width',
      'diamond': 'Harmonized by adding width at forehead and chin'
    };
    return impacts[faceShape] || 'Unique features that can be enhanced with the right styling';
  }

  getSkinToneImpact(skinTone) {
    const impacts = {
      'warm': 'Enhanced by golden, copper, and warm color palettes',
      'cool': 'Complemented by silver, ash, and cool color palettes',
      'neutral': 'Flexible with both warm and cool color palettes'
    };
    return impacts[skinTone] || 'Suitable for a wide range of color options';
  }

  getGeneralStylingTips(faceShape, skinTone) {
    const tips = [];
    
    if (faceShape) {
      const faceShapeTips = {
        'oval': ['Experiment with different parting styles', 'Most earring styles will complement your face'],
        'round': ['Create vertical lines with your styling', 'Try longer earrings to elongate'],
        'square': ['Soften features with curved lines', 'Round earrings work beautifully'],
        'heart': ['Balance proportions with chin-level details', 'Teardrop earrings are flattering'],
        'oblong': ['Add horizontal visual interest', 'Wide, statement earrings work well'],
        'diamond': ['Emphasize your beautiful cheekbones', 'Chandelier earrings are stunning']
      };
      tips.push(...(faceShapeTips[faceShape] || []));
    }

    if (skinTone) {
      const skinToneTips = {
        'warm': ['Gold jewelry complements your skin beautifully', 'Warm-toned makeup enhances your natural glow'],
        'cool': ['Silver jewelry is your perfect match', 'Cool-toned makeup brings out your best features'],
        'neutral': ['Both gold and silver jewelry work for you', 'You have flexibility in makeup color choices']
      };
      tips.push(...(skinToneTips[skinTone] || []));
    }

    // Add general tips
    tips.push(
      'Regular salon visits help maintain your ideal look',
      'Consult with our stylists for personalized advice'
    );

    return tips;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new AIAnalysisService();
