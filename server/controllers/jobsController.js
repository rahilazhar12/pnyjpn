const Jobs = require('../models/postJobs.js');
const Application = require('../models/applicationschema.js')


exports.getApplicationsForJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    // Fetch all applications for the specific job, selecting only the applicant information
    const applications = await Application.find({ job: jobId })
      .select('applicant job name city contact email applicationDate');

    // If no applications found
    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found for this job.' });
    }

    // Return applicant information
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve applications' });
  }
};



exports.getJobsList = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const job = await Jobs.findById(id);
      if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }
      return res.status(200).json({ success: true, job: [job] }); // Wrap in array to keep response consistent
    }

    const jobs = await Jobs.find();
    return res.status(200).json({ success: true, jobs: jobs || [] }); // Ensure jobs is always an array
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error fetching jobs", error });
  }
};




