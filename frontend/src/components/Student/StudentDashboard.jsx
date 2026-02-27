import { Routes, Route, Link } from 'react-router-dom';
import ComplaintForm from './ComplaintForm';
import ComplaintList from './ComplaintList';

export default function StudentDashboard() {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <nav>
        <Link to="/student">My Complaints</Link> |{' '}
        <Link to="/student/new">New Complaint</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ComplaintList />} />
        <Route path="/new" element={<ComplaintForm />} />
      </Routes>
    </div>
  );
}