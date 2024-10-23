import React, { useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";

const Aboutus = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container
      maxWidth="xl"
      className="py-12 px-4 md:px-8 bg-gray-50 min-h-screen"
    >
      <Box className="text-center mb-12">
        <Typography
          variant="h3"
          className="text-gray-900 font-semibold text-3xl md:text-4xl"
        >
          About Us
        </Typography>
      </Box>

      <Box className="mb-8">
        <Typography
          variant="body1"
          className="text-gray-700 text-lg md:text-xl"
        >
          PNY Group of Companies has created another exciting venture for those
          who want to excel in their careers and explore better opportunities.
          For students aiming to pursue a career in IT but struggling to find
          direction, PNY Careers offers a comprehensive platform that simplifies
          your journey. We understand the need for young talent in the IT sector
          and are committed to fostering new opportunities for aspiring
          professionals. Through workshops, networking events, and hands-on
          training sessions, we create an environment that nurtures talent and
          empowers individuals to reach their full potential. In addition to
          supporting students, PNY Careers invites companies to participate
          actively in shaping the future of the IT workforce. Employers can post
          job openings, connect with emerging talent, and engage in
          collaborative initiatives that benefit both students and
          organisations. Pakistan's IT landscape is rapidly evolving, providing
          numerous facilities and opportunities for students to kick-start their
          careers. Navigating the job market can be challenging, but our
          platform is tailored to offer guidance, resources, and support to help
          you find your path. Whether you're just starting or looking to advance
          your skills, PNY Group of Companies is here to support you every step
          of the way. Together, let’s unlock the doors to endless possibilities
          and turn your aspirations into reality.
        </Typography>
      </Box>

      {/* <Box className="mb-8">
        <Typography
          variant="h4"
          className="text-gray-900 font-semibold text-2xl md:text-3xl mb-4"
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-700 text-lg md:text-xl"
        >
          Our mission is to create meaningful connections between job seekers
          and employers through an intuitive and easy-to-use platform. We strive
          to eliminate barriers in the hiring process and help individuals
          discover fulfilling career paths while assisting businesses in
          recruiting top talent.
        </Typography>
      </Box> */}

      {/* <Box className="mb-8">
        <Typography
          variant="h4"
          className="text-gray-900 font-semibold text-2xl md:text-3xl mb-4"
        >
          Why Choose JobPortal?
        </Typography>
        <ul className="list-disc list-inside text-left text-gray-700 text-lg md:text-xl">
          <li>Advanced job search with smart filters</li>
          <li>Professional resume-building tools</li>
          <li>Real-time job market analytics</li>
          <li>Seamless hiring and onboarding process</li>
          <li>24/7 customer support</li>
        </ul>
      </Box> */}

      {/* <Box className="text-center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="text-white bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-4"
        >
          Join Us Today
        </Button>
      </Box> */}
    </Container>
  );
};

export default Aboutus;
