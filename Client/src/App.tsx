// App.tsx

import React from "react";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPost from "./Components/Profile/AddPost";
// import DeletePost from "./Components/Profile/deletePost";
import EditPost from "./Components/Profile/EditPost";
import PreviousPosts from "./Components/Profile/PreviousPosts";
import AllPosts from "./Components/AllPosts";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NotFound from "./Components/NotFound";
import HomePage from "./Components/Home";
import SystemOverview from "./Components/SystemOverview";
import ForgotPassword from "./Components/ForgotPassword";
import PostDetail from "./Components/Posts/PostDetail";

import { PrivateRoutes } from "./privateRoutes";
import UserProfile from "./Components/Profile/UserProfile";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SystemOverview />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
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
            path="/profile/editPost"
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

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
