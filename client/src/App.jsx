import React from "react";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import Mainview from "./pages/Userauth/Userprofile/Mainview";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <Mainview /> */}
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
