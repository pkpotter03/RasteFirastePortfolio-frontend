import React from "react";
import BlogCard from "../components/Home/blog/BlogCard"; // adjust the path if needed
import { useEffect, useState } from "react";
import Loader from "../components/Loader"; // adjust the path if needed
import axios from "axios";
import Footer from "../components/Footer";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL + "/blogs";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_BASE);
        const latestBlogs = response.data;
        setBlogs(latestBlogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlogs();
  });

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">All Blogs</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No blogs available.</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              description={blog.subtitle}
              imageUrl={blog.images?.[0]}
              link={`/blogs/${blog._id}`}
            />
          ))
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Blogs;
