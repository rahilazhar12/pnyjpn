import React, { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

// Create the context
export const UserContext = createContext(); // Ensure export here

// Create a provider component
export const SessionStorageProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const encryptedData = localStorage.getItem("Data");
    if (encryptedData) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          encryptedData,
          `${import.meta.env.CRYPTO_SECRET}`
        );
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setUser(decryptedData);
        setRole(decryptedData.role);
      } catch (error) {
        console.error("Decryption error", error);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("Data");
    setUser(null);
    setRole(null);
  };

  return (
    <UserContext.Provider value={{ user, role, loading, setUser, setRole, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useSessionStorage = () => useContext(UserContext);
