import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobsByCategory } from "../hooks/Getcategories";
import categorydetailimg from '../../assets/img/hero/about.jpg'
import JobListing from "../Jobs/Jobslisting/Jobslisting";

const CategoryDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await fetchJobsByCategory(slug); // Use the shared API service
      setJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, [slug]);

  return (
    <>
<div
  className="relative bg-cover h-80 flex items-center justify-center"
  style={{ backgroundImage: `url(${categorydetailimg})` }}
>
  {/* Overlay with blur effect */}
  <div className="absolute inset-0 bg-pink-500 opacity-50 backdrop-blur-md" />
  {/* Main Content */}
  <div className="relative container mx-auto px-4">
    <div className="flex justify-center items-center">
      <h2
        className="text-4xl md:text-6xl font-bold text-transparent text-center"
        style={{
          WebkitTextStroke: "1px white", // Outlines the text in white
        }}
      >
        Get Your Job
      </h2>
    </div>
  </div>
</div>

<JobListing/>


      {/* <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-semibold mt-2">
              Jobs in {slug.replace("-", " ")}
            </h2>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-green-200 p-6 single-job"
                  >
                    <h5 className="text-lg">{job.title}</h5>
                    <p>{job.category}</p>
                    <p>{job.location}</p>
                    
                  </div>
                ))
              ) : (
                <p>No jobs found for this category.</p>
              )}
            </div>
          )}
        </div>
      </section> */}

      
    </>
  );
};

export default CategoryDetail;
