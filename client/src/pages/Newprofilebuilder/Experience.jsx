import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container
} from '@mui/material';

const Experience = ({
  experience,  // Form state for the current experience being entered or edited
  setExperience,  // Function to update the form state
  handleChange,   // Function to handle form field changes
  handleSubmit,   // Function to handle form submission
  handleAddExperience,  // Function to add a new experience
  experiences,  // Array containing all experiences
  setExperiences  // Function to update the list of experiences
}) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editedExperience, setEditedExperience] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedExperience(experiences[index]);
    setExperience(experiences[index]); // Populate form with selected experience for editing
  };

  const handleSave = () => {
    const allFieldsFilled = Object.values(editedExperience).every((value) => value.trim() !== '');
    if (allFieldsFilled) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editIndex] = editedExperience;
      setExperiences(updatedExperiences);
      setEditIndex(-1);
      setEditedExperience({});
    } else {
      alert('Please fill in all fields before saving the changes.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Experience Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Position Title */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Position Title"
              name="positionTitle"
              fullWidth
              value={editIndex === -1 ? experience.positionTitle : editedExperience.positionTitle}
              onChange={editIndex === -1 ? handleChange : (e) => setEditedExperience({ ...editedExperience, positionTitle: e.target.value })}
              variant="outlined"
            />
          </Grid>

          {/* From Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="From"
              name="from"
              type="date"
              fullWidth
              value={editIndex === -1 ? experience.from : editedExperience.from}
              onChange={editIndex === -1 ? handleChange : (e) => setEditedExperience({ ...editedExperience, from: e.target.value })}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>

          {/* To Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="To"
              name="to"
              type="date"
              fullWidth
              value={editIndex === -1 ? experience.to : editedExperience.to}
              onChange={editIndex === -1 ? handleChange : (e) => setEditedExperience({ ...editedExperience, to: e.target.value })}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>

          {/* Company Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Name"
              name="companyName"
              fullWidth
              value={editIndex === -1 ? experience.companyName : editedExperience.companyName}
              onChange={editIndex === -1 ? handleChange : (e) => setEditedExperience({ ...editedExperience, companyName: e.target.value })}
              variant="outlined"
            />
          </Grid>

          {/* Job Level */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Job Level"
              name="jobLevel"
              fullWidth
              value={editIndex === -1 ? experience.jobLevel : editedExperience.jobLevel}
              onChange={editIndex === -1 ? handleChange : (e) => setEditedExperience({ ...editedExperience, jobLevel: e.target.value })}
              variant="outlined"
            />
          </Grid>

          {/* Job Responsibilities */}
          <Grid item xs={12}>
            <TextField
              label="Job Responsibilities"
              name="jobResponsibilities"
              multiline
              rows={3}
              fullWidth
              value={editIndex === -1 ? experience.jobResponsibilities : editedExperience.jobResponsibilities}
              onChange={editIndex === -1 ? handleChange : (e) => setEditedExperience({ ...editedExperience, jobResponsibilities: e.target.value })}
              variant="outlined"
            />
          </Grid>

          {editIndex !== -1 ? (
            <Grid item xs={12} className="col-span-4 mt-6 flex justify-center">
              <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
                Save Changes
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setEditIndex(-1)}>
                Cancel
              </Button>
            </Grid>
          ) : (
            <Grid item xs={12} className="col-span-4 mt-6 flex justify-center">
              <Button variant="contained" color="primary" onClick={handleAddExperience}>
                Add Experience
              </Button>
            </Grid>
          )}
        </Grid>
      </form>

      {/* Table for displaying experiences */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Position Title</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Job Level</TableCell>
              <TableCell>Job Responsibilities</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <TableRow key={index}>
                  <TableCell>{exp.positionTitle}</TableCell>
                  <TableCell>{exp.from}</TableCell>
                  <TableCell>{exp.to}</TableCell>
                  <TableCell>{exp.companyName}</TableCell>
                  <TableCell>{exp.jobLevel}</TableCell>
                  <TableCell>{exp.jobResponsibilities}</TableCell>
                  <TableCell>
                    {index !== editIndex && (
                      <Button color="primary" onClick={() => handleEdit(index)}>
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No record
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Experience;
