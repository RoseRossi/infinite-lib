// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Crear un tema personalizado con colores lilas
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Barra de Navegación Global */}
        <AppBar position="sticky" color="default" elevation={0}>
          <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ width: '40px', marginRight: '-1100px' }} />
            <Button variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/">
              La Biblioteca Infinita
            </Button>
          </Box>
            <Box>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        {/* Definición de Rutas */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
