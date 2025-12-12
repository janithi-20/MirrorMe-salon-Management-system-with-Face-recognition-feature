import React, { useEffect, useState } from 'react';
import './Profile.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('customer') || localStorage.getItem('user');
      if (raw && raw !== 'null') {
        const obj = JSON.parse(raw);
        setCustomer(obj);
        setForm({
          firstName: obj.firstName || '',
          lastName: obj.lastName || '',
          email: obj.email || '',
          phoneNumber: obj.phoneNumber || ''
        });
      }
    } catch (e) {
      console.error('Failed to load customer from localStorage', e);
    }

    const handler = (e) => {
      try {
        const u = e && e.detail && e.detail.user;
        if (u) {
          setCustomer(u);
          setForm({
            firstName: u.firstName || '',
            lastName: u.lastName || '',
            email: u.email || '',
            phoneNumber: u.phoneNumber || ''
          });
        }
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('customerUpdated', handler);
    return () => window.removeEventListener('customerUpdated', handler);
  }, []);

  const handleSave = async () => {
    if (!customer) return;
    setSaving(true);
    let persisted = null;

    try {
      const targetId = encodeURIComponent(customer._id || customer.id || customer.customerId);

      // Attempt primary PUT /customers/:id
      try {
        let res = await fetch(`http://localhost:5000/customers/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });

        let text = await res.text();
        let data = null;
        try { data = JSON.parse(text); } catch (e) { data = null; }

        if (res.ok) {
          persisted = (data && data.user) ? data.user : null;
        } else if (res.status === 404) {
          // Try admin PUT
          try {
            res = await fetch(`http://localhost:5000/admin/customers/${targetId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form)
            });
            text = await res.text();
            try { data = JSON.parse(text); } catch (e) { data = null; }
            if (res.ok) persisted = (data && data.user) ? data.user : null;
            else {
              const msg = (data && (data.message || data.error)) ? (data.message || data.error) : text || `HTTP ${res.status}`;
              alert('Failed saving profile to server (admin fallback): ' + msg);
            }
          } catch (adminErr) {
            console.error('Admin fallback error', adminErr);
            alert('Network error while saving profile to admin endpoint: ' + (adminErr && adminErr.message ? adminErr.message : String(adminErr)));
          }

          // If still not persisted, try tolerant POST /customers/update
          if (!persisted) {
            try {
              const r2 = await fetch('http://localhost:5000/customers/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: customer._id || customer.id || customer.customerId, ...form })
              });
              const t2 = await r2.text();
              let d2 = null;
              try { d2 = JSON.parse(t2); } catch (ex) { d2 = null; }
              if (r2.ok) persisted = (d2 && d2.user) ? d2.user : null;
              else {
                const msg = (d2 && (d2.message || d2.error)) ? (d2.message || d2.error) : t2 || `HTTP ${r2.status}`;
                alert('Failed saving profile to server (fallback update): ' + msg);
              }
            } catch (err2) {
              console.error('Fallback POST /customers/update error', err2);
            }
          }
        } else {
          const msg = (data && (data.message || data.error)) ? (data.message || data.error) : text || `HTTP ${res.status}`;
          alert('Failed saving profile to server: ' + msg);
        }
      } catch (e) {
        console.error('Network error while saving profile', e);
        alert('Network error while saving profile: ' + (e && e.message ? e.message : String(e)));
      }

      const updated = persisted ? persisted : { ...(customer || {}), ...form };
      // Remove serviceUrl if present to hide the field system-wide
      try { if (updated && Object.prototype.hasOwnProperty.call(updated, 'serviceUrl')) delete updated.serviceUrl; } catch (e) { }
      try { localStorage.setItem('customer', JSON.stringify(updated)); localStorage.setItem('user', JSON.stringify(updated)); } catch (e) { }
      try { window.dispatchEvent(new CustomEvent('customerUpdated', { detail: { user: updated } })); } catch (ex) { const evt = document.createEvent('CustomEvent'); evt.initCustomEvent('customerUpdated', true, true, { user: updated }); window.dispatchEvent(evt); }
      setCustomer(updated);

      if (persisted) {
        alert('Profile updated and saved to server');
      } else {
        alert('Profile updated locally but not saved to server. Please check your connection and try again.');
      }

    } catch (err) {
      console.error('Profile save error', err);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-container">
        <div className="profile-header-row">
          <div className="profile-header-left">
            <h1>{customer ? `${customer.firstName || ''} ${customer.lastName || ''}` : 'Guest'}</h1>
            <div className="profile-sub">{customer ? customer.email : ''} · {customer ? customer.phoneNumber : ''}</div>
          </div>
          <div className="profile-header-right">
            <button className="btn save-top" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
          </div>
        </div>

        <div className="profile-form">
          <h3 className="section-title">Personal details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>First name</label>
              <input value={form.firstName} onChange={(e) => setForm(s => ({ ...s, firstName: e.target.value }))} placeholder="First name" />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input value={form.lastName} onChange={(e) => setForm(s => ({ ...s, lastName: e.target.value }))} placeholder="Last name" />
            </div>

            <div className="form-group">
              <label>Mobile number</label>
              <input value={form.phoneNumber} onChange={(e) => setForm(s => ({ ...s, phoneNumber: e.target.value }))} placeholder="Mobile number" />
            </div>

            <div className="form-group">
              <label>Email ID</label>
              <input value={form.email} onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))} placeholder="Email" />
            </div>

            
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Profile;