import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

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

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setSuccess('Registration successful!');
      setError(null);
      navigate('/login'); // Redirige al login
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Registration failed. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(28, 8, 28, 0.5)',
            }}
          >
          <Typography component="h1" variant="h5" sx= {{ color: '#1c081c'}}>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2, backgroundColor: '#452845', '&:hover': { backgroundColor: '#2b0f2b' } }}
            >
              Sign Up
            </Button>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
