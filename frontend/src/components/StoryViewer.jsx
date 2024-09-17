import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';  // Usar useLocation para obtener la historia seleccionada

const themeG = createTheme({
    palette: {
      primary: {
        main: '#e6dee7',
      },
      secondary: {
        main: '#9c27b0',
      },
      background: {
        default: '#f5f0f6',
      },
      text: {
        primary: '#000000', 
      },
    },
  });

export default function StoryViewer() {
  const navigate = useNavigate();
  const location = useLocation();  // Obtén los datos pasados desde Stories.jsx
  const story = location.state?.story;  // Extrae la historia desde el estado

  const handleModify = () => {
    // Redirige a /generator para modificar la historia
    navigate('/generator', { state: { story } });
  };

  if (!story) {
    return (
      <Typography variant="h6" align="center" color="error">
        No story data found.
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={themeG}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="secondary">
            {story.title}
          </Typography>

          <Typography variant="h6" color="textSecondary" gutterBottom>
            Género: {story.genre}
          </Typography>

          <Typography variant="body1" gutterBottom>
            {story.content}
          </Typography>

          <Box mt={4}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleModify}
            >
              Modificar Historia
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
