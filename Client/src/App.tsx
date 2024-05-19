import React from "react";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPost from "./Components/Profile/addPost";
// import DeletePost from "./Components/Profile/deletePost";
import EditPost from "./Components/Profile/editPost";
import PreviousPosts from "./Components/Profile/PreviousPosts";
import AllPosts from "./Components/allPosts";
import Login from "./Components/login";
import Signup from "./Components/signup";
import NotFound from "./Components/notFound";
import HomePage from "./Components/home";
import SystemOverview from "./Components/systemOverview";
import { PrivateRoutes } from "./privateRoutes";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SystemOverview />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/profile/addPost"
            element={
              <PrivateRoutes>
                <AddPost />
              </PrivateRoutes>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoutes>
                <HomePage />
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
            path="/allPosts"
            element={
              <PrivateRoutes>
                <AllPosts />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
