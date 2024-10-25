import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Grid,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import userbgimage from "../../assets/img/backgrounds/userbg.jpg";

// Custom pink theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#e91e63", // Pink color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

// Transition for modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentRegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [alumniStatus, setAlumniStatus] = useState("No");
  const [batchNo, setBatchNo] = useState("");
  const [courseName, setCourseName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small (mobile)

  const handleAlumniChange = (event) => {
    setAlumniStatus(event.target.value);
    if (event.target.value === "Yes") {
      setOpenModal(true); // Open the modal when "Yes" is selected
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal when the action is done
  };
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    const payload = {
      name,
      email,
      password,
      contact,
      city,
      isPNYAlumni: alumniStatus === "Yes",
      batchNo: alumniStatus === "Yes" ? batchNo : undefined,
      courseName: alumniStatus === "Yes" ? courseName : undefined,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/register-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("User registered successfully");

        // Reset form fields after successful registration
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setCity("");
        setBatchNo("");
        setCourseName("");
        setAlumniStatus("No");

        // Navigate to the login page after 2 seconds
        setTimeout(() => {
          navigate("/login-users");
        }, 500);
      } else {
        alert(data.message || "Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: isMobile ? 2 : 0, // Add padding on mobile for better layout
          backgroundImage: `url(${userbgimage})`, // Add your background image URL here
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography
          className="text-white"
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          gutterBottom
        >
          Student Registration
        </Typography>

        <Typography className="text-white" variant="body1" gutterBottom>
          Please note that this registration form is only for students.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit} // Handle form submission
          sx={{
            width: isMobile ? "100%" : 500, // Adjust width for mobile devices
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
            padding: isMobile ? 2 : 4, // Adjust padding for mobile
            borderRadius: 2,
            boxShadow: 3,
            backdropFilter: "blur(5px)", // Adds a blur effect to the background
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Use Grid to align the fields side-by-side */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact"
                variant="outlined"
                fullWidth
                required
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <TextField
            label="City"
            variant="outlined"
            fullWidth
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCityIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Are you a PNY Alumni?"
            value={alumniStatus}
            onChange={handleAlumniChange}
            fullWidth
            required
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Register
          </Button>
        </Box>

        {/* Modal for Batch No and Course Name */}
        <Dialog
          open={openModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseModal}
          aria-describedby="batch-course-dialog-description"
          fullWidth
          maxWidth="sm" // Responsive modal width
        >
          <DialogTitle>{"Additional Information for Alumni"}</DialogTitle>
          <DialogContent>
            <TextField
              label="Batch No"
              variant="outlined"
              fullWidth
              value={batchNo}
              onChange={(e) => setBatchNo(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Course Name"
              variant="outlined"
              fullWidth
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
