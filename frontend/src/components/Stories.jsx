import React from 'react'
import {
    Box,
    Container,
    Typography,
    Chip,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
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

const savedStories = [
    {
      title: "Amores secretos",
      prompt: "Una historia sobre Lisa que se enamora de Lili, su mejor amiga del colegio.",
      genre: "Fantasía",
      theme: "Aventura",
      characters: [
        { name: "Lisa", role: "Protagonista" },
        { name: "Lili", role: "Amiga" },
      ],
      length: 1000
    },
    {
      title: "La traición del bosque",
      prompt: "Una historia donde un grupo de aventureros se pierden en un bosque encantado.",
      genre: "Misterio",
      theme: "Betrayal",
      characters: [
        { name: "Marco", role: "Líder" },
        { name: "Vanessa", role: "Exploradora" }
      ],
      length: 1500
    }
    // Puedes agregar más historias aquí
  ]

export default function Stories() {
    const navigate = useNavigate(); // Hook para redirigir a una nueva ruta

    // Función que se activa cuando se hace clic en un Paper
    const handleClickPaper = (story) => {
      console.log("Clicked story:", story.title); // Solo para ver en consola cuál historia se seleccionó
      navigate('/generator'); // Redirige a /generator
    }

  return (
    <ThemeProvider theme={themeG}>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom align="center" color="secondary">
            Saved Stories
          </Typography>

          {savedStories.map((story, index) => (
            <Paper key={index} elevation={3} sx={{ p: 3, mb: 3, backgroundColor: 'white', cursor: 'pointer', // Cambia el cursor a pointer
                '&:hover': {
                  boxShadow: 6,}, }}
            onClick={() => handleClickPaper(story)}>
              <Typography variant="h5" component="h2" gutterBottom color="secondary">
                {story.title}
              </Typography>

              {/* <Typography variant="body1" color="text.primary">
                <strong>Genre:</strong> {story.genre}
              </Typography> */}

              <Typography variant="body1" color="text.primary">
                <strong>Theme:</strong> {story.theme}
              </Typography>

              <Typography variant="body1" color="text.primary">
                <strong>Small description:</strong> {story.prompt}
              </Typography>

              {/* <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
                <strong>Length:</strong> {story.length} words
              </Typography> */}

              {/* <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
                <strong>Characters:</strong>
              </Typography>
              <List>
                {story.characters.map((character, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText
                      primary={`${character.name} - ${character.role}`}
                    />
                  </ListItem>
                ))}
              </List> */}
            </Paper>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  )
}
