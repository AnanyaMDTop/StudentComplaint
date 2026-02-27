import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const res = await api.get('/complaints');
      setComplaints(res.data);
    };
    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>My Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <ul>
          {complaints.map((c) => (
            <li key={c._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <strong>{c.title}</strong> (Priority: {c.priority})<br />
              Category: {c.category}<br />
              Status: <span style={{ fontWeight: 'bold' }}>{c.status}</span><br />
              Description: {c.description}<br />
              <small>Created: {new Date(c.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}