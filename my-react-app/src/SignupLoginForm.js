import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Ensure this CSS file includes the new custom styles
import universities from './data/universities_with_lms_urls1.json';

function SignupLoginForm() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [formData, setFormData] = useState({
    preferredName: '',
    universityName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setIsNewUser(!isNewUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card form-background shadow p-4">
        <h2 className="mb-4 text-center">{isNewUser ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isNewUser && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="preferredName"
                  className="form-control"
                  placeholder="Preferred Name"
                  value={formData.preferredName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  name="universityName"
                  className="form-select"
                  value={formData.universityName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select University</option>
                  {universities.map((university, index) => (
                    <option key={index} value={university.name}>
                      {university.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            {isNewUser ? 'Register' : 'Login'}
          </button>
        </form>
        <p onClick={handleToggle} className="text-center mt-3 text-primary" style={{ cursor: 'pointer' }}>
          {isNewUser ? 'Already have an account? Login' : 'New user? Sign Up'}
        </p>
      </div>
    </div>
  );
}

export default SignupLoginForm;
