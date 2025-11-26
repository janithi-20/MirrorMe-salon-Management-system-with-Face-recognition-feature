// services/faceAnnotationService.js
const sharp = require('sharp');

/**
 * Face Annotation Service
 * Creates visual annotations on face images using Sharp SVG overlays
 */
class FaceAnnotationService {
  constructor() {
    // Annotation colors for different elements
    this.colors = {
      faceOutline: '#00FF00',      // Green for face boundary
      measurements: '#FF6B35',     // Orange for measurement lines
      keyPoints: '#FF0080',        // Pink for key facial points
      faceShape: '#3366FF',        // Blue for face shape overlay
      skinTone: '#FFD700',         // Gold for skin tone areas
      text: '#FFFFFF',             // White for text labels
      confidence: '#00FF80'        // Light green for confidence indicators
    };
  }

  /**
   * Create annotated image with facial analysis visualization
   */
  async createAnnotatedImage(imageBuffer, analysisData) {
    try {
      console.log('Starting image annotation process...');
      
      // Get image metadata
      const imageInfo = await sharp(imageBuffer).metadata();
      const { width, height } = imageInfo;
      
      console.log(`Image dimensions: ${width}x${height}`);

      // Extract analysis data
      const { faceShape, skinTone, measurements } = analysisData;
      
      // Create SVG overlay with annotations
      const svgOverlay = this.createSVGAnnotations(width, height, faceShape, skinTone, measurements);
      
      // Composite the SVG overlay onto the original image
      const annotatedImageBuffer = await sharp(imageBuffer)
        .composite([{
          input: Buffer.from(svgOverlay),
          top: 0,
          left: 0
        }])
        .png()
        .toBuffer();

      console.log('Image annotation completed successfully');
      return annotatedImageBuffer;

    } catch (error) {
      console.error('Image annotation error:', error);
      
      // Fallback: return original image if annotation fails
      console.log('Returning original image as fallback');
      return await sharp(imageBuffer).png().toBuffer();
    }
  }

