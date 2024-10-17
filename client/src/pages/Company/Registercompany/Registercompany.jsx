import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import BackgroundImage from '../../../assets/img/backgrounds/companyregister.jpg'; // Replace with your background image path

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081', // Pink color for the theme
    },
  },
});

// Styled components
const TransparentBox = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
  padding: '30px',
  borderRadius: '15px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
});

const BackgroundContainer = styled(Container)({
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const RegisterCompany = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    ntnnumber: "",
    email: "",
    personincontact: "",
    cnic: "",
    password: "",
    city: "",
    website: "",
    facebook: "",
    linkedin: "",
   
  });

  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form (simple example)
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.ntnnumber) formErrors.ntnnumber = "NTN is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.personincontact) formErrors.personincontact = "Contact person is required";
    if (!formData.cnic) formErrors.cnic = "CNIC is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.city) formErrors.city = "City is required";
  

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setAlertMessage("Please fill all required fields.");
      setAlertType("error");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/company/companies-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to register company");
      }

      const result = await response.json();
      setAlertMessage(result.message || "Company registered successfully!");
      setAlertType("success");

      // Reset form fields
      setFormData({
        name: "",
        ntnnumber: "",
        email: "",
        personincontact: "",
        cnic: "",
        password: "",
        city: "",
        website: "",
        facebook: "",
        linkedin: "",
        address: "",
        phone: "",
        industry: "",
      });
    } catch (error) {
      setAlertMessage(error.message);
      setAlertType("error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer maxWidth="false">
        <TransparentBox maxWidth="md">
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Register Your Company
          </Typography>
          <Grid item xs={12} textAlign="center" sx={{ marginTop: 3 }}>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              Not yet registered? Join us today to post jobs and attract top talent! 
            </Typography>
            <Typography variant="body1" sx={{ color: "#ff4c8b", marginTop: 1 }}>
              Only businesses legally registered and compliant with local laws are eligible to post jobs on our platform.
            </Typography>
          </Grid>
          
          {alertMessage && (
            <Alert severity={alertType} sx={{ mb: 2 }}>
              {alertMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  fullWidth
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Microsoft, Google, etc"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="NTN"
                  fullWidth
                  variant="outlined"
                  name="ntnnumber"
                  value={formData.ntnnumber}
                  onChange={handleInputChange}
                  placeholder="000000-0"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ex: youremail@google.com"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Person in contact"
                  fullWidth
                  variant="outlined"
                  name="personincontact"
                  value={formData.personincontact}
                  onChange={handleInputChange}
                  placeholder="0333-0000000"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="CNIC"
                  fullWidth
                  variant="outlined"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleInputChange}
                  placeholder="35202-0000000-1"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="City"
                  fullWidth
                  variant="outlined"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Ex: Lahore, Multan, etc"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Website"
                  fullWidth
                  variant="outlined"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Ex: https://www.google.com/"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Facebook"
                  fullWidth
                  variant="outlined"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="Facebook Page Link"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="LinkedIn"
                  fullWidth
                  variant="outlined"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="LinkedIn Page Link"
                />
              </Grid>
            </Grid>
            <Box textAlign="center" mt={4}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Register
              </Button>
            </Box>
          </form>
        </TransparentBox>
        </BackgroundContainer>
    </ThemeProvider>
  );
};

export default RegisterCompany;
