import React, { useState } from "react";
import Header from "../components/Admin/Header";
import YtVideoAdmin from "../components/Admin/YtVideoAdmin"; // Create this
import BlogAdmin from "../components/Admin/BlogAdmin"; // Create this

const Admin = () => {
  const [isYtVideo, setIsYtVideo] = useState(false);
  const [isBlog, setIsBlog] = useState(false);

  const handleShowYtVideo = () => {
    setIsYtVideo(true);
    setIsBlog(false);
  };

  const handleShowBlog = () => {
    setIsBlog(true);
    setIsYtVideo(false);
  };

  const handleBack = () => {
    setIsYtVideo(false);
    setIsBlog(false);
  };

  return (
    <>
      <Header />
      <div className="admin-container px-8 py-5">
        {/* Show Cards if neither option is selected */}
        {!isYtVideo && !isBlog && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* YouTube Video Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4">Manage YouTube Videos</h2>
              <img src="/Admin/YT.png" alt="YouTube Icon" className="w-64 h-64 mb-4" />
              <button
                onClick={handleShowYtVideo}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
              >
                Add YT-Videos Links
              </button>
            </div>

            {/* Blog Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4">Manage Blogs</h2>
              <img src="/Admin/blogs.png" alt="YouTube Icon" className="w-64 h-64 mb-4" />
              <button
                onClick={handleShowBlog}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
              >
                Add Blogs
              </button>
            </div>
          </div>
        )}

        {/* Show YouTube Admin */}
        {isYtVideo && (
          <div>
            <button
              onClick={handleBack}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
            >
               &lt; Back
            </button>
            <YtVideoAdmin />
          </div>
        )}

        {/* Show Blog Admin */}
        {isBlog && (
          <div>
            <button
              onClick={handleBack}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
            >
               &lt; Back
            </button>
            <BlogAdmin />
            
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
