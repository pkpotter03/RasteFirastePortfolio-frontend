import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ title, description, imageUrl, link }) => {
  return (
    <div className="card bg-white shadow-lg rounded-lg p-6 m-4 max-w-sm w-full">
      <img
        src={imageUrl}
        alt="Blog Thumbnail"
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <a href={link} className="text-blue-500 hover:underline">
        Read more
      </a>
    </div>
  );
};

export default BlogCard;
