import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import ReactQuill from "react-quill";

const Experience = () => {
  const industryOptions = [
    { value: "IT", label: "IT" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Education", label: "Education" },
    { value: "Finance", label: "Finance" },
    { value: "Construction", label: "Construction" },
    { value: "Retail", label: "Retail" },
    { value: "Hospitality", label: "Hospitality" },
  ];

  const locationOptions = [
    { value: "Lahore", label: "Lahore" },
    { value: "Gulberg", label: "Gulberg" },
    { value: "Defence", label: "Defence" },
    { value: "Model Town", label: "Model Town" },
    { value: "Bahria Town", label: "Bahria Town" },
    { value: "Johar Town", label: "Johar Town" },
    { value: "Raiwind", label: "Raiwind" },
    { value: "Faisal Town", label: "Faisal Town" },
    { value: "Shalimar", label: "Shalimar" },
    { value: "Walled City", label: "Walled City" },
  ];

  const teamManagementOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const [experienceRecords, setExperienceRecords] = useState([]);
  const [experienceRecord, setExperienceRecord] = useState({
    jobTitle: "",
    company: "",
    industry: "",
    location: "",
    salary: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    currentlyWorking: false,
    description: "",
    teamManagement: "",
  });

  const [editingRecord, setEditingRecord] = useState(null);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  const fetchExperienceRecords = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/experience`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setExperienceRecords(data.data || []);
        const initialRecords = data.data.slice(0, 2);
        setDisplayedRecords(initialRecords);
        setShowMore(data.data.length > data);
      }
    } catch (error) {
      console.error("Error fetching experience records:", error);
    }
  };

  useEffect(() => {
    fetchExperienceRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperienceRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setExperienceRecord((prevState) => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/profile/experience/${editingRecord._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(experienceRecord),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (response.ok) {
          alert("Experience record updated successfully!");
          fetchExperienceRecords();
          setExperienceRecord({
            jobTitle: "",
            company: "",
            industry: "",
            location: "",
            salary: "",
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            currentlyWorking: false,
            description: "",
            teamManagement: "",
          });
          setShowForm(false);
        } else {
          alert(data.message || "Error updating experience record");
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/profile/experience`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              experienceRecords: [experienceRecord],
            }),
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Experience record saved successfully!");
          setExperienceRecord({
            jobTitle: "",
            company: "",
            industry: "",
            location: "",
            salary: "",
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
            currentlyWorking: false,
            description: "",
            teamManagement: "",
          });
          fetchExperienceRecords();
          setShowForm(false);
          window.location.reload()
        } else {
          alert(data.message || "Error saving experience record");
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error saving or updating experience record");
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setExperienceRecord(record);
    setShowForm(true);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggleShowMore = () => {
    if (showMore) {
      setDisplayedRecords(experienceRecords.slice(0, 2));
    } else {
      setDisplayedRecords(experienceRecords);
    }
    setShowMore(!showMore);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingRecord(null);
  };

  const handleDelete = async (experienceRecordId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/experience/${experienceRecordId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setExperienceRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== experienceRecordId)
        );
        alert("Record deleted successfully");
        fetchExperienceRecords();
        window.location.reload()
      } else {
        throw new Error("Failed to delete record");
      }
    } catch (error) {
      console.error("Error deleting experience record:", error);
      alert("Failed to delete record");
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-6"
      ref={formRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Experience</h3>
        <button
          onClick={toggleForm}
          className="text-blue-500 hover:text-blue-700"
        >
          <span className="text-xl font-bold">{showForm ? "-" : "+"}</span>
        </button>
      </div>

      {showForm && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {editingRecord ? "Edit Experience Record" : "Add Experience Record"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={experienceRecord.jobTitle}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={experienceRecord.company}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Industry *
              </label>
              <Select
                options={industryOptions}
                value={industryOptions.find(
                  (option) => option.value === experienceRecord.industry
                )}
                onChange={handleSelectChange("industry")}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <Select
                options={locationOptions}
                value={locationOptions.find(
                  (option) => option.value === experienceRecord.location
                )}
                onChange={handleSelectChange("location")}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={experienceRecord.salary}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <div className="flex space-x-4">
                  <select
                    name="startMonth"
                    value={experienceRecord.startMonth}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                  >
                    <option value="">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    {/* Add all months */}
                  </select>
                  <input
                    type="number"
                    name="startYear"
                    value={experienceRecord.startYear}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                    placeholder="Year"
                  />
                </div>
              </div>

              {/* Conditional rendering for End Date fields */}
              {!experienceRecord.currentlyWorking && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <div className="flex space-x-4">
                    <select
                      name="endMonth"
                      value={experienceRecord.endMonth}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                    >
                      <option value="">Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      {/* Add all months */}
                    </select>
                    <input
                      type="number"
                      name="endYear"
                      value={experienceRecord.endYear}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                      placeholder="Year"
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Are you currently working here?
              </label>
              <input
                type="checkbox"
                name="currentlyWorking"
                checked={experienceRecord.currentlyWorking}
                onChange={() =>
                  setExperienceRecord((prevState) => ({
                    ...prevState,
                    currentlyWorking: !prevState.currentlyWorking,
                    endMonth: "", // Clear end date if currently working
                    endYear: "", // Clear end date if currently working
                  }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Team Management
              </label>
              <Select
                options={teamManagementOptions}
                value={teamManagementOptions.find(
                  (option) => option.value === experienceRecord.teamManagement
                )}
                onChange={handleSelectChange("teamManagement")}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <ReactQuill
                value={experienceRecord.description}
                onChange={(value) =>
                  setExperienceRecord((prevState) => ({
                    ...prevState,
                    description: value,
                  }))
                }
                className="mt-1 h-52"
                theme="snow"
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-10 mb-5"
              >
                {editingRecord ? "Update Record" : "Add Record"}
              </button>
            </div>
          </form>
        </div>
      )}
      {experienceRecords.length > 0 ? (
        <div>
          <div className="space-y-4">
            {displayedRecords.map((record, index) => (
              <div
                key={index}
                className="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <h4 className="font-semibold text-lg">{record.degreeTitle}</h4>
                <p className="text-black font-bold">
                  {record.jobTitle}
                </p>
                <p className="text-black">
                  {record.company}
                </p>
                <p className="text-black">{record.startMonth} {record.startYear} - {record.endMonth} {record.endYear} | {record.location}</p>
                <p dangerouslySetInnerHTML={{ __html: record.description}} />
                <button
                  onClick={() => handleEdit(record)}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(record._id)}>Delete</button>
              </div>
            ))}
          </div>
          {experienceRecords.length > 2 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleToggleShowMore}
                className="text-blue-500 hover:text-blue-700"
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">No experience found.</p>
      )}
    </div>
  );
};

export default Experience;
