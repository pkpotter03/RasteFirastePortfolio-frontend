import React, { useEffect, useState } from "react";
import BlogCard from "./blog/BlogCard";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL + "/blogs";

  useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_BASE);

      // Axios automatically parses JSON, so use response.data directly
      const latestBlogs = response.data.slice(0, 3); // Assuming sorted DESC
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
    <section className="bg-zinc-100 w-full h-auto pt-20" id="blogs">
      {/* Hero section content */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">Blog Section</h1>
        <div className="text-center mt-4">
          <p className="text-lg text-gray-700">
            Explore our latest blogs and articles on various topics.
          </p>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="flex flex-wrap justify-center items-center">
        {loading && <Loader />}

        {error && <div className="text-red-400">{error}</div>}

        {!loading &&
          !error &&
          blogs.length > 0 &&
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              description={blog.subtitle}
              imageUrl={blog.images[0]}
              link={`/blogs/${blog._id}`}
            />
          ))}
      </div>

      {/* View All Blogs button */}
      <div className="flex flex-col justify-center items-center">
        <Link to="/blogs">
          <button className="bg-blue-500 text-white px-6 py-2 mb-5 rounded-lg hover:bg-blue-600 transition duration-300">
            View All Blogs
          </button>
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
