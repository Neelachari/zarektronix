// OnlineForm.js (updated)
import React, { useState } from 'react';

const OnlineForm = ({ toggleMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = () => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email before submission
    validateEmail();

    // Check if email is valid before proceeding
    if (!isEmailValid) {
      alert('Please enter a valid email address.');
      return;
    }

    // After validation, you can make a backend API call to register the user
    // For simplicity, just log the user data for now
    console.log({ name, email, password });

    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Online Mode</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail();
          }}
          required
        />
        {!isEmailValid && <span style={{ color: 'red' }}>Invalid email address</span>}
        <br />
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Register</button>
      </form>
      <button onClick={toggleMode}>Switch to Offline Mode</button>
    </div>
  );
};

export default OnlineForm;
