import React from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import BackgroundImage from "../../../assets/img/backgrounds/companyregister.jpg"; // Replace with your background image path

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4081", // Pink color for the theme
    },
  },
});

// Styled components
const TransparentBox = styled(Box)({
  backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white background
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
});

const BackgroundContainer = styled(Container)({
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "top",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RegisterCompany = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [alertMessage, setAlertMessage] = React.useState(null);
  const [alertType, setAlertType] = React.useState(null);
  const [loading, setLoading] = React.useState(false); // Loading state

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when form submission starts
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/company/companies-register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to register company");
      }

      const result = await response.json();
      setAlertMessage(result.message || "Company registered successfully!");
      setAlertType("success");

      // Reset form fields
      reset();
    } catch (error) {
      setAlertMessage(error.message);
      setAlertType("error");
    } finally {
      setLoading(false); // Set loading to false when form submission is complete
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
              Not yet registered? Join us today to post jobs and attract top
              talent!
            </Typography>
            <Typography variant="body1" sx={{ color: "#ff4c8b", marginTop: 1 }}>
              Only businesses legally registered and compliant with local laws
              are eligible to post jobs on our platform.
            </Typography>
          </Grid>

          {alertMessage && (
            <Alert severity={alertType} sx={{ mb: 2 }}>
              {alertMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  fullWidth
                  variant="outlined"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="NTN"
                  fullWidth
                  variant="outlined"
                  {...register("ntnnumber", { required: "NTN is required" })}
                  error={!!errors.ntnnumber}
                  helperText={errors.ntnnumber?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Person in contact"
                  fullWidth
                  variant="outlined"
                  {...register("personincontact", {
                    required: "Contact person is required",
                  })}
                  error={!!errors.personincontact}
                  helperText={errors.personincontact?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="CNIC"
                  fullWidth
                  variant="outlined"
                  {...register("cnic", { required: "CNIC is required" })}
                  error={!!errors.cnic}
                  helperText={errors.cnic?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="City"
                  fullWidth
                  variant="outlined"
                  {...register("city", { required: "City is required" })}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Website"
                  fullWidth
                  variant="outlined"
                  {...register("website")}
                  placeholder="Optional"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Facebook"
                  fullWidth
                  variant="outlined"
                  {...register("facebook")}
                  placeholder="Optional"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="LinkedIn"
                  fullWidth
                  variant="outlined"
                  {...register("linkedin")}
                  placeholder="Optional"
                />
              </Grid>
            </Grid>
            <Box textAlign="center" mt={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading} // Disable the button while loading
                startIcon={loading && <CircularProgress size={24} />} // Show loading spinner
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </Box>
          </form>
        </TransparentBox>
      </BackgroundContainer>
    </ThemeProvider>
  );
};

export default RegisterCompany;
