import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './FaceRecognition.css';

const FaceRecognition = () => {
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const toggle = (opt) => {
    setSelected(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  };

  const submit = () => {
    console.log('submit', { selected, preview });
    alert('Submitted — check console');
  };

  return (
    <div className="face-page">
      <Header />
      <main className="container face-main">
        <div className="face-wrap">
          <div className="face-left">
            <div className="circle">
              {preview ? <img src={preview} alt="preview"/> : <div className="plus">+</div>}
            </div>
            <div className="face-actions">
              <button className="btn" onClick={() => alert('Click Me pressed')}>Click Me</button>
              <label className="upload-label btn">
                <input type="file" accept="image/*" onChange={handleUpload} />
                Upload Photo
              </label>
            </div>
          </div>

          <aside className="face-right">
            <h3>AI Recommendation</h3>
            <p>Select options you want recommendations for</p>
            <div className="ai-options">
              {['Haircut','Hair color','Eye brow shape'].map(opt => (
                <div key={opt} className={`ai-opt ${selected.includes(opt)?'sel':''}`} onClick={() => toggle(opt)}>{opt}</div>
              ))}
            </div>
            <button className="btn btn-secondary" onClick={submit} style={{marginTop:20}}>Submit</button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaceRecognition;
