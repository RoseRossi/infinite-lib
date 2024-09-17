import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
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
  })

const sampleStory = {
  title: 'Amores Secretos',
  content: 'Una historia sobre Lisa que se enamora de Lili, su mejor amiga del colegio...',
  genre: 'Fantasía',
  theme: 'Aventura',
  characters: [
    { name: 'Lisa', role: 'Protagonista' },
    { name: 'Lili', role: 'Amiga' },
  ],
  versiones: [
    { content: 'Primera versión del contenido...', createdAt: new Date() },
  ],
  author: 'User123',
};

export default function StoryViewer() {
  const navigate = useNavigate();

  const handleModify = () => {
    // Redirige a /generator pero todavia no lo hace para modificar 
    //#TODO relacion HU7
    navigate('/generator', { state: { ...sampleStory } });
  };

  return (
    <ThemeProvider theme={themeG}>
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="secondary">
          {sampleStory.title}
        </Typography>

        <Typography variant="h6" color="textSecondary" gutterBottom>
          Género: {sampleStory.genre}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {sampleStory.content}
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
