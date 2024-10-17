import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobsByCategory } from '../hooks/Getcategories';

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
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-semibold mt-2">Jobs in {slug.replace('-', ' ')}</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.id} className="border border-green-200 p-6 single-job">
                  <h5 className="text-lg">{job.title}</h5>
                  <p>{job.category}</p>
                  <p>{job.location}</p>
                  {/* Add more job details here as needed */}
                </div>
              ))
            ) : (
              <p>No jobs found for this category.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryDetail;
