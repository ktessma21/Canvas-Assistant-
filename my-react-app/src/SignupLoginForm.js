import React, { useState, useEffect } from 'react';
import './SignupLoginForm.css'; 
import universities from './data/universities_with_lms_urls1.json'; // Import the JSON data

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
    <div className="form-container">
      <div className="form-background">
        <div className="form-box">
          <h2>{isNewUser ? 'Sign Up' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            {isNewUser && (
              <>
                <input
                  type="text"
                  name="preferredName"
                  placeholder="Preferred Name"
                  value={formData.preferredName}
                  onChange={handleChange}
                  required
                />
                <select
                  name="universityName"
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
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-button">
              {isNewUser ? 'Register' : 'Login'}
            </button>
          </form>
          <p onClick={handleToggle} className="toggle-text">
            {isNewUser ? 'Already have an account? Login' : "New user? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupLoginForm;
