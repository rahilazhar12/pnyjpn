import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileCompletion = () => {
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [tasks, setTasks] = useState([
    { name: "Experience", completed: false },
    { name: "PersonalInfo", completed: false },
    { name: "Education", completed: false },
    { name: "Summary", completed: false },
    { name: "Projects", completed: false },
    { name: "Language", completed: false },
    { name: "JobPreference", completed: false },
  ]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false); // State to track if data is absent

  const calculateCompletion = (foundSchemas) => {
    const allSchemas = [
      "PersonalInfo",
      "Summary",
      "Experience",
      "Education",
      "JobPreference",
      "Language",
      "Projects",
    ];
    const completedTasks = allSchemas.filter((schema) =>
      foundSchemas.includes(schema)
    ).length;
    return (completedTasks / allSchemas.length) * 100;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/profile/profileexistance`,
          {
            withCredentials: true,
          }
        );

        if (response.data.schemas && response.data.schemas.length > 0) {
          const foundSchemas = response.data.schemas;
          setCompletionPercentage(calculateCompletion(foundSchemas));
          setTasks((prevTasks) =>
            prevTasks.map((task) => ({
              ...task,
              completed: foundSchemas.includes(task.name),
            }))
          );
          setNoData(false); // Data is found
        } else {
          setNoData(true); // No data available
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setNoData(true); // Assume no data if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full lg:w-full max-w-sm mx-auto lg:mx-0 sticky top-16">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="ml-4 text-blue-500 font-semibold">Loading...</p>
        </div>
      ) : noData ? (
        <div className="text-center text-gray-500">
          <p>No data found.</p>
        </div>
      ) : (
        <>
          {/* Video Upload Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">My Video</h3>
              <button className="text-blue-500 hover:text-blue-700">Add</button>
            </div>
            <div className="mt-4 border border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32">
              <div className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5v-9m-3 3.75L12 7.5l3 3.75M12 3.75v9M6.75 21H17.25c1.518 0 2.25-.732 2.25-2.25V5.25C19.5 3.732 18.768 3 17.25 3H6.75C5.232 3 4.5 3.732 4.5 5.25v13.5C4.5 20.268 5.232 21 6.75 21z"
                  />
                </svg>
                <p className="mt-2 text-sm text-center">Upload Video</p>
              </div>
            </div>
          </div>

          {/* Download CV Button */}
          <div className="mb-6">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 inline-block mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5v-9m-3 3.75L12 7.5l3 3.75M12 3.75v9M6.75 21H17.25c1.518 0 2.25-.732 2.25-2.25V5.25C19.5 3.732 18.768 3 17.25 3H6.75C5.232 3 4.5 3.732 4.5 5.25v13.5C4.5 20.268 5.232 21 6.75 21z"
                />
              </svg>
              Download CV
            </button>
          </div>

          {/* Profile Completion Section */}
          <div>
            <h3 className="text-[18px] font-source-sans font-semibold mb-4">Update your profile for better job recommendations</h3>
            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="ml-2">{Math.round(completionPercentage)}%</span>
            </div>

            <ul>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center ${
                    task.completed ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  <span>{task.name}</span>
                  {task.completed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 text-red-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCompletion;
