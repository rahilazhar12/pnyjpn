import React, { useState, useEffect } from "react";
import Select from "react-select";

const proficiencyOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Expert", label: "Expert" },
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
  const [languages, setLanguages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProficiency, setSelectedProficiency] = useState(null);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // New state for toggling form visibility

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
      if (Array.isArray(data)) {
        setLanguages(data);
      } else {
        setLanguages([]);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
      setLanguages([]);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleProficiencyChange = (selectedOption) => {
    setSelectedProficiency(selectedOption);
  };

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
          body: JSON.stringify({ languages: languagesToAdd }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add language.");
      }

      fetchLanguages();
      setIsFormVisible(false); // Hide the form after submission
      setSelectedCountry(null);
      setSelectedProficiency(null);
    } catch (error) {
      console.error("Error adding language:", error);
    }
  };

  const handleEditClick = (language) => {
    setEditingLanguage(language);
    setSelectedCountry(
      countryOptions.find((opt) => opt.value === language.country)
    );
    setSelectedProficiency(
      proficiencyOptions.find((opt) => opt.value === language.proficiency)
    );
    setIsFormVisible(true)
  };

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
        `${import.meta.env.VITE_API_URL}/api/v1/profile/languages/${
          editingLanguage._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedLanguage),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update language.");
      }

      fetchLanguages();
      setEditingLanguage(null);
      setSelectedCountry(null);
      setSelectedProficiency(null);
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

      fetchLanguages();
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-5 max-w-3xl mx-auto mt-6">
        <h1 className="text-2xl font-semibold ">
          {/* {editingLanguage ? "Edit Language" : "Add Language"} */}
        </h1>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-source-sans font-semibold">Languages</h3>
          <button
            onClick={toggleFormVisibility}
            className="text-blue-500 hover:text-blue-700"
          >
            <span className="text-xl font-bold text-blue-500">
              {isFormVisible ? "-" : "+"}
            </span>
          </button>
        </div>

        {isFormVisible && ( // Show form only if isFormVisible is true
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

            <div className="mb-4 flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                {editingLanguage ? "Save Changes" : "Add Language"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6">
          {/* <h2 className="text-xl font-semibold mb-4">Your Languages</h2> */}
          {languages.length === 0 ? (
            <p>No languages added yet.</p>
          ) : (
            <div>
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 justify-between"
                >
                  <span className="text-base font-source-sans">
                    {lang.country} ({lang.proficiency})
                  </span>

                  <div className="flex">
                    <button
                      onClick={() => handleEditClick(lang)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteClick(lang._id)}
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