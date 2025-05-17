import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, []);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // True if user is logged in, false otherwise
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Show a loading state while checking auth status
  }

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/auth" replace />
          } 
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;