import { Routes, Route, Link } from 'react-router-dom';
import AllComplaints from './AllComplaints';

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="/admin">All Complaints</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AllComplaints />} />
      </Routes>
    </div>
  );
}