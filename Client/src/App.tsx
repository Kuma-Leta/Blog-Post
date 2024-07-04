import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPost from "./Components/Profile/AddPost";
import EditPost from "./Components/Profile/EditPost";
import PreviousPosts from "./Components/Profile/PreviousPosts";
import AllPosts from "./Components/AllPosts";
// import Login from "./Components/Login";
// import Signup from "./Components/Signup";
import NotFound from "./Components/NotFound";
import HomePage from "./Components/Home";
import SystemOverview from "./Components/UnAuthenticated/SystemOverview";
import ForgotPassword from "./Components/ForgotPassword";
import PostDetail from "./Components/Posts/PostDetail";

import { PrivateRoutes } from "./privateRoutes";
import UserProfile from "./Components/Profile/UserProfile";
import AuthenticationPage from "./Components/UnAuthenticated/AuthenticationPage ";
// import Navbar from "./Components/Navbar"; // Import your Navbar component here
// import NavbarLoggedIn from "./Components/AuthenticatedNavbar"; // Import your NavbarLoggedIn component here

const App: React.FC = () => {
  // Determine if the user is authenticated (you can implement this logic)
  // const isAuthenticated = true; // Example: Assume user is authenticated

  return (
    <>
      <Router>
        {/* Conditional rendering of Navbar or NavbarLoggedIn */}

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

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
