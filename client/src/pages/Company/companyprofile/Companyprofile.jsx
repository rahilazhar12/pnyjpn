import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/jobs/get-jobs-companyId`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies (session, JWT stored in cookies, etc.)
          }
        );

        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error("Failed to fetch jobs:", response.statusText);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const Navigatecontroller = (_id) => {
    navigate(`/application_details/${_id}`);
  };

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        Company Jobs
      </Typography>
      <Grid container spacing={4}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${import.meta.env.VITE_API_URL}/uploads/${
                    job.companyLogo
                  }`}
                  alt={`${job.companyName} Logo`}
                  sx={{ objectFit: "contain", p: 2 }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {job.jobTitle}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {job.companyName}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Location: {job.jobLocation}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Salary: {job.minPrice} - {job.maxPrice} {job.salaryType}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Experience: {job.experienceLevel}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {job.description.substring(0, 100)}...
                  </Typography> */}
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => Navigatecontroller(job._id)}
                    size="small"
                    color="primary"
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            align="center"
            sx={{ width: "100%", marginTop: "50px" }}
          >
            No jobs found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default CompanyProfile;
