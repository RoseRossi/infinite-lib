import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importamos Axios para las solicitudes HTTP

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

export default function Stories() {
    const navigate = useNavigate(); // Hook para redirigir a una nueva ruta
    const [stories, setStories] = useState([]); // Estado para almacenar las historias
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado para manejar errores

    // Función para obtener las historias del backend
    const fetchStories = async () => {
      try {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token no disponible. Asegúrate de que el usuario esté autenticado.');
          setError('User not authenticated. Please log in.');
          setLoading(false);
          return;
        }

        // Hacer la solicitud GET al backend con el token
        const response = await axios.get('http://localhost:5000/api/stories', {
          headers: {
            Authorization: `Bearer ${token}`,  // Agregamos el token en las cabeceras
          },
        });

        // Actualizar el estado con las historias obtenidas
        setStories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las historias:', error);
        setError('Failed to load stories. Please try again later.');
        setLoading(false); // En caso de error, dejamos de cargar
      }
    };

    // useEffect para obtener las historias cuando el componente se monta
    useEffect(() => {
      fetchStories();  // Llama a la función para obtener las historias
    }, []);

    // Función que se activa cuando se hace clic en un Paper
    const handleClickPaper = (story) => {
      console.log("Clicked story:", story.title); // Solo para ver en consola cuál historia se seleccionó
      navigate(`/story/${story._id}`, { state: { story } }); // Redirige a la ruta con el ID de la historia
    };

    if (loading) {
      return <Typography variant="h6" align="center">Loading stories...</Typography>;
    }

    if (error) {
      return <Typography variant="h6" align="center" color="error">{error}</Typography>;
    }

    return (
      <ThemeProvider theme={themeG}>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
          <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom align="center" color="#452845" style={{ fontWeight: 'bold' }}>
              Saved Stories
            </Typography>

            {stories.length === 0 ? (
              <Typography variant="h6" align="center">No stories found.</Typography>
            ) : (
              stories.map((story, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{ p: 3, mb: 3, backgroundColor: 'white', cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => handleClickPaper(story)}
                >
                  <Typography variant="h5" component="h2" gutterBottom color="#452845" style={{ fontWeight: 'bold' }}>
                    {story.title}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    <strong>Theme:</strong> {story.theme}
                  </Typography>
                </Paper>
              ))
            )}
          </Container>
        </Box>
      </ThemeProvider>
    );
}