  /**
   * Create SVG annotations overlay
   */
  createSVGAnnotations(width, height, faceShape, skinTone, measurements) {
    const face = this.calculateFaceRegion(width, height);
    const points = this.calculateKeyPoints(face);
    
    let svgElements = [];
    
    // Face boundary rectangle
    svgElements.push(`
      <rect x="${face.left}" y="${face.top}" width="${face.width}" height="${face.height}" 
            fill="none" stroke="${this.colors.faceOutline}" stroke-width="3" 
            stroke-dasharray="10,5" opacity="0.8"/>
      <text x="${face.left}" y="${face.top - 10}" font-family="Arial" font-size="14" 
            font-weight="bold" fill="${this.colors.faceOutline}">Face Region</text>
    `);

    // Measurement lines
    svgElements.push(this.createMeasurementLines(points, face));
    
    // Key facial points
    svgElements.push(this.createKeyPoints(points));
    
    // Face shape outline
    svgElements.push(this.createFaceShapeOutline(face, faceShape));
    
    // Skin tone sampling regions
    svgElements.push(this.createSkinToneRegions(face));
    
    // Analysis results panel
    svgElements.push(this.createAnalysisPanel(width, height, faceShape, skinTone));
    
    // Measurement values panel
    svgElements.push(this.createMeasurementPanel(width, height, measurements));

    const svgContent = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${svgElements.join('')}
      </svg>
    `;

    return svgContent;
  }

  /**
   * Create measurement lines
   */
  createMeasurementLines(points, face) {
    let lines = [];

    // Face width line
    lines.push(`
      <line x1="${points.leftCheek.x}" y1="${points.leftCheek.y}" 
            x2="${points.rightCheek.x}" y2="${points.rightCheek.y}" 
            stroke="${this.colors.measurements}" stroke-width="2" 
            stroke-dasharray="5,3" opacity="0.9"/>
      <circle cx="${points.leftCheek.x}" cy="${points.leftCheek.y}" r="4" 
              fill="${this.colors.measurements}"/>
      <circle cx="${points.rightCheek.x}" cy="${points.rightCheek.y}" r="4" 
              fill="${this.colors.measurements}"/>
      <text x="${(points.leftCheek.x + points.rightCheek.x) / 2}" 
            y="${points.leftCheek.y - 10}" font-family="Arial" font-size="12" 
            fill="${this.colors.measurements}" text-anchor="middle">Face Width</text>
    `);

    // Face height line
    lines.push(`
      <line x1="${face.centerX}" y1="${points.forehead.y}" 
            x2="${face.centerX}" y2="${points.chin.y}" 
            stroke="${this.colors.measurements}" stroke-width="2" 
            stroke-dasharray="5,3" opacity="0.9"/>
      <circle cx="${face.centerX}" cy="${points.forehead.y}" r="4" 
              fill="${this.colors.measurements}"/>
      <circle cx="${face.centerX}" cy="${points.chin.y}" r="4" 
              fill="${this.colors.measurements}"/>
      <text x="${face.centerX + 15}" 
            y="${(points.forehead.y + points.chin.y) / 2}" font-family="Arial" font-size="12" 
            fill="${this.colors.measurements}">Face Height</text>
    `);

    return lines.join('');
  }

  /**
   * Create key facial points
   */
  createKeyPoints(points) {
    let pointElements = [];

    Object.entries(points).forEach(([name, point]) => {
      pointElements.push(`
        <circle cx="${point.x}" cy="${point.y}" r="6" 
                fill="${this.colors.keyPoints}" opacity="0.8"/>
        <text x="${point.x + 10}" y="${point.y - 5}" font-family="Arial" font-size="10" 
              fill="${this.colors.keyPoints}" font-weight="bold">${name}</text>
      `);
    });

    return pointElements.join('');
  }

  /**
   * Create face shape outline
   */
  createFaceShapeOutline(face, faceShapeData) {
    if (!faceShapeData || !faceShapeData.shape) return '';
    
    const centerX = face.centerX;
    const centerY = face.centerY;
    const shapeWidth = face.width * 0.4;
    const shapeHeight = face.height * 0.45;

    let shapeElement = '';

    switch (faceShapeData.shape) {
      case 'oval':
        shapeElement = `
          <ellipse cx="${centerX}" cy="${centerY}" rx="${shapeWidth}" ry="${shapeHeight}" 
                   fill="none" stroke="${this.colors.faceShape}" stroke-width="3" opacity="0.7"/>
        `;
        break;

      case 'round':
        const radius = Math.min(shapeWidth, shapeHeight);
        shapeElement = `
          <circle cx="${centerX}" cy="${centerY}" r="${radius}" 
                  fill="none" stroke="${this.colors.faceShape}" stroke-width="3" opacity="0.7"/>
        `;
        break;

      case 'square':
        shapeElement = `
          <rect x="${centerX - shapeWidth}" y="${centerY - shapeHeight}" 
                width="${shapeWidth * 2}" height="${shapeHeight * 2}" rx="10" 
                fill="none" stroke="${this.colors.faceShape}" stroke-width="3" opacity="0.7"/>
        `;
        break;

      case 'heart':
        shapeElement = `
          <path d="M ${centerX} ${centerY + shapeHeight} 
                     Q ${centerX - shapeWidth} ${centerY - shapeHeight/2} ${centerX - shapeWidth/2} ${centerY - shapeHeight}
                     Q ${centerX} ${centerY - shapeHeight * 1.2} ${centerX + shapeWidth/2} ${centerY - shapeHeight}
                     Q ${centerX + shapeWidth} ${centerY - shapeHeight/2} ${centerX} ${centerY + shapeHeight}" 
                fill="none" stroke="${this.colors.faceShape}" stroke-width="3" opacity="0.7"/>
        `;
        break;

      default:
        shapeElement = `
          <ellipse cx="${centerX}" cy="${centerY}" rx="${shapeWidth * 0.8}" ry="${shapeHeight * 1.2}" 
                   fill="none" stroke="${this.colors.faceShape}" stroke-width="3" opacity="0.7"/>
        `;
    }

    return shapeElement;
  }

  /**
   * Create skin tone sampling regions
   */
  createSkinToneRegions(face) {
    const regions = [
      { x: face.centerX - 30, y: face.centerY - 20, size: 20 }, // Center face
      { x: face.left + 40, y: face.top + 60, size: 15 },        // Left cheek
      { x: face.right - 60, y: face.top + 60, size: 15 }        // Right cheek
    ];

    let regionElements = [];

    regions.forEach((region, index) => {
      regionElements.push(`
        <rect x="${region.x - region.size/2}" y="${region.y - region.size/2}" 
              width="${region.size}" height="${region.size}" 
              fill="none" stroke="${this.colors.skinTone}" stroke-width="2" 
              stroke-dasharray="3,3" opacity="0.8"/>
        <text x="${region.x + region.size}" y="${region.y}" font-family="Arial" font-size="10" 
              fill="${this.colors.skinTone}">Skin ${index + 1}</text>
      `);
    });

    return regionElements.join('');
  }

  /**
   * Create analysis results panel
   */
  createAnalysisPanel(width, height, faceShape, skinTone) {
    const padding = 20;
    const boxWidth = 300;
    const boxHeight = 120;
    const x = width - boxWidth - padding;
    const y = padding;

    return `
      <rect x="${x}" y="${y}" width="${boxWidth}" height="${boxHeight}" 
            fill="rgba(0, 0, 0, 0.8)" stroke="${this.colors.confidence}" 
            stroke-width="2" rx="10" opacity="0.9"/>
      
      <text x="${x + 15}" y="${y + 25}" font-family="Arial" font-size="20" 
            font-weight="bold" fill="${this.colors.text}">AI Analysis Results</text>
      
      <text x="${x + 15}" y="${y + 50}" font-family="Arial" font-size="14" 
            font-weight="bold" fill="${this.colors.faceShape}">
            Face Shape: ${faceShape?.shape?.toUpperCase() || 'Unknown'}</text>
      
      <text x="${x + 15}" y="${y + 70}" font-family="Arial" font-size="12" 
            fill="${this.colors.confidence}">
            Confidence: ${faceShape?.confidence || 0}%</text>
      
      <text x="${x + 15}" y="${y + 90}" font-family="Arial" font-size="14" 
            font-weight="bold" fill="${this.colors.skinTone}">
            Skin Tone: ${skinTone?.tone?.toUpperCase() || 'Unknown'}</text>
      
      <text x="${x + 15}" y="${y + 110}" font-family="Arial" font-size="12" 
            fill="${this.colors.confidence}">
            Confidence: ${skinTone?.confidence || 0}%</text>
    `;
  }

  /**
   * Create measurement values panel
   */
  createMeasurementPanel(width, height, measurements) {
    const padding = 20;
    const boxWidth = 250;
    const boxHeight = 140;
    const x = padding;
    const y = height - boxHeight - padding;

    const ratios = [
      `Width/Length: ${measurements?.widthToLength || 'N/A'}`,
      `Jaw/Forehead: ${measurements?.jawToForehead || 'N/A'}`,
      `Cheek/Jaw: ${measurements?.cheekboneToJaw || 'N/A'}`,
      `Forehead/Jaw: ${measurements?.foreheadToJaw || 'N/A'}`
    ];

    let textElements = ratios.map((ratio, index) => 
      `<text x="${x + 15}" y="${y + 50 + (index * 20)}" font-family="Arial" font-size="12" 
             fill="${this.colors.measurements}">${ratio}</text>`
    ).join('');

    return `
      <rect x="${x}" y="${y}" width="${boxWidth}" height="${boxHeight}" 
            fill="rgba(0, 0, 0, 0.8)" stroke="${this.colors.measurements}" 
            stroke-width="2" rx="10" opacity="0.9"/>
      
      <text x="${x + 15}" y="${y + 25}" font-family="Arial" font-size="20" 
            font-weight="bold" fill="${this.colors.text}">Facial Measurements</text>
      
      ${textElements}
    `;
  }

  /**
   * Calculate face region boundaries
   */
  calculateFaceRegion(width, height) {
    const faceWidth = width * 0.5;
    const faceHeight = height * 0.7;
    const left = (width - faceWidth) / 2;
    const top = height * 0.15;

    return {
      left,
      top,
      width: faceWidth,
      height: faceHeight,
      right: left + faceWidth,
      bottom: top + faceHeight,
      centerX: left + faceWidth / 2,
      centerY: top + faceHeight / 2
    };
  }

  /**
   * Calculate key facial landmark points
   */
  calculateKeyPoints(face) {
    return {
      forehead: { x: face.centerX, y: face.top + 20 },
      leftTemple: { x: face.left + face.width * 0.2, y: face.top + 30 },
      rightTemple: { x: face.right - face.width * 0.2, y: face.top + 30 },
      leftCheek: { x: face.left + 10, y: face.centerY },
      rightCheek: { x: face.right - 10, y: face.centerY },
      leftJaw: { x: face.left + face.width * 0.25, y: face.bottom - 30 },
      rightJaw: { x: face.right - face.width * 0.25, y: face.bottom - 30 },
      chin: { x: face.centerX, y: face.bottom - 10 }
    };
  }
}

module.exports = new FaceAnnotationService();