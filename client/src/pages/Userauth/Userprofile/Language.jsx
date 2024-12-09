import React, { useState, useEffect } from "react";
import Select from "react-select";

const proficiencyOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" },
];

const countryOptions = [
  { value: "USA", label: "United States" },
  { value: "CAN", label: "Canada" },
  { value: "GBR", label: "United Kingdom" },
  { value: "AUS", label: "Australia" },
  { value: "IND", label: "India" },
  { value: "GER", label: "Germany" },
  { value: "FRA", label: "France" },
  { value: "ITA", label: "Italy" },
  { value: "BRA", label: "Brazil" },
  { value: "JPN", label: "Japan" },
];

const Language = () => {
  const [languages, setLanguages] = useState([]); // Ensure it's an array
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProficiency, setSelectedProficiency] = useState(null);
  const [editingLanguage, setEditingLanguage] = useState(null);

  // Fetch user's languages
  const fetchLanguages = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/languages`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setLanguages(data);
      } else {
        setLanguages([]); // Fallback to an empty array if the data isn't in the expected format
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
      setLanguages([]); // In case of error, ensure the state is an empty array
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  // Handle country change
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  // Handle proficiency change
  const handleProficiencyChange = (selectedOption) => {
    setSelectedProficiency(selectedOption);
  };

  // Handle form submission for adding new language
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCountry || !selectedProficiency) {
      alert("Please select both country and proficiency.");
      return;
    }

    const newLanguage = {
      country: selectedCountry.value,
      proficiency: selectedProficiency.value,
    };

    // Wrap the newLanguage object inside an array before sending it
    const languagesToAdd = [newLanguage];

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/languages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ languages: languagesToAdd }), // Sending the wrapped array
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add language.");
      }

      // Re-fetch the updated list of languages from the server
      fetchLanguages();
      window.location.reload();
      setSelectedCountry(null);
      setSelectedProficiency(null);
    } catch (error) {
      console.error("Error adding language:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (language) => {
    setEditingLanguage(language);
    setSelectedCountry(
      countryOptions.find((opt) => opt.value === language.country)
    );
    setSelectedProficiency(
      proficiencyOptions.find((opt) => opt.value === language.proficiency)
    );
  };

  // Handle save changes
  const handleSave = async (e) => {
    e.preventDefault();

    if (!selectedCountry || !selectedProficiency || !editingLanguage) {
      alert("Please select both country and proficiency.");
      return;
    }

    const updatedLanguage = {
      country: selectedCountry.value,
      proficiency: selectedProficiency.value,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/languages/${editingLanguage._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedLanguage), // Send updated language data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update language.");
      }

      // Re-fetch the updated list of languages from the server
      fetchLanguages();

      setEditingLanguage(null); // Reset the editing state
      setSelectedCountry(null); // Reset the selected country
      setSelectedProficiency(null); // Reset the selected proficiency
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  const handleDeleteClick = async (languageId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/profile/languages/${languageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete language.");
      }

      // Re-fetch the updated list of languages from the server
      fetchLanguages();
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto mt-6">
        <h1 className="text-2xl font-semibold mb-6">
          {editingLanguage ? "Edit Language" : "Add Language"}
        </h1>

        <form onSubmit={editingLanguage ? handleSave : handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select a Country <span className="text-red-500">*</span>
            </label>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={handleCountryChange}
              placeholder="Choose a country..."
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Proficiency <span className="text-red-500">*</span>
            </label>
            <Select
              options={proficiencyOptions}
              value={selectedProficiency}
              onChange={handleProficiencyChange}
              placeholder="Select proficiency..."
              className="basic-single"
              classNamePrefix="select"
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {editingLanguage ? "Save Changes" : "Add Language"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Languages</h2>
          {languages.length === 0 ? (
            <p>No languages added yet.</p>
          ) : (
            <div>
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 justify-between"
                >
                  <span>
                    {lang.country} - {lang.proficiency}
                  </span>

                  {/* Edit and Delete Buttons */}
                  <div className="flex">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditClick(lang)}
                      className="text-blue-500 hover:text-blue-700 mr-2" // Add small margin only to the right
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteClick(lang._id)} // Ensure to pass the correct language ID for deletion
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Language;
