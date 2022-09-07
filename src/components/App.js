import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  //UseState for various properties
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [getUserToken, setUserToken] = useState('');
  const [getUserCartItems, setUserCartItems] = useState([]);
  const [isItemAvailable, setItemAvailable] = useState(true);
  const [isUserAdmin, setUserAdmin] = useState(false);

  //Helper Functions

  //Reset all user state on logout
  const resetUserStates = () => {
    setUserToken(localStorage.clear());
    setLoggedIn(false);
    setUserCartItems([]);
  }
 

  useEffect(() => {
    
  }, []);

  return (
    <div className="app-container">
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
    </div>
  );
};

export default App;
