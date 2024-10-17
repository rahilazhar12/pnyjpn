import * as React  from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useForm } from "react-hook-form";
import Personal from './Personal';
import Experience from './Experience';
import { useState } from 'react';

// QontoStepIconRoot styled component
const QontoStepIconRoot = styled('div')(({ theme }) => ({
  color: '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

// ColorlibConnector styled component
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}));

// ColorlibStepIcon styled component
const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ['Personal', 'Experience', 'Academics' , 'Skills' , 'Training' , 'Certification' , 'Achievement' , 'Research' , 'Target Job'];




export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const [experiences, setExperiences] = React.useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    positionTitle: "",
    from: "",
    to: "",
    companyName: "",
    jobLevel: "",
    jobResponsibilities: "",
  });
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    dob: "",
    martialstatus: "",
    fathername: "",
    religion: "",
    mobile: "",
    landline: "",
    postaladdress: "",
    domicile: "",
    ResCountry: "",
    ResCity: "",
    nationality: "",
    CNIC: "",
    CNICexpiry: "",
    hafizquran: "",
    ExServiceOfficial: "",
    Governmentofficial: "",
    Disabled: "",
    profilePicture: "",
    JobTitle: "",
    CareerLevel: "",
    TargetMonthlySalary: "",
    LastMonthlySalary: "",
  });

  const handleAddExperience = () => {
    const allFieldsFilled = Object.values(currentExperience).every(
      (value) => value.trim() !== ""
    );
    if (allFieldsFilled) {
      // All fields are filled, proceed to add the currentAcademics to the academics array
      setExperiences((prevAcademics) => [...prevAcademics, currentExperience]);
      // Clear the current input fields for a new entry
      setCurrentExperience({
        positionTitle: "",
        from: "",
        to: "",
        companyName: "",
        jobLevel: "",
        jobResponsibilities: "",
      });
    } else {
      // Not all fields are filled, maybe show an alert or a message to the user
      alert("Please fill in all fields before adding the Experience record.");
    }
  };


  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthday = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
  
    // If the input is for a file (like profile picture)
    if (name === "profilePicture" && files.length > 0) {
      const file = files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));
    } else {
      // General form field handling
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      
      // Update experience, academics, skills, etc. only when those specific fields are changed
      if (["experienceField1", "experienceField2"].includes(name)) {
        setCurrentExperience((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
  
      if (["academicField1", "academicField2"].includes(name)) {
        setCurrentacademics((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
  
      // Automatically calculate age when dob changes
      if (name === "dob") {
        const age = calculateAge(value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          age,
        }));
      }
    }
  };
  

  const { handleSubmit } = useForm();


  const onSubmit = async () => {
    // Create a FormData object
    const submitFormData = new FormData();

    submitFormData.append("fname", formData.firstName);
    submitFormData.append("lname", formData.lastName);
    submitFormData.append("dob", formData.dob);
    submitFormData.append("age", formData.age.toString()); // Assuming age is stored as a number and needs to be converted to a string
    submitFormData.append("gender", formData.gender);
    submitFormData.append("martialstatus", formData.martialstatus);
    submitFormData.append("fathername", formData.fathername);
    submitFormData.append("religion", formData.religion);
    submitFormData.append("mobile", formData.mobile);
    submitFormData.append("landline", formData.landline);
    submitFormData.append("postaladdress", formData.postaladdress);
    submitFormData.append("domicile", formData.domicile);
    submitFormData.append("ResCountry", formData.ResCountry);
    submitFormData.append("ResCity", formData.ResCity);
    submitFormData.append("nationality", formData.nationality);
    submitFormData.append("CNIC", formData.CNIC);
    submitFormData.append("CNICexpiry", formData.CNICexpiry);
    submitFormData.append("hafizquran", formData.hafizquran);
    submitFormData.append("ExServiceOfficial", formData.ExServiceOfficial);
    submitFormData.append("Governmentofficial", formData.Governmentofficial);
    submitFormData.append("Disabled", formData.Disabled);
    submitFormData.append("JobTitle", formData.JobTitle);
    submitFormData.append("CareerLevel", formData.CareerLevel);
    submitFormData.append("TargetMonthlySalary", formData.TargetMonthlySalary);
    submitFormData.append("LastMonthlySalary", formData.LastMonthlySalary);

    // Append JSON data for complex objects
    // submitFormData.append("skills", JSON.stringify(skills));
    submitFormData.append("jobs", JSON.stringify(experiences)); // Assuming `experiences` is the array for jobs
    // submitFormData.append("jobs", JSON.stringify(experiences)); // Assuming `experiences` is the array for jobs
    // submitFormData.append("academics", JSON.stringify(academics));
    // submitFormData.append("trainings", JSON.stringify(trainings));
    // submitFormData.append("certification", JSON.stringify(certification));
    // submitFormData.append("achievements", JSON.stringify(achievements));
    // submitFormData.append("research", JSON.stringify(research));

    // Append the profile picture if available and correctly referenced
    // This assumes you have a method to capture and set the profile picture file in state
    if (formData.profilePicture) {
      submitFormData.append("profilePicture", formData.profilePicture);
    }
    

    try {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/profile`, {
        method: "POST",
        body: submitFormData,
        credentials: 'include', // Ensure credentials are included
    });

    const responseData = await response.json();

    if (response.ok) {
        // Success response handling
        alert(responseData.message);  // Backend should provide a success message
        // Optional: Redirect or update UI upon success
    } else {
        // Error response handling
        alert("Registration failed: " + (responseData.message || "An unknown error occurred"));
        // Optional: Handle specific error scenarios based on responseData.details or similar
    }
    } catch (error) {
       // Exception handling if the request failed to fetch or there was a network error
       console.error("Request Failed:", error);
       alert("Failed to submit: Network error or invalid server response.");
    }

 
  };

  const renderContent = (step) => {
    switch (step) {
      case 0:
        return <Personal
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        />;
      case 1:
        return <Experience
        experience={currentExperience}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onSubmit={onSubmit}
        handleAddExperience={handleAddExperience}
        experiences={experiences}
        setCurrentExperience={setCurrentExperience}
        setExperiences={setExperiences}
        />
      case 2:
        return <div>Create an ad content goes here.</div>;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <>
      <Stack sx={{ width: '100%' , mt:4 }} spacing={4}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>

      {/* Render the content of the current step */}
      <div style={{ marginTop: '20px' }}>{renderContent(activeStep)}</div>

      <button onClick={handleNext} style={{ marginTop: '20px' }}>
        NEXT
      </button>
    </>
  );
}
