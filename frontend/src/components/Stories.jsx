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


export default function Stories() {

  return (
    <ThemeProvider theme={themeG}>
    </ThemeProvider>
  )
}
