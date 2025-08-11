import React from "react";

const BlogListItem = ({ blog, onEdit, onDelete }) => (
  <li className="border p-3 rounded flex justify-between items-center">
    <span>{blog.title}</span>
    <div className="space-x-2">
      <button
        onClick={() => onEdit(blog)}
        className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(blog._id)}
        className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
      >
        ✕
      </button>
    </div>
  </li>
);

export default BlogListItem;
