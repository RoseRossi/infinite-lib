import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Chip,
  Paper,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importamos axios para hacer la solicitud al backend

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

// Personajes predefinidos con nombre y rol
const predefinedCharacters = [
  { name: 'Maria', role: 'Hero' },
  { name: 'Marco', role: 'Villain' },
  { name: 'Vanessa', role: 'Sidekick' },
  { name: 'Dr. Green', role: 'Mentor' }
];

const genres = ['Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Horror'];
const themes = ['Adventure', 'Love', 'Betrayal', 'Redemption', 'Discovery'];
const lengths = ['Short', 'Medium', 'Long'];
const roles = ['Hero', 'Villain', 'Sidekick', 'Mentor'];  // Roles posibles

export default function Generator() {
  const location = useLocation();
  const navigate = useNavigate();

  // Si hay una historia existente en el state de la navegación, la usamos; si no, inicializamos con valores vacíos
  const existingStory = location.state?.story || {};

  const [title, setTitle] = useState(existingStory.title || '');
  const [genre, setGenre] = useState(existingStory.genre || '');
  const [theme, setTheme] = useState(existingStory.theme || '');
  const [length, setLength] = useState(existingStory.length || '');
  const [storyPrompt, setStoryPrompt] = useState(existingStory.prompt || '');
  const [selectedCharacters, setSelectedCharacters] = useState(existingStory.characters || []);
  const [newCharacter, setNewCharacter] = useState('');
  const [newCharacterRole, setNewCharacterRole] = useState('');  // Para el rol
  const [generatedStory, setGeneratedStory] = useState(existingStory.content || '');  // Para almacenar la historia generada

  // Función para añadir un personaje
  const handleAddCharacter = () => {
    if (newCharacter && newCharacterRole && !selectedCharacters.find(char => char.name === newCharacter)) {
      setSelectedCharacters((prev) => [...prev, { name: newCharacter, role: newCharacterRole }]);
      setNewCharacter('');
      setNewCharacterRole('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddCharacter();
    }
  };

  // Función para eliminar un personaje
  const handleRemoveCharacter = (characterToRemove) => {
    setSelectedCharacters((prev) =>
      prev.filter((character) => character.name !== characterToRemove.name)
    );
  };

  // Función para generar/actualizar la historia
  const handleGenerateStory = async () => {
    try {
      const token = localStorage.getItem('token');  // Obtener el token del usuario autenticado

      if (!token) {
        console.error('Token no disponible. Asegúrate de que el usuario esté autenticado.');
        return;
      }

      const storyData = {
        title,
        genre,
        theme,
        length: length === 'Short' ? 500 : length === 'Medium' ? 1000 : 1500,
        prompt: storyPrompt,
        characters: selectedCharacters,
      };

      // Si la historia ya tiene un ID, hacemos un PUT para actualizarla
      if (existingStory._id) {
        const response = await axios.put(`http://localhost:5000/api/stories/${existingStory._id}`, storyData, {
          headers: {
            Authorization: `Bearer ${token}`,  // Incluir el token en los encabezados
          },
        });
        setGeneratedStory(response.data.content);  // Actualizar la historia
        console.log("Historia actualizada:", response.data);
      } else {
        // Si no hay ID, hacemos un POST para crear una nueva historia
        const response = await axios.post('http://localhost:5000/api/stories/generate', storyData, {
          headers: {
            Authorization: `Bearer ${token}`,  // Incluir el token en los encabezados
          },
        });
        setGeneratedStory(response.data.content);  // Almacenar la historia generada
        console.log("Nueva historia creada:", response.data);
      }

      navigate('/stories');  // Redirige a la lista de historias después de guardar/actualizar
    } catch (error) {
      console.error('Error al guardar la historia:', error);
    }
  };

  return (
    <ThemeProvider theme={themeG}>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4, boxShadow: '0px 4px 10px rgba(28, 8, 28, 1)'}}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="#452845" style={{ fontWeight: 'bold' }}>
              {existingStory._id ? "Editar Historia" : "Generar Nueva Historia"}
            </Typography>
            <Box component="form" sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  value={genre}
                  onChange={(event) => setGenre(event.target.value)}
                  label="Genre"
                >
                  {genres.map((g) => (
                    <MenuItem key={g} value={g}>
                      {g}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="theme-label">Theme</InputLabel>
                <Select
                  labelId="theme-label"
                  value={theme}
                  onChange={(event) => setTheme(event.target.value)}
                  label="Theme"
                >
                  {themes.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="length-label">Length</InputLabel>
                <Select
                  labelId="length-label"
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                  label="Length"
                >
                  {lengths.map((l) => (
                    <MenuItem key={l} value={l}>
                      {l}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Autocomplete
                multiple
                id="characters-autocomplete"
                options={predefinedCharacters}
                getOptionLabel={(option) => `${option.name} (${option.role})`}
                value={selectedCharacters}  // Mostrar los personajes seleccionados con nombre y rol
                onChange={(event, newValue) => {
                  setSelectedCharacters(newValue);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option.name}
                      label={`${option.name} (${option.role})`}
                      {...getTagProps({ index })}
                      onDelete={() => handleRemoveCharacter(option)}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Characters" placeholder="Select characters" />
                )}
              />

              {/* Add Custom Character Section */}
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  fullWidth
                  label="Character Name"
                  value={newCharacter}
                  onChange={(event) => setNewCharacter(event.target.value)}
                  onKeyUp={handleKeyPress}
                />
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    value={newCharacterRole}
                    onChange={(event) => setNewCharacterRole(event.target.value)}
                    label="Role"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={handleAddCharacter} sx={{ minWidth: '100px', backgroundColor: '#452845', '&:hover': { backgroundColor: '#2b0f2b' }, color:'white' }} >
                  Add
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  fullWidth
                  label="Small description"
                  value={storyPrompt}
                  onChange={(event) => setStoryPrompt(event.target.value)}
                />
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleGenerateStory}
                sx={{ mt: 4, backgroundColor: '#452845', '&:hover': { backgroundColor: '#2b0f2b' } }}
              >
                {existingStory._id ? "Actualizar Historia" : "Generar Historia"}
              </Button>
            </Box>

            {/* Muestra la historia generada justo debajo del botón */}
            {generatedStory && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Generated Story:
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {generatedStory}
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
