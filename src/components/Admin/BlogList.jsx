import React from "react";
import BlogListItem from "./BlogListItem";

const BlogList = ({ blogs, onEdit, onDelete }) => (
  <ul className="space-y-2">
    {blogs.map((blog) => (
      <BlogListItem
        key={blog._id}
        blog={blog}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

export default BlogList;
