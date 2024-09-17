// src/components/LandingPage.jsx
import React from 'react';
import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
  Create as CreateIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';

const features = [
  {
    title: 'Custom Story Generation',
    description:
      'Tailor stories with personalized characters, genres, and themes.',
    icon: <CreateIcon />,
  },
  {
    title: 'Secure Story Saving',
    description: 'Save your stories in the cloud for later access.',
    icon: <CloudUploadIcon />,
  },
];

export default function LandingPage({ isAuthenticated }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sección Principal */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(45deg, #D8BFD8 30%, #E6E6FA 90%)',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Unleash Your Imagination with La Biblioteca Infinita
        </Typography>
        <Typography variant="h5" gutterBottom>
          Create, customize, and share unique stories tailored just for you.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 4 }}
          component={Link}
          to={isAuthenticated ? "/generator" : "/login"} // Condición para cambiar la ruta
        >
          Start Generating Stories
        </Button>
      </Box>

      {/* Sección de Features */}
      <Container
        maxWidth="lg"
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {React.cloneElement(feature.icon, {
                      fontSize: 'large',
                      color: 'primary',
                    })}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    align="center"
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sección de Llamado a la Acción */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Create Your Next Great Story?
          </Typography>
          <Typography variant="h6" gutterBottom>
            Join La Biblioteca Infinita today!
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mr: 2, mb: 2 }}
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
