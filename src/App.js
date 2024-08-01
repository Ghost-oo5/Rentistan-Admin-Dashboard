import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import PropertiesPage from './pages/PropertiesPage';
import Header from './components/header'; // Ensure this matches the file name exactly
import Sidebar from './components/sidebar'; // Ensure this matches the file name exactly
import ChatsPage from './pages/ChatsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ADEF',
    },
    secondary: {
      main: '#FF4081',
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {user && <Header />}
          <div style={{ display: 'flex', flex: 1 }}>
            {user && <Sidebar />}
            <div style={{ flex: 1, padding: '2rem' }}>
              <Routes>
                <Route path="/login" element={<LoginPage setUser={setUser} />} />
                {user ? (
                  <>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/properties" element={<PropertiesPage />} />
                    <Route path="/chats" element={<ChatsPage />} />
                    
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </>
                ) : (
                  <Route path="*" element={<Navigate to="/login" />} />
                )}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
