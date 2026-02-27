import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState({ category: '', status: '' });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filter.category) params.append('category', filter.category);
    if (filter.status) params.append('status', filter.status);
    api.get(`/complaints?${params.toString()}`).then((res) => setComplaints(res.data));
  }, [filter]);

  const updateStatus = async (id, newStatus) => {
    await api.put(`/complaints/${id}`, { status: newStatus });
    // Refresh list
    setFilter({ ...filter }); // trigger useEffect
  };

  return (
    <div>
      <h2>All Complaints</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Filter by Category: </label>
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">All</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Furniture">Furniture</option>
          <option value="Other">Other</option>
        </select>

        <label style={{ marginLeft: '1rem' }}>Filter by Status: </label>
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Student</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.category}</td>
                <td>{c.priority}</td>
                <td>{c.status}</td>
                <td>{c.createdBy?.username}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}