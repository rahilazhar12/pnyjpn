const Jobs = require('../models/postJobs.js');


// const getJobsList = async (req, res) => {
//     try {
//         let data = await jobsModel.find()
//         if (data) {
//             res.send(data)
//         } else {
//             res.send({ "message": "No data found" })
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: "Something went wrong",
//             error
//         })
//     }
// }

const getJobsList = async (req, res) => {
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




module.exports = getJobsList