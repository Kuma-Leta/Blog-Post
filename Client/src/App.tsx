import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddPost from "./Pages/AddPost";
import EditPost from "./Pages/EditPost";
import PreviousPosts from "./Components/Profile/PreviousPosts";
import AllPosts from "./Components/AllPosts";
import NotFound from "./Components/NotFound";
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
          {/* Public routes */}
          <Route path="/" element={<SystemOverview />} />
          <Route path="/signup" element={<AuthenticationPage />} />
          <Route path="/login" element={<AuthenticationPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* Private routes requiring authentication */}
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
            path="/profile/previousPosts"
            element={
              <PrivateRoutes>
                <PreviousPosts />
              </PrivateRoutes>
            }
          />
          <Route
            path="/allPosts"
            element={
              <PrivateRoutes>
                <AllPosts />
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

          {/* Route for post detail */}
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          {/* Admin routes */}
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

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
