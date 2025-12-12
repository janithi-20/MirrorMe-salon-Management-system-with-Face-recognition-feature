import React, { useEffect, useState } from 'react';
import './Admin.css';

const CustomersList = ({ onBack }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Primary admin endpoint
        let res = await fetch('http://localhost:5000/admin/customers');
        let data;

        if (res.status === 404) {
          // Fallback debug endpoint (available in backend/server.js)
          console.warn('/admin/customers returned 404, trying /debug/users');
          res = await fetch('http://localhost:5000/debug/users');
        }

        if (!res.ok) {
          // Surface status for easier debugging
          throw new Error(`HTTP ${res.status}`);
        }

        data = await res.json();

        // Support two response shapes:
        //  - { success: true, customers: [...] }
        //  - { success: true, users: [...], totalUsers }
        if (data.success && Array.isArray(data.customers)) {
          setCustomers(data.customers);
        } else if (data.success && Array.isArray(data.users)) {
          setCustomers(data.users);
        } else {
          // If payload doesn't match expected shapes, set empty with message
          console.warn('Unexpected customers payload', data);
          setCustomers([]);
          setError('No customer data returned from server');
        }
      } catch (err) {
        console.error('Failed fetching customers:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="section-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>Registered Customers</h2>
          <button
            className="back-btn"
            onClick={onBack}
            style={{
              padding: '30',
              width: '300px',
              height: '32px',
              fontSize: '13px',
              lineHeight: '14px',
              borderRadius: '6px',
              minWidth: '7px',
              overflow: 'hidden'
            }}
          >
            Back
          </button>
      </div>

      {loading && <div>Loading customers...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {!loading && !error && (
        <div className="customers-table" style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <input
              type="search"
              placeholder="Search by name, email, phone or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px', width: 360, borderRadius: 6, border: '1px solid #ddd' }}
            />
            <div style={{ color: '#666', fontSize: 14 }}>{customers.length} customers</div>
          </div>

          {(() => {
            const q = search.trim().toLowerCase();
            const filtered = q ? customers.filter(c => {
              const fullName = `${(c.firstName || '').toLowerCase()} ${(c.lastName || '').toLowerCase()}`;
              return (
                (c.customerId || '').toLowerCase().includes(q) ||
                fullName.includes(q) ||
                (c.email || '').toLowerCase().includes(q) ||
                (c.phoneNumber || '').toLowerCase().includes(q)
              );
            }) : customers;

            if (filtered.length === 0) {
              return <div style={{ padding: 12, color: '#666' }}>No customers match your search.</div>;
            }

            return (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #e6e6e6' }}>
                    <th style={{ padding: '8px' }}>#</th>
                    <th style={{ padding: '8px' }}>Customer ID</th>
                    <th style={{ padding: '8px' }}>Name</th>
                    <th style={{ padding: '8px' }}>Email</th>
                    <th style={{ padding: '8px' }}>Phone</th>
                    <th style={{ padding: '8px' }}>Verified</th>
                    <th style={{ padding: '8px' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c._id} style={{ borderBottom: '1px solid #f3f3f3' }}>
                      <td style={{ padding: '8px' }}>{i + 1}</td>
                      <td style={{ padding: '8px' }}>{c.customerId}</td>
                      <td style={{ padding: '8px' }}>{c.firstName} {c.lastName}</td>
                      <td style={{ padding: '8px' }}>{c.email}</td>
                      <td style={{ padding: '8px' }}>{c.phoneNumber}</td>
                      <td style={{ padding: '8px' }}>{c.isVerified ? 'Yes' : 'No'}</td>
                      <td style={{ padding: '8px' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default CustomersList;
