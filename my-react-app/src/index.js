import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' instead of 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupLoginForm from './SignupLoginForm';
import HomePage from './HomePage';
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupLoginForm />} />
        <Route path="/home" element={<HomePage userName="John Doe" />} /> {/* Replace "John Doe" with actual user name */}
      </Routes>
    </Router>
  );
}

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
