// OfflineForm.js
import React, { useState } from 'react';

const OfflineForm = ({ toggleMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user data locally for later submission when online
    localStorage.setItem('offlineUserData', JSON.stringify({ name, email, password }));

    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');

    // Inform the user about offline registration
    alert('You are offline. Your registration will be submitted when you are back online.');
  };

  return (
    <div>
      <h2>Offline Mode</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Register Offline</button>
      </form>
      <button onClick={toggleMode}>Switch to Online Mode</button>
    </div>
  );
};

export default OfflineForm;
