import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from '../../pages/home/Home'
import StudentRegistrationForm from "../../pages/Userauth/Signup";
import Postajob from "../../pages/Company/PostaJob/Postajob";
import CategoryDetail from "../../pages/categories/Categoriesdetail";
import RegisterCompany from "../../pages/Company/Registercompany/Registercompany";
import Companylogin from "../../pages/Company/companylogin/Companylogin";
import Companyprofile from "../../pages/Company/companyprofile/Companyprofile";
import ProtectedRoute from "../protectedRoutes/Protectedroutes";
import Restricted from "../../pages/error/restricted/Restricted";
import Newprofile from "../../pages/profilebuilder/Newprofile";
import Main from "../../pages/Newprofilebuilder/Main";
import Signin from "../../pages/Userauth/Signin";



// import About from "../Pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Home Routes
      { index: true, element: <Home /> },

      // Company Routes -----------------------------------------------------
      { path: "register-company", element: <RegisterCompany /> },
      { path: "company-login", element: <Companylogin /> },
      {
        path: "company-profile",
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <Companyprofile />
          </ProtectedRoute>
        ),
      },
      {
        path: "post-jobs",
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <Postajob />
          </ProtectedRoute>
        ),
      },

      // User Routes
      { path: "register-student", element: <StudentRegistrationForm /> },
      { path: "login-users", element: <Signin /> },

      {
        path: "new-profile",
        element: (
          <ProtectedRoute allowedRoles={["pnyalumini"]}>
            <Newprofile />
          </ProtectedRoute>
        ),
      },

      // { path: "all-categories", element: <h1>ALL Categories</h1> },
      { path: "category/:slug", element: <CategoryDetail /> },
    ],
  },

  {
    path: "/404",
    element: <Restricted />,
  },
  {
    path: "/admin-panel",
    // element: <Admin/>,
    children: [
      //   { index: true, element: <Dashboardmain/> },
      //   { path: "add-case", element: <UserRegister/> },
    ],
  },
]);

export default router;
