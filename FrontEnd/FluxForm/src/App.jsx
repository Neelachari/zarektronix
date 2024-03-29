import React, { useState, useEffect } from 'react';
import OnlineForm from './Components/OnlineForm';
import OfflineForm from './Components/OfflineForm';
import './App.css'

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      <h1 >Welcome to FluxForm Signup</h1>
      {isOnline ? (
        <OnlineForm  />
      ) : (
        <OfflineForm  />
      )}
    </div>
  );
};

export default App;