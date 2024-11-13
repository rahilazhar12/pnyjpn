import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../../App";
import ProtectedRoute from "../protectedRoutes/Protectedroutes";
import Restricted from "../../pages/error/restricted/Restricted";
import Loader from "../Loader/Loader";
import Browsesector from "../../pages/categories/Browsesector";
import Applications from "../../pages/applicants/Applications";
import Userprofile from "../../pages/Userauth/Userprofile";
import Jobdetailnew from "../../pages/Jobs/Jobdetailpage/Jobdetailnew";
import ScrollToTop from "../scrolltotop/ScrollToTop";
import Maindashboard from "../../pages/dashboard/Maindashboard";
import Allusers from "../../pages/Userauth/dashboard/Allusers";
import DefaultLayout from "../../layout/Dashboardlayout";

// Lazy loaded components
const Home = lazy(() => import("../../pages/home/Home"));
const StudentRegistrationForm = lazy(() =>
  import("../../pages/Userauth/Signup")
);
const Postajob = lazy(() => import("../../pages/Company/PostaJob/Postajob"));
const CategoryDetail = lazy(() =>
  import("../../pages/categories/Categoriesdetail")
);
const RegisterCompany = lazy(() =>
  import("../../pages/Company/Registercompany/Registercompany")
);
const Companylogin = lazy(() =>
  import("../../pages/Company/companylogin/Companylogin")
);
const Companyprofile = lazy(() =>
  import("../../pages/Company/companyprofile/Companyprofile")
);
const Newprofile = lazy(() => import("../../pages/profilebuilder/Newprofile"));
const Signin = lazy(() => import("../../pages/Userauth/Signin"));
const AdminLogin = lazy(() =>
  import("../../pages/admin/adminlogin/Adminlogin")
);
const Admindashboard = lazy(() => import("../../pages/dashboard/Sidebar"));
const Allcompanies = lazy(() =>
  import("../../pages/Company/dashboard/Allcompanies")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <App />
        <ScrollToTop />
      </Suspense>
    ),
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
      { path: "user_profile/:id", element: <Userprofile /> },
      {
        path: "new-profile",
        element: (
          <ProtectedRoute allowedRoles={["pnyalumini", "User"]}>
            <Newprofile />
          </ProtectedRoute>
        ),
      },

      // Jobs
      { path: "job_details/:id", element: <Jobdetailnew /> },
      { path: "category/:slug", element: <CategoryDetail /> },
      { path: "all-categories", element: <Browsesector /> },

      // Applications
      { path: "application_details/:id", element: <Applications /> },

      // Admin login
      { path: "admin-login", element: <AdminLogin /> },
    ],
  },

  {
    path: "/404",
    element: <Restricted />,
  },

  {
    path: "/admin-dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRoute allowedRoles={["admin"]}>
          <DefaultLayout />
        </ProtectedRoute>
        <ScrollToTop />
      </Suspense>
    ), // Set DashboardMain as the element for /admin-panel route
    children: [
      { index: true, element: <Maindashboard /> },
      { path: "companies", element: <Allcompanies /> },
      { path: "users", element: <Allusers /> },
    ],
  },
]);

export default router;
