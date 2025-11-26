import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './FaceRecognition.css';

const FaceRecognition = () => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [availableOptions, setAvailableOptions] = useState([]);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const videoRef = React.useRef(null);

  // Fetch available analysis options on component mount
  useEffect(() => {
    fetchAnalysisOptions();
  }, []);

  const fetchAnalysisOptions = async () => {
    try {
      const response = await fetch('http://localhost:5000/ai/options');
      const data = await response.json();
      
      if (data.success) {
        // Filter out hair color analysis option
        const filteredOptions = data.data.available.filter(option => 
          !option.id.toLowerCase().includes('hair color') && 
          !option.name.toLowerCase().includes('hair color')
        );
        setAvailableOptions(filteredOptions);
      }
    } catch (error) {
      console.error('Failed to fetch analysis options:', error);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }
    
    setError('');
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    
    // Clear previous results
    setResults(null);
  };

  const toggleOption = (optionId) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(x => x !== optionId) 
        : [...prev, optionId]
    );
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      setError('Please upload an image first');
      return;
    }

    setLoading(true);
    setAnalyzing(true);
    setError('');
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('options', JSON.stringify(selectedOptions));

      console.log('Starting face analysis...');
      console.log('File:', selectedFile.name);
      console.log('Options:', selectedOptions);

      const response = await fetch('http://localhost:5000/ai/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Analysis failed');
      }

      if (data.success) {
        console.log('Analysis completed successfully');
        setResults(data.data);
      } else {
        throw new Error(data.message || 'Analysis failed');
      }

    } catch (error) {
      console.error('Analysis error:', error);
      setError(error.message || 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  const loadSampleRecommendations = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/ai/sample?faceShape=oval&skinTone=neutral');
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Failed to load sample recommendations:', error);
      setError('Failed to load sample recommendations');
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setPreview(null);
    setSelectedFile(null);
    setResults(null);
    setError('');
    setSelectedOptions([]);
    setShowAnnotations(true);
    stopCamera();
  };

  const startCamera = async () => {
    try {
      setError('');
      setCameraLoading(true);
      console.log('Starting camera...');
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });
      
      console.log('Camera stream obtained');
      setStream(mediaStream);
      setIsCameraOpen(true);
      
      // Wait for component to re-render and then set video source
      setTimeout(() => {
        if (videoRef.current && mediaStream) {
          console.log('Setting video source');
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().then(() => {
            setCameraLoading(false);
            console.log('Camera ready');
          }).catch(e => {
            console.error('Video play error:', e);
            setCameraLoading(false);
            setError('Failed to start video. Please try again.');
          });
        }
      }, 100);
      
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraLoading(false);
      if (error.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access and try again.');
      } else if (error.name === 'NotFoundError') {
        setError('No camera found. Please connect a camera and try again.');
      } else {
        setError('Unable to access camera. Please check permissions or use file upload instead.');
      }
    }
  };

  const stopCamera = () => {
    console.log('Stopping camera...');
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log('Camera track stopped');
      });
      setStream(null);
    }
    setIsCameraOpen(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !isCameraOpen || !stream) {
      setError('Camera not available');
      return;
    }

    try {
      console.log('Capturing photo...');
      
      // Check if video is playing
      if (videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
        setError('Camera not ready. Please wait a moment and try again.');
        return;
      }

      // Create canvas to capture frame
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      // Get actual video dimensions
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;
      
      if (videoWidth === 0 || videoHeight === 0) {
        setError('Camera not ready. Please wait and try again.');
        return;
      }
      
      // Set canvas dimensions to video dimensions
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      
      console.log(`Canvas dimensions: ${videoWidth}x${videoHeight}`);
      
      // Draw current video frame to canvas (flip horizontally for mirror effect)
      context.save();
      context.scale(-1, 1);
      context.drawImage(videoRef.current, -videoWidth, 0, videoWidth, videoHeight);
      context.restore();
      
      // Convert canvas to blob and create file
      canvas.toBlob((blob) => {
        if (blob) {
          console.log('Photo blob created:', blob.size, 'bytes');
          
          // Create a File object from the blob
          const timestamp = new Date().getTime();
          const file = new File([blob], `camera-photo-${timestamp}.jpg`, { type: 'image/jpeg' });
          
          // Set the captured photo as selected file
          setSelectedFile(file);
          
          // Create preview URL (also flipped for consistency)
          const photoURL = canvas.toDataURL('image/jpeg', 0.9);
          setPreview(photoURL);
          
          // Stop camera after capturing
          stopCamera();
          
          // Clear previous results
          setResults(null);
          
          console.log('Photo captured successfully');
        } else {
          console.error('Failed to create blob from canvas');
          setError('Failed to capture photo. Please try again.');
        }
      }, 'image/jpeg', 0.9);
      
    } catch (error) {
      console.error('Photo capture error:', error);
      setError('Failed to capture photo. Please try again.');
    }
  };

  // Cleanup camera on component unmount
  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="face-page">
      <Header />
      <main className="container face-main">
        <div className="face-wrap">
          <div className="face-left">
            <div className="image-display">
              <div className="circle">
                {isCameraOpen ? (
                  <>
                    <video 
                      ref={videoRef}
                      className="camera-video"
                      autoPlay 
                      playsInline
                      muted
                      onLoadedMetadata={() => {
                        console.log('Video metadata loaded');
                      }}
                      onCanPlay={() => {
                        console.log('Video can play');
                      }}
                    />
                    {cameraLoading && (
                      <div className="camera-overlay">
                        <div className="camera-spinner"></div>
                        <span>Starting camera...</span>
                      </div>
                    )}
                  </>
                ) : results && results.annotatedImage && showAnnotations ? (
                  <img src={results.annotatedImage} alt="Analyzed face with annotations" />
                ) : preview ? (
                  <img src={preview} alt="preview" />
                ) : (
                  <div className="plus">+</div>
                )}
                {analyzing && (
                  <div className="analysis-overlay">
                    <div className="analysis-spinner"></div>
                    <span>Analyzing...</span>
                  </div>
                )}
              </div>

              {results && results.annotatedImage && (
                <div className="image-controls">
                  <button
                    className={`toggle-btn ${showAnnotations ? 'active' : ''}`}
                    onClick={() => setShowAnnotations(true)}
                  >
                    Analysis View
                  </button>
                  <button
                    className={`toggle-btn ${!showAnnotations ? 'active' : ''}`}
                    onClick={() => setShowAnnotations(false)}
                  >
                    Original Photo
                  </button>
                </div>
              )}

              {results && results.annotatedImage && (
                <div className="analysis-legend">
                  <h6>Visual Guide:</h6>
                  <div className="legend-items">
                    <div className="legend-item">
                      <span className="legend-color face-outline"></span>
                      <span>Face Region</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color measurements"></span>
                      <span>Measurements</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color key-points"></span>
                      <span>Key Points</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color face-shape"></span>
                      <span>Face Shape</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="face-actions">
              {!isCameraOpen ? (
                <>
                  <button 
                    className="btn btn-camera" 
                    onClick={startCamera}
                    disabled={loading || cameraLoading}
                  >
                    {cameraLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Starting...
                      </>
                    ) : (
                      ' Open Camera'
                    )}
                  </button>
                  
                  <label className="upload-label btn">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleUpload}
                      disabled={loading || cameraLoading}
                    />
                     Upload Photo
                  </label>
                </>
              ) : (
                <>
                  <button 
                    className="btn btn-capture" 
                    onClick={capturePhoto}
                    disabled={loading || cameraLoading}
                  >
                    Capture Photo
                  </button>
                  
                  <button 
                    className="btn btn-cancel" 
                    onClick={stopCamera}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </>
              )}

              {(preview || isCameraOpen) && (
                <button 
                  className="btn btn-reset" 
                  onClick={resetAnalysis}
                  disabled={loading}
                >
                  Reset
                </button>
              )}
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">!</span>
                {error}
              </div>
            )}
          </div>

          <aside className="face-right">
            <h3>AI Beauty Analysis</h3>
            <p>Select what you'd like AI recommendations for:</p>
            
            <div className="ai-options">
              {availableOptions.map(option => (
                <div 
                  key={option.id} 
                  className={`ai-opt ${selectedOptions.includes(option.id) ? 'sel' : ''}`} 
                  onClick={() => toggleOption(option.id)}
                >
                  <div className="option-content">
                    <strong>{option.name}</strong>
                    <small>{option.description}</small>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="btn btn-analyze" 
              onClick={analyzeImage}
              disabled={loading || !selectedFile}
              style={{marginTop: 20}}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Analyzing...
                </>
              ) : (
                'Analyze Image'
              )}
            </button>

            {results && (
              <div className="results-section">
                <h4>Your Personalized Recommendations</h4>
                
                {results.faceShape && (
                  <div className="result-item">
                    <h5>Face Shape: {results.faceShape.shape}</h5>
                    <div className="confidence">
                      Confidence: {results.faceShape.confidence}%
                    </div>
                  </div>
                )}

                {results.haircut && (
                  <div className="result-item">
                    <h5>Recommended Haircuts:</h5>
                    <p className="description">{results.haircut.description}</p>
                    <ul className="recommendation-list">
                      {results.haircut.recommended.map((style, index) => (
                        <li key={index}>{style}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.eyebrows && (
                  <div className="result-item">
                    <h5>Recommended Eyebrow Shapes:</h5>
                    <p className="description">{results.eyebrows.description}</p>
                    <ul className="recommendation-list">
                      {results.eyebrows.shapes.map((shape, index) => (
                        <li key={index}>{shape}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaceRecognition;
