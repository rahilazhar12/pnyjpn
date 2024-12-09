// JobPreferences.jsx

import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

const JobPreferences = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [jobPreferences, setJobPreferences] = useState(null);
  const [editPreferences, setEditPreferences] = useState({
    title: "",
    salary: "",
    skills: [],
    relocation: false,
    relocationPreference: "",
    preferredLocations: [],
  });
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Helper function to transform array of strings to react-select options
  const toSelectOptions = (arr) => {
    return arr.map((item) => ({ label: item, value: item }));
  };

  // Helper function to transform react-select options to array of strings
  const toStringArray = (options) => {
    return options.map((option) => option.value);
  };

  // Fetch existing job preferences on component mount
  useEffect(() => {
    const fetchJobPreferences = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/profile/jobpref`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies if your API uses them
          }
        );

        if (response.status === 404) {
          // No job preferences found for the user
          setJobPreferences(null);
          setEditPreferences({
            title: "",
            salary: "",
            skills: [],
            relocation: false,
            relocationPreference: "",
            preferredLocations: [],
          });
          return; // Exit early since there's no data to process
        }

        if (!response.ok) {
          // Handle other HTTP errors
          const errorData = await response.json();
          throw new Error(
            errorData.message ||
              `Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        // Determine if data is an array or object and handle accordingly
        let preferenceData = null;
        if (Array.isArray(data)) {
          if (data.length > 0) {
            preferenceData = data[0]; // Adjust based on your needs
          }
        } else if (
          typeof data === "object" &&
          data !== null &&
          Object.keys(data).length > 0
        ) {
          preferenceData = data;
        }

        if (preferenceData) {
          setJobPreferences(preferenceData);
          setEditPreferences({
            ...preferenceData,
            skills: toSelectOptions(preferenceData.skills || []),
            preferredLocations: toSelectOptions(
              preferenceData.preferredLocations || []
            ),
          });
        } else {
          setJobPreferences(null);
          setEditPreferences({
            title: "",
            salary: "",
            skills: [],
            relocation: false,
            relocationPreference: "",
            preferredLocations: [],
          });
        }
      } catch (err) {
        console.error("Error fetching job preferences:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPreferences();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditPreferences(
      jobPreferences
        ? {
            ...jobPreferences,
            skills: toSelectOptions(jobPreferences.skills || []),
            preferredLocations: toSelectOptions(
              jobPreferences.preferredLocations || []
            ),
          }
        : {
            title: "",
            salary: "",
            skills: [],
            relocation: false,
            relocationPreference: "",
            preferredLocations: [],
          }
    );
    setIsEditing(false);
    setError(null); // Clear any existing errors
  };

  const handleSave = async () => {
    try {
      // Reset error state
      setError(null);

      // Validation
      if (editPreferences.relocation) {
        if (!editPreferences.relocationPreference) {
          setError("Please select a relocation preference.");
          return;
        }
        if (
          editPreferences.relocationPreference === "Near" &&
          editPreferences.preferredLocations.length === 0
        ) {
          setError("Please specify your preferred locations.");
          return;
        }
      }

      // Prepare data to send
      const payload = {
        title: editPreferences.title,
        salary: editPreferences.salary,
        skills: toStringArray(editPreferences.skills),
        relocation: editPreferences.relocation,
        relocationPreference: editPreferences.relocation
          ? editPreferences.relocationPreference
          : "",
        preferredLocations:
          editPreferences.relocation &&
          editPreferences.relocationPreference === "Near"
            ? toStringArray(editPreferences.preferredLocations)
            : [],
      };

      let response;
      if (jobPreferences && jobPreferences._id) {
        // Update existing
        response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/profile/jobpref/${jobPreferences._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
          }
        );
      } else {
        // Create new
        response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/profile/jobpref`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies if your API uses them
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save job preferences.");
      }

      const data = await response.json();
      setJobPreferences(data);
      setNotification(
        jobPreferences && jobPreferences._id
          ? "Job preferences updated successfully!"
          : "Job preferences saved successfully!"
      );
      window.location.reload()
      setIsEditing(false);

      // Clear notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      console.error("Error saving job preferences:", err);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If relocation checkbox is toggled off, reset relocationPreference and preferredLocations
    if (name === "relocation" && !checked) {
      setEditPreferences({
        ...editPreferences,
        [name]: checked,
        relocationPreference: "",
        preferredLocations: [],
      });
    } else if (name === "relocationPreference" && value === "Anywhere") {
      // If "Anywhere" is selected, reset preferredLocations
      setEditPreferences({
        ...editPreferences,
        [name]: value,
        preferredLocations: [],
      });
    } else {
      setEditPreferences({
        ...editPreferences,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handlers for CreatableSelect components
  const handleSkillsChange = (selectedOptions) => {
    setEditPreferences({
      ...editPreferences,
      skills: selectedOptions || [],
    });
  };

  const handlePreferredLocationsChange = (selectedOptions) => {
    setEditPreferences({
      ...editPreferences,
      preferredLocations: selectedOptions || [],
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
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
      </div>
    );
  }

  if (error && !isEditing) {
    // Display error only when not editing
    return (
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto mt-10">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Job Preferences</h2>
        {!isEditing && !jobPreferences && (
          <button
            onClick={handleEdit}
            className="flex items-center justify-center w-10 h-10  text-blue-500 text-xl font-bold rounded-full  transition"
            aria-label={
              isEditing ? "Close Job Preferences" : "Add Job Preferences"
            }
          >
            +
          </button>
        )}
        {!isEditing && jobPreferences && (
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-blue-800 rounded-lg transition"
            >
              Edit
            </button>
          </div>
        )}
        {isEditing && jobPreferences === null && (
          <button
            onClick={handleCancel}
            className="flex items-center justify-center w-10 h-10 text-blue-500 text-xl font-bold rounded-full transition"
            aria-label="Close Job Preferences"
          >
            -
          </button>
        )}
      </div>

      {notification && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}

      {error && isEditing && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {!isEditing && jobPreferences ? (
        // Display existing job preferences
        <div className="space-y-4">
          <p className="text-gray-600">
            Help us match you with your next job.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-700">
                Desired Job Title
              </h3>
              <p className="text-gray-600 mb-4">{jobPreferences.title}</p>

              <h3 className="text-lg font-semibold text-gray-700">
                Desired Salary
              </h3>
              <p className="text-gray-600 mb-4">
                {jobPreferences.salary}
              </p>
              <h3 className="text-lg font-semibold text-gray-700">
                Desired Skills
              </h3>
              <p className="text-gray-600 mb-4">
                {jobPreferences.skills.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {isEditing && (
        // Render the edit/add form
        <form className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Desired Job Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={editPreferences.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., MERN Stack Developer"
            />
          </div>
          <div>
            <label
              htmlFor="salary"
              className="block text-gray-700 font-semibold mb-2"
            >
              Desired Salary (PKR)
            </label>
            <select
              id="salary"
              name="salary"
              value={editPreferences.salary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Salary Range</option>
              <option value="50,000 - 59,999">50,000 - 59,999</option>
              <option value="60,000 - 69,999">60,000 - 69,999</option>
              <option value="90,000 - 99,999">90,000 - 99,999</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="skills"
              className="block text-gray-700 font-semibold mb-2"
            >
              Skills
            </label>
            <CreatableSelect
              isMulti
              onChange={handleSkillsChange}
              value={editPreferences.skills}
              placeholder="e.g., React, NodeJS, JavaScript"
              classNamePrefix="react-select"
            />
          </div>
          <div className="flex items-center">
            <input
              id="relocation"
              name="relocation"
              type="checkbox"
              checked={editPreferences.relocation}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="relocation"
              className="ml-3 block text-gray-700 font-semibold"
            >
              I am willing to relocate
            </label>
          </div>
          {editPreferences.relocation && (
            <div className="mt-4 space-y-4">
              <div>
                <span className="block text-gray-700 font-semibold mb-2">
                  Relocation Preference
                </span>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="relocationPreference"
                      value="Anywhere"
                      checked={
                        editPreferences.relocationPreference === "Anywhere"
                      }
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Anywhere</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="relocationPreference"
                      value="Near"
                      checked={editPreferences.relocationPreference === "Near"}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Near</span>
                  </label>
                </div>
              </div>
              {editPreferences.relocationPreference === "Near" && (
                <div>
                  <label
                    htmlFor="preferredLocations"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Preferred Locations
                  </label>
                  <CreatableSelect
                    isMulti
                    onChange={handlePreferredLocationsChange}
                    value={editPreferences.preferredLocations}
                    placeholder="e.g., Lahore, Islamabad"
                    classNamePrefix="react-select"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default JobPreferences;
