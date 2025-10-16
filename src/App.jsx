import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import TermsAndConditions from "./pages/TermsAndConditions";
import Navbar from "./components/Common/Navbar";
import NotFound from "./components/App/NotFound";

import ProtectedRoute from "./utils/protectedRoute";
import Configure from "./components/SuperAdmin/Configure";
import Ascan from "./components/SuperAdmin/Ascan/Ascan";

const App = () => {
  const location = useLocation();

  // prettier-ignore
  const pathsToHideNavbar = ["/", "/reports", "/analytics", "/settings", "/Admin","/admin",'/admin/configure','/admin/Ascan'];
  const hideNavbar = pathsToHideNavbar.includes(location.pathname);

  return (
    <div className="h-screen w-full  font-fonts">
      {hideNavbar && (
        <div className="h-[8%]">
          <Navbar />
        </div>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* protected route for T&C */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["superAdmin", "admin", "user"]}
              requireTC={false}
            />
          }
        >
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
        </Route>

        {/* protected route for dashboard pages */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              allowedRoles={["superAdmin", "admin", "user"]}
              requireTC={true}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* protected route for admin page */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["superAdmin"]} requireTC={true} />
          }
        >
          <Route path="/admin/configure" element={<Configure />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/Ascan" element={<Ascan />} />
        </Route>

        {/* 404 handler */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="light"
      />
    </div>
  );
};

export default App;
