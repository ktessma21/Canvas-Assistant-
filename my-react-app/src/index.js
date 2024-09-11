import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupLoginForm from './SignupLoginForm'; // Import Signup/Login component
import HomePage from './HomePage'; // Import HomePage component
import './style.css'; // Import common CSS styles

const Index = () => {
  // You can use state or any logic directly in this main component
  const [userName, setUserName] = useState('John Doe'); // Example state
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignupLoginForm />} />
      <Route path="/home" element={<HomePage userName={userName} />} />
      </Routes>
    </Router>
  );
};

// Get the root element in index.html
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the Index component
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
