import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader"; // adjust the path if needed
import Slider from "react-slick";
import axios from "axios";
import Footer from "../components/Footer";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const API_BASE = import.meta.env.VITE_API_BASE_URL + "/blogs/" + id;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_BASE);
        const latestBlogs = response.data;
        setBlog(latestBlogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlogs();
  },[API_BASE, id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!blog) return <div className="text-center">Blog not found.</div>;

  return (
    <>
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-2">{blog.subtitle}</p>
      <p className="text-sm text-gray-500 italic mb-6">
        {blog.placeNearBy} • {blog.typeOfLocation}
      </p>

      {/* Images */}
      <div className="mb-6">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          arrows={true}
        >
          {blog.images?.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Blog image ${index + 1}`}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          ))}
        </Slider>
      </div>

      <p className="text-lg text-gray-800 leading-relaxed">{blog.content}</p>

      <div className="mt-6">
        <a
          href={blog.locationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mr-4"
        >
          📍 View on Map
        </a>
        <a
          href={blog.igVideoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:underline"
        >
          🎥 Instagram Reel
        </a>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BlogDetails;
