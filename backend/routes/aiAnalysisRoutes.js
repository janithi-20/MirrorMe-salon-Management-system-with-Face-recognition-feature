// routes/aiAnalysisRoutes.js
const express = require('express');
const router = express.Router();
const { 
  analyzeFaceImage, 
  getAnalysisOptions, 
  getSampleRecommendations, 
  upload 
} = require('../controllers/aiAnalysisController');

/**
 * @swagger
 * components:
 *   schemas:
 *     FaceAnalysisResult:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             faceShape:
 *               type: object
 *               properties:
 *                 shape:
 *                   type: string
 *                   enum: [oval, round, square, heart, oblong, diamond]
 *                 confidence:
 *                   type: number
 *             skinTone:
 *               type: object
 *               properties:
 *                 tone:
 *                   type: string
 *                   enum: [warm, cool, neutral]
 *                 confidence:
 *                   type: number
 *             haircut:
 *               type: object
 *               properties:
 *                 recommended:
 *                   type: array
 *                   items:
 *                     type: string
 *             hairColor:
 *               type: object
 *               properties:
 *                 colors:
 *                   type: array
 *                   items:
 *                     type: object
 *             eyebrows:
 *               type: object
 *               properties:
 *                 shapes:
 *                   type: array
 *                   items:
 *                     type: string
 *     AnalysisOptions:
 *       type: object
 *       properties:
 *         available:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 */

/**
 * @swagger
 * /ai/analyze:
 *   post:
 *     summary: Analyze face image for beauty recommendations
 *     tags: [AI Analysis]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: Face image to analyze (jpeg, jpg, png, gif, webp)
 *       - in: formData
 *         name: options
 *         type: string
 *         description: JSON array of analysis options ["Haircut", "Hair color", "Eye brow shape"]
 *     responses:
 *       200:
 *         description: Face analysis completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FaceAnalysisResult'
 *       400:
 *         description: Bad request - Invalid image or missing file
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/analyze', upload.single('image'), analyzeFaceImage);

/**
 * @swagger
 * /ai/options:
 *   get:
 *     summary: Get available analysis options
 *     tags: [AI Analysis]
 *     responses:
 *       200:
 *         description: Analysis options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/AnalysisOptions'
 */
router.get('/options', getAnalysisOptions);

/**
 * @swagger
 * /ai/sample:
 *   get:
 *     summary: Get sample recommendations for demonstration
 *     tags: [AI Analysis]
 *     parameters:
 *       - in: query
 *         name: faceShape
 *         schema:
 *           type: string
 *           enum: [oval, round, square, heart, oblong, diamond]
 *         description: Face shape for sample recommendations
 *       - in: query
 *         name: skinTone
 *         schema:
 *           type: string
 *           enum: [warm, cool, neutral]
 *         description: Skin tone for sample recommendations
 *     responses:
 *       200:
 *         description: Sample recommendations generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FaceAnalysisResult'
 */
router.get('/sample', getSampleRecommendations);

module.exports = router;