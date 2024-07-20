import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddPost from "./Pages/AddPost";
import EditPost from "./Pages/EditPost";
import NotFound from "./Pages/NotFound";
import HomePage from "./Pages/Home";
import SystemOverview from "./Components/UnAuthenticated/SystemOverview";
import ForgotPassword from "./Components/ForgotPassword";
import PostDetail from "./Pages/PostDetail";
import UserProfile from "./Pages/UserProfile";
import AuthenticationPage from "./Components/UnAuthenticated/AuthenticationPage ";
import CategoryPage from "./Components/UnAuthenticated/CategoryPage";

import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import PrivateRoute from "./Components/Admin/PrivateRoute";
import Unauthorized from "./Components/Admin/UnAuthorized";

import { PrivateRoutes } from "./privateRoutes";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SystemOverview />} />
          <Route path="/signup" element={<AuthenticationPage />} />
          <Route path="/login" element={<AuthenticationPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route
            path="/home"
            element={
              <PrivateRoutes>
                <HomePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile/addPost"
            element={
              <PrivateRoutes>
                <AddPost />
              </PrivateRoutes>
            }
          />
          <Route
            path="/profile/editPost/:id"
            element={
              <PrivateRoutes>
                <EditPost />
              </PrivateRoutes>
            }
          />

          <Route
            path="/profile/userProfile"
            element={
              <PrivateRoutes>
                <UserProfile />
              </PrivateRoutes>
            }
          />

          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
