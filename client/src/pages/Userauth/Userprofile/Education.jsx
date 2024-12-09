import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

const Education = () => {
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
    { value: "New York", label: "New York" },
    { value: "London", label: "London" },
    { value: "Dubai", label: "Dubai" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "Toronto", label: "Toronto" },
  ];

  const [educationRecords, setEducationRecords] = useState([]);
  const [educationRecord, setEducationRecord] = useState({
    degreeTitle: "",
    fieldOfStudy: "",
    Industry: "",
    location: "",
    institution: "",
    completionYear: "",
    cgpa: "",
  });

  const [editingRecord, setEditingRecord] = useState(null);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [showMore, setShowMore] = useState(false); // Initially false to show "Show More"
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null); // Create a reference for the form

  const fetchEducationRecords = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/education`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEducationRecords(data.data || []);
        const initialRecords = data.data.slice(0, 2); // Initially show only 2 records
        setDisplayedRecords(initialRecords);
        setShowMore(data.data.length > data); // Show "Show More" if more than 2 records
      }
    } catch (error) {
      console.error("Error fetching education records:", error);
    }
  };

  useEffect(() => {
    fetchEducationRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setEducationRecord((prevState) => ({
      ...prevState,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/profile/education/${editingRecord._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(educationRecord),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (response.ok) {
          alert("Education record updated successfully!");

          fetchEducationRecords(); // Fetch updated records after update
          setEducationRecord({
            degreeTitle: "",
            fieldOfStudy: "",
            Industry: "",
            location: "",
            institution: "",
            completionYear: "",
            cgpa: "",
          }); // Clear the form fields
          setShowForm(false); // Close the form after updating
        } else {
          alert(data.message || "Error updating education record");
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/profile/education`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              educationRecords: [educationRecord],
            }),
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Education record saved successfully!");
          setEducationRecord({
            degreeTitle: "",
            fieldOfStudy: "",
            Industry: "",
            location: "",
            institution: "",
            completionYear: "",
            cgpa: "",
          });

          fetchEducationRecords(); // Fetch the latest records after adding a new one
          window.location.reload();
          setShowForm(false); // Close the form after saving
        } else {
          alert(data.message || "Error saving education record");
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error saving or updating education record");
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setEducationRecord(record);
    setShowForm(true); // Show the form when editing a record
    formRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
  };

  const handleToggleShowMore = () => {
    if (showMore) {
      setDisplayedRecords(educationRecords.slice(0, 2)); // Show only the first 2 records
    } else {
      setDisplayedRecords(educationRecords); // Show all records
    }
    setShowMore(!showMore); // Toggle the "Show More" state
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form visibility
    setEditingRecord(null); // Reset editing record when toggling
  };

  // Handle the delete request
  const handleDelete = async (educationRecordId) => {
    try {
      // Sending DELETE request to the server using fetch
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/education/${educationRecordId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        // Update state to remove the deleted record from the list
        setEducationRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== educationRecordId)
        );
        alert("Record deleted successfully");
        fetchEducationRecords();
        window.location.reload()
      } else {
        throw new Error("Failed to delete record");
      }
    } catch (error) {
      console.error("Error deleting education record:", error);
      alert("Failed to delete record");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-6">
      {/* Toggle button */}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <button
          onClick={toggleForm}
          className="text-blue-500 hover:text-blue-700"
        >
          <span className="text-xl font-bold">
            {showForm ? "-" : "+"} {/* "+" to show form, "-" to hide */}
          </span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div ref={formRef}>
          {/* Form is wrapped with the ref */}
          <h3 className="text-lg font-semibold mb-4">
            {editingRecord ? "Edit Education Record" : "Add Education Record"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degree Title *
              </label>
              <input
                type="text"
                name="degreeTitle"
                value={educationRecord.degreeTitle}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Field of Study *
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                value={educationRecord.fieldOfStudy}
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
                  (option) => option.value === educationRecord.Industry
                )}
                onChange={handleSelectChange("Industry")}
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
                  (option) => option.value === educationRecord.location
                )}
                onChange={handleSelectChange("location")}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Institution *
              </label>
              <input
                type="text"
                name="institution"
                value={educationRecord.institution}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Completion Year *
              </label>
              <input
                type=""
                name="completionYear"
                value={educationRecord.completionYear}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CGPA *
              </label>
              <input
                type="number"
                name="cgpa"
                value={educationRecord.cgpa}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md"
              >
                {editingRecord ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6">
        {displayedRecords.length > 0 ? (
          displayedRecords.map((record, index) => (
            <div
              key={record._id || index} // It's better to use a unique identifier like _id
              className="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <h4 className="font-semibold text-lg">{record.degreeTitle}</h4>
              <p className="text-gray-600">Institution: {record.institution}</p>
              <p className="text-gray-600">
                Field of Study: {record.fieldOfStudy}
              </p>
              <p className="text-gray-600">Location: {record.location}</p>
              <p className="text-gray-600">Industry: {record.Industry}</p>
              <p className="text-gray-600">
                Completion Year: {record.completionYear}
              </p>
              <p className="text-gray-600">CGPA: {record.cgpa}</p>
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => handleEdit(record)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No education found.</p>
        )}

        {/* Show More / Show Less Button */}
        {educationRecords.length > 2 && (
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
    </div>
  );
};

export default Education;
