import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Generator from './components/Generator';
import Stories from './components/Stories';
import { AppBar, Toolbar, Button, Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserProfile from './components/UserProfile';
import StoryViewer from './components/StoryViewer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8', // Lilac
    },
    secondary: {
      main: '#6A5ACD',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Elimina el token o usuario
    setIsAuthenticated(false); // Cambia el estado de autenticación
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ width: '40px', marginRight: '-1100px' }} />
            <Button variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/">
              La Biblioteca Infinita
            </Button>
          </Box>
          <Box>
            {isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/stories">
                  Mis Historias
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} />} />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/userprof" element={<UserProfile />} />
        <Route path="/story/:id" element={<StoryViewer />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
