import React, { useState, useEffect, startTransition } from "react";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const AllCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCompanies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/company/get-all-companies"
      );
      const data = await response.json();

      startTransition(() => {
        setCompanies(data);
        setFilteredCompanies(data);

        // Extract unique cities from the data
        const uniqueCities = [...new Set(data.map((company) => company.city))];
        setCities(uniqueCities);
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleApprovalChange = async (userid, isUserApproved) => {
    console.log(userid, isUserApproved);
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/company/approve-company/${userid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: isUserApproved }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchCompanies();
      } else {
        console.error("Error updating approval status:", data);
      }
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  // Handle filtering based on the selected city
  const handleCityChange = (event) => {
    const city = event.target.value;
    startTransition(() => {
      setSelectedCity(city);
      if (city === "") {
        setFilteredCompanies(companies); // Show all companies if no city is selected
      } else {
        const filtered = companies.filter((company) => company.city === city);
        setFilteredCompanies(filtered);
      }
    });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center bg-gray-200 p-3">
        All Companies
      </h1>

      {/* City filter dropdown */}
      <div className="mb-4">
        <label htmlFor="city-filter" className="block text-lg font-medium mb-2">
          Filter by City:
        </label>
        <select
          id="city-filter"
          value={selectedCity}
          onChange={handleCityChange}
          className="px-3 py-2 border rounded w-full"
        >
          <option value="">All Cities</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">NTN Number</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Social Links</th>
              <th className="px-4 py-2 border-b">Approval Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{company.name}</td>
                  <td className="px-4 py-2 border-b">{company.ntnnumber}</td>
                  <td className="px-4 py-2 border-b">{company.city}</td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex justify-center items-center space-x-2">
                      {company.facebook && (
                        <a
                          href={company.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600"
                        >
                          <FaFacebook size={20} />
                        </a>
                      )}
                      {company.linkedin && (
                        <a
                          href={company.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700"
                        >
                          <FaLinkedin size={20} />
                        </a>
                      )}
                      {company.personincontact && (
                        <a
                          href={`https://wa.me/${company.personincontact}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600"
                        >
                          <FaWhatsapp size={20} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={company.isApproved}
                      onChange={(e) =>
                        handleApprovalChange(company._id, e.target.value)
                      }
                      className="px-2 py-1 border rounded"
                    >
                      <option value="true">Approved</option>
                      <option value="false">Not Approved</option>
                    </select>
                  </td>

                  <td className="px-4 py-2 border-b">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-2 border-b">
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCompanies;
