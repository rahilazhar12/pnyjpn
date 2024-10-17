import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Alert, 
  AlertTitle,
} from '@mui/material';
import { pink, grey } from '@mui/material/colors'; // Added grey for more neutral tones
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';  // Include this if you're using npm

// Create a custom theme with pink color
const theme = createTheme({
  palette: {
    primary: pink,
  },
});

// Custom styled Box component for responsiveness and background image
const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundImage: 'url(src/assets/img/backgrounds/userlogin.jpg)', // Replace with your image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  maxWidth: '400px',
  width: '100%',
}));

// Custom styled Alert for more elegant design
const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: grey[50],
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  fontSize: '0.9rem',
  color: grey[800],
  fontWeight: 'bold',
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

const Signin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ severity: '', message: '', open: false });



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/user-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure credentials are included
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
  
        // Encrypt the data before storing it in localStorage
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          `${import.meta.env.CRYPTO_SECRET}`  // Replace this with a more secure, environment-specific key
        ).toString();
  
        // Store the encrypted data in localStorage
        localStorage.setItem('Data', encryptedData);
  
        navigate('/');
        window.location.reload();
  
        // Show success alert
        setAlert({ severity: 'success', message: data.message, open: true });
      } else {
        // Show error alert using the message from the backend
        setAlert({ severity: 'error', message: data.message, open: true });
      }
    } catch (error) {
      setAlert({ severity: 'error', message: 'An error occurred. Please try again later.', open: true });
    }
  };
  
  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledBox>
        <Container component="main" maxWidth="xs">
          {alert.open && (
            <StyledAlert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
              <AlertTitle>{alert.severity === 'success' ? 'Success' : 'Error'}</AlertTitle>
              {alert.message}
            </StyledAlert>
          )}
          <FormBox>
            <Typography component="h1" variant="h5" align="center">
              User Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
          </FormBox>
        </Container>
      </StyledBox>
    </ThemeProvider>
  );
};

export default Signin;
