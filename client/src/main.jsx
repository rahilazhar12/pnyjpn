import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/router/router.jsx";
import "./index.css";
import { SessionStorageProvider } from "./context/Sessionstorage.jsx";




createRoot(document.getElementById("root")).render(
  <SessionStorageProvider>
    <RouterProvider router={router} />
  </SessionStorageProvider>
);
