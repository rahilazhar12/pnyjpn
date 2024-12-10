import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

// Set the root element for React Modal
Modal.setAppElement("#root");

const Projects = () => {
  // Form States
  const [isOngoing, setIsOngoing] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [association, setAssociation] = useState("");
  const [description, setDescription] = useState("");

  // Fetched Projects
  const [fetchedProjects, setFetchedProjects] = useState([]);

  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  // Delete Confirmation Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Form visibility state
  const [isFormVisible, setIsFormVisible] = useState(false);

  const formRef = useRef(null); // Create a reference for the form

  // Handle Ongoing Checkbox Change
  const handleOngoingChange = () => {
    setIsOngoing(!isOngoing);
    if (!isOngoing) {
      // If marking as ongoing, clear end date fields
      setEndMonth("");
      setEndYear("");
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, we'll use a local URL
      setImage(URL.createObjectURL(file));
    }
  };

  // Fetch Projects from Backend
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/project`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFetchedProjects(data.projects || []);
      } else {
        const errorData = await response.json();
        toast.error(
          `Error fetching projects: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred while fetching projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle Form Submission for Create and Edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert year fields to numbers
    const numericStartYear = startYear ? parseInt(startYear, 10) : undefined;
    const numericEndYear = endYear ? parseInt(endYear, 10) : undefined;

    // Prepare project data
    const projectData = {
      name,
      projectUrl,
      startMonth,
      startYear: numericStartYear,
      endMonth: isOngoing ? undefined : endMonth,
      endYear: isOngoing ? undefined : numericEndYear,
      isOngoing,
      association,
      description,
      image, // Ensure this is a URL or handle file uploads appropriately
    };

    try {
      let response;
      if (isEditing && currentProjectId) {
        // Editing an existing project
        response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/profile/project/${currentProjectId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(projectData),
          }
        );
      } else {
        // Creating a new project
        const payload = {
          projects: [projectData],
        };
        response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/profile/project`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const result = await response.json();
        toast.success(
          isEditing
            ? "Project updated successfully!"
            : "Project saved successfully!"
        );
        // Reset the form
        resetForm();
        // Refetch projects to include the new/updated one
        fetchProjects();
        window.location.reload()
      } else {
        const errorData = await response.json();
        toast.error(
          `Error saving/updating project: ${
            errorData.message || response.statusText
          }`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred while saving the project.");
    }
  };

  // Reset Form to Initial State
  const resetForm = () => {
    setName("");
    setProjectUrl("");
    setStartMonth("");
    setStartYear("");
    setEndMonth("");
    setEndYear("");
    setIsOngoing(false);
    setAssociation("");
    setDescription("");
    setImage(null);
    setIsEditing(false);
    setCurrentProjectId(null);
  };

  // Handle Edit Button Click
  const handleEditClick = (project) => {
    setIsEditing(true);
    setCurrentProjectId(project._id);
    setName(project.name);
    setProjectUrl(project.projectUrl);
    setStartMonth(project.startMonth);
    setStartYear(project.startYear);
    setEndMonth(project.endMonth || "");
    setEndYear(project.endYear || "");
    setIsOngoing(project.isOngoing);
    setAssociation(project.association || "");
    setDescription(project.description || "");
    setImage(project.image || null);
    setIsFormVisible(true)
    formRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
  };

  // Handle Delete Button Click
  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/project/${projectToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.success("Project deleted successfully!");
        // Remove the deleted project from the state
        setFetchedProjects((prevProjects) =>
          prevProjects.filter((proj) => proj._id !== projectToDelete._id)
        );
        window.location.reload()
      } else {
        const errorData = await response.json();
        toast.error(
          `Error deleting project: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred while deleting the project.");
    } finally {
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  // Cancel Delete
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  // Toggle Form Visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="mt-6" ref={formRef}>
      <div className="bg-white rounded-lg shadow-md p-5 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center">
          {/* {isEditing ? "Edit Project" : "Add New Project"} */}
        </h2>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-source-sans font-semibold">Projects</h3>
          <button
            onClick={toggleFormVisibility}
            className="text-blue-500 hover:text-blue-700"
          >
            <span className="text-xl font-bold text-blue-500">
              {isFormVisible ? "-" : "+"} {/* "+" to show form, "-" to hide */}
            </span>
          </button>
        </div>

        {/* Form to Add/Edit a Project */}
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Project Image
              </label>
              <div
                className="w-full border-dashed border-2 border-blue-500 bg-blue-50 h-20 flex items-center justify-center text-gray-500 rounded cursor-pointer"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="object-cover h-full w-full rounded"
                  />
                ) : (
                  <span>Click to upload image</span>
                )}
              </div>
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Project Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Project URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Project URL
              </label>
              <input
                type="url"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project URL"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                required
              />
            </div>

            {/* Start Date and End Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <div className="flex space-x-2">
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={startMonth}
                    onChange={(e) => setStartMonth(e.target.value)}
                    required
                  >
                    <option value="">Month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    required
                  >
                    <option value="">Year</option>
                    {[...Array(30)].map((_, index) => {
                      const year = new Date().getFullYear() - index;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* End Date */}
              {!isOngoing && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Date
                  </label>
                  <div className="flex space-x-2">
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={endMonth}
                      onChange={(e) => setEndMonth(e.target.value)}
                      required={!isOngoing}
                    >
                      <option value="">Month</option>
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={endYear}
                      onChange={(e) => setEndYear(e.target.value)}
                      required={!isOngoing}
                    >
                      <option value="">Year</option>
                      {[...Array(30)].map((_, index) => {
                        const year = new Date().getFullYear() - index;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Currently Ongoing */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                checked={isOngoing}
                onChange={handleOngoingChange}
              />
              <label className="ml-2 text-sm">Currently Ongoing</label>
            </div>

            {/* Associated with */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Associated With
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={association}
                onChange={(e) => setAssociation(e.target.value)}
                required
              >
                <option value="">Select association</option>
                <option value="mba">
                  Masters in Business Administration at UCP
                </option>
                {/* Add other options as needed */}
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 transition-colors duration-200 px-3 py-2 rounded text-white hover:bg-blue-600"
              >
                {isEditing ? "Update Project" : "Save Project"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}


        {/* Display Fetched Projects */}
        <div>
          {/* <h3 className="text-2xl font-semibold mb-6">Your Projects</h3> */}
          {fetchedProjects.length > 0 ? (
            <div className="space-y-6 list-none">
              {fetchedProjects.map((project) => (
                <div
                  key={project._id}
                  className="rounded-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* Project Details */}
                    <div className="flex flex-col space-y-3">
                      {/* {project.image && (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="h-20 w-20 object-cover rounded-md"
                        />
                      )} */}
                      <div>
                        <h4 className="text-base font-source-sans font-semibold">{project.name}</h4>
                        
                        <p className="text-base font-source-sans  hover:text-blue-800 text-blue-600">
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.projectUrl}
                          </a>
                        </p>
                        {/* <p className="text-sm text-gray-500">
                          {project.startMonth} {project.startYear} -{" "}
                          {project.isOngoing
                            ? "Present"
                            : `${project.endMonth} ${project.endYear}`}
                        </p> */}
                        {/* {project.association && (
                          <p className="text-sm text-gray-500">
                            Associated with: {project.association}
                          </p>
                        )} */}
                        <p className="text-base text-black text-justify mt-3 font-source-sans">
                          {project.description}
                        </p>
                      </div>
                    </div>

                  </div>
                  
                    {/* Action Buttons */}
                    <div className="mt-4 md:mt-4 flex justify-center">
                      <button
                        onClick={() => handleEditClick(project)}
                        className="text-blue-500 rounded-md "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(project)}
                        
                      >
                        Delete
                      </button>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              You have not added any projects yet.
            </p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={cancelDelete}
        contentLabel="Confirm Delete"
        className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        {projectToDelete && (
          <p className="mb-6">
            Are you sure you want to delete the project "
            <strong>{projectToDelete.name}</strong>"?
          </p>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={cancelDelete}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Projects;
