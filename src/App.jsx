import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
        
      </Routes>
    </Router>
  );
};

export default App;
