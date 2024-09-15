import React from 'react'
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
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

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

const genres = ['Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Horror']
const themes = ['Adventure', 'Love', 'Betrayal', 'Redemption', 'Discovery']
const lengths = ['Short', 'Medium', 'Long']
const predefinedCharacters = ['Maria', 'Marco', 'Vanessa', 'Dr. Green']

export default function Generator() {
  const [genre, setGenre] = React.useState('')
  const [theme, setTheme] = React.useState('')
  const [length, setLength] = React.useState('')
  const [storyPrompt, setStoryPrompt] = React.useState('')
  const [selectedCharacters, setSelectedCharacters] = React.useState([])
  const [newCharacter, setNewCharacter] = React.useState('')

  const handleAddCharacter = () => {
    if (newCharacter && !selectedCharacters.includes(newCharacter)) {
      setSelectedCharacters((prev) => [...prev, newCharacter])
      setNewCharacter('')
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault() 
      handleAddCharacter() 
    }
  }

  const handleRemoveCharacter = (characterToRemove) => {
    setSelectedCharacters((prev) =>
      prev.filter((character) => character !== characterToRemove)
    )
  }

  const handleCharacterChange = (event) => {
    const value = event.target.value
    setSelectedCharacters(value)
  }

  const handleGenerateStory = () => {
    console.log('Generating story with:', { genre, theme, length, selectedCharacters, storyPrompt })
  }

  return (
    <ThemeProvider theme={themeG}>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="secondary">
              Story Generator
            </Typography>
            <Box component="form" sx={{ mt: 4 }}>
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
                value={selectedCharacters}
                onChange={(event, newValue) => {
                  setSelectedCharacters(newValue)
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option}
                      label={option}
                      {...getTagProps({ index })}
                      onDelete={() => handleRemoveCharacter(option)} 
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Characters" placeholder="Select characters" />
                )}
              />
              
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  fullWidth
                  label="Add Custom Character"
                  value={newCharacter}
                  onChange={(event) => setNewCharacter(event.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button variant="contained" onClick={handleAddCharacter} sx={{ minWidth: '100px' }}>
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
                sx={{ mt: 4 }}
              >
                Generate Story
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
