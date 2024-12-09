import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Personal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fatherName: "",
    dob: "",
    gender: "",
    cnic: "",
    mobile: "",
    careerLevel: "",
    expectedSalary: "",
    personalInfoId: "", // To store the personal information ID
    profilePicture: null, // File input for profile picture
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(null); // Preview uploaded picture
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [completionPercentage, setCompletionPercentage] = useState(20); // Progress percentage

  // To store the previous blob URL for cleanup
  const [prevBlobURL, setPrevBlobURL] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/profile/personal`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials (such as cookies)
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            // Personal info not found
            setIsFetching(false);
            return;
          }
          throw new Error("Failed to fetch personal information");
        }

        const data = await response.json();
        const personalInfo = data.personalInfo;
        setFormData((prevData) => ({
          ...prevData,
          ...personalInfo,
          personalInfoId: personalInfo._id, // Store the personal information ID
        }));
        setProfilePicturePreview(
          personalInfo.profilePicture || "profile-placeholder.png"
        );
      } catch (error) {
        setMessage(error.message || "Failed to fetch personal information");
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  // Cleanup blob URL when component unmounts or when a new image is selected
  useEffect(() => {
    return () => {
      if (prevBlobURL) {
        URL.revokeObjectURL(prevBlobURL);
      }
    };
  }, [prevBlobURL]);

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setMessage("");
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke the previous Blob URL if it exists
      if (prevBlobURL) {
        URL.revokeObjectURL(prevBlobURL);
      }

      const newBlobURL = URL.createObjectURL(file);
      setFormData({ ...formData, profilePicture: file });
      setProfilePicturePreview(newBlobURL); // Show preview
      setPrevBlobURL(newBlobURL);
    }
  };

  // Submit data (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formDataPayload = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          formDataPayload.append(key, formData[key]);
        }
      }

      // Determine the method and URL based on whether personalInfoId exists
      const isUpdate = formData.personalInfoId !== "";
      const url = isUpdate
        ? `${import.meta.env.VITE_API_URL}/api/v1/profile/updatepersonal`
        : `${import.meta.env.VITE_API_URL}/api/v1/profile/personal`;
      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          // 'Content-Type' is automatically set by the browser when using FormData, so it can be omitted
        },
        body: formDataPayload,
        credentials: "include", // Include credentials such as cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to submit personal information."
        );
      }

      const data = await response.json();
      const updatedPersonalInfo = data.personalInfo;

      setFormData((prevData) => ({
        ...prevData,
        ...updatedPersonalInfo,
        personalInfoId: updatedPersonalInfo._id,
      }));

      // Revoke the previous Blob URL if it exists
      if (prevBlobURL) {
        URL.revokeObjectURL(prevBlobURL);
        setPrevBlobURL(null);
      }

      setProfilePicturePreview(
        updatedPersonalInfo.profilePicture || "profile-placeholder.png"
      );
      setMessage(
        data.message ||
          (isUpdate
            ? "Personal information updated successfully."
            : "Personal information added successfully.")
      );
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      setMessage(error.message || "Failed to submit personal information.");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  // Helper function to determine the image source
  const getImageSrc = () => {
    if (!profilePicturePreview) {
      return "profile-placeholder.png";
    }
    // If it's a Blob URL, return it directly
    if (profilePicturePreview.startsWith("blob:")) {
      return profilePicturePreview;
    }
    // If it's a server path, prepend the server URL
    if (
      profilePicturePreview.startsWith("http://") ||
      profilePicturePreview.startsWith("https://")
    ) {
      return profilePicturePreview;
    }
    return `${import.meta.env.VITE_API_URL}/${profilePicturePreview}`;
  };

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            Personal Information
          </h2>
          {/* Show Add or Edit button based on existence of personalInfoId */}
          {formData.personalInfoId ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              onClick={toggleEdit}
            >
              {isEditing ? "Close Edit" : "Edit"}
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
              onClick={() => setIsEditing(true)}
            >
              Add
            </button>
          )}
        </div>

        {/* Profile Display */}
        {!isEditing && formData.personalInfoId && (
          <div className="flex items-center mt-6 space-x-6">
            <div className="relative w-32 h-32 p-2">
              {/* Circular Progress */}
              <CircularProgressbar
                value={completionPercentage} // Dynamic progress value
                styles={buildStyles({
                  textColor: "black", // Text color for percentage text
                  pathColor: "green", // Progress bar color
                  trailColor: "#d6d6d6", // Background trail color
                  strokeLinecap: "butt", // Make progress bar ends square (or rounded)
                })}
                strokeWidth={4} // This will reduce the thickness of both the progress bar and trail
                className="absolute inset-0"
              />

              {/* Profile Picture */}
              <img
                src={getImageSrc()} // Conditionally set the image source
                alt="Profile"
                className="w-full h-full rounded-full object-cover shadow-md"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {formData.name || "N/A"}
              </h3>
              <p className="text-gray-600 text-sm">{formData.email || "N/A"}</p>
              <p className="text-gray-600 text-sm">
                {formData.mobile || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <p
            className={`mt-4 text-sm ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Editable Form Section */}
      {isEditing && (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-6 p-6">
          <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* File Input for Profile Picture */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>

              {/* Container for the profile image and overlay */}
              <div className="relative w-24 h-24 mt-2">
                {/* Profile Image */}
                <img
                  src={getImageSrc()} // The preview image
                  alt="Profile Preview"
                  className="w-full h-full rounded-full object-cover shadow-md cursor-pointer"
                  onClick={() =>
                    document.getElementById("profilePictureInput").click()
                  } // Trigger the file input when the image is clicked
                />

                {/* Overlay with message */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 rounded-full transition-opacity duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("profilePictureInput").click()
                  } // Trigger the file input on overlay click
                >
                  <span className="text-white text-center text-sm font-medium">
                    Click to change
                  </span>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                id="profilePictureInput" // Added ID to access this input programmatically
                type="file"
                accept="image/*" // Accept only image files
                onChange={handleFileChange} // Handle file change for preview
                className="hidden" // Completely hide the file input
              />
            </div>

            {/* Text Fields */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Father Name
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Gender *
              </label>
              <div className="flex items-center space-x-4 mt-1">
                {["Male", "Female", "Transgender"].map((g) => (
                  <label className="flex items-center" key={g}>
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      required
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                CNIC
              </label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Mobile *
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Career Level
              </label>
              <select
                name="careerLevel"
                value={formData.careerLevel || ""}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              >
                <option value="">Select Career Level</option>
                <option>Experienced Professional</option>
                <option>Fresh Graduate</option>
                <option>Mid-Level</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Expected Salary (PKR)
              </label>
              <select
                name="expectedSalary"
                value={formData.expectedSalary || ""}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              >
                <option value="">Select Salary Range</option>
                <option>100,000 - 124,999</option>
                <option>125,000 - 149,999</option>
                <option>150,000+</option>
              </select>
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : formData.personalInfoId
                  ? "Update"
                  : "Add"}
              </button>
            </div>
            {message && (
              <p
                className={`col-span-2 mt-4 text-sm ${
                  message.toLowerCase().includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Personal;
