import React, { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js"; // Include this if you're using npm

// Create the context
const UserContext = createContext();

// Create a provider component
export const SessionStorageProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const encryptedData = localStorage.getItem("Data");
    if (encryptedData) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, `${import.meta.env.CRYPTO_SECRET}`);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setUser(decryptedData); // Set the full user object
        setRole(decryptedData.role); // Extract and set the role
      } catch (error) {
        console.error("Decryption error", error);
      }
    }
    setLoading(false); // Set loading to false once data has been processed
  }, []);

  // Logout function to clear session storage and reset state
  const logout = () => {
    localStorage.removeItem("Data");
    setUser(null); // Clear the user state
    setRole(null); // Clear the role state
  };

  return (
    <UserContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useSessionStorage = () => useContext(UserContext);
