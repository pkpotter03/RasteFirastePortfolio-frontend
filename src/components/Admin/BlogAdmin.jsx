import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import Loader from "../Loader";

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/blogs";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    placeNearBy: "",
    typeOfLocation: "",
    content: "",
    locationLink: "",
    igVideoLink: "",
    ytVideoLink: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [editId, setEditId] = useState(null);


  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, images: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < formData.images.length; i++) {
          payload.append("images", formData.images[i]);
        }
      } else {
        payload.append(key, formData[key]);
      }
    });

    try {
      setLoading(true);
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(API_BASE, payload);
      }
      resetForm();
      fetchBlogs();
      setSuccess("Blog saved successfully");
      setError(null);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to save blog");
      setSuccess(null);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      placeNearBy: "",
      typeOfLocation: "",
      content: "",
      locationLink: "",
      igVideoLink: "",
      ytVideoLink: "",
      images: [],
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchBlogs();
      setSuccess("Blog deleted successfully");
      setError(null);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to delete blog");
      setSuccess(null);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleEdit = (blog) => {
    setEditId(blog._id);
    setFormData({
      title: blog.title,
      subtitle: blog.subtitle,
      placeNearBy: blog.placeNearBy,
      typeOfLocation: blog.typeOfLocation,
      content: blog.content,
      locationLink: blog.locationLink,
      igVideoLink: blog.igVideoLink,
      ytVideoLink: blog.ytVideoLink,
      images: [],
    });
  };

  return (
    <div className="py-6">
      <h1 className="flex justify-self-center text-4xl font-bold mb-4">Blog Admin</h1>
      <BlogForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editId={editId}
      />

      {loading && <Loader />}
      {error && <p className="text-red-500 flex justify-self-center">{error}</p>}
      {success && <p className="text-green-500 justify-self-center">{success}</p>}

      <BlogList
        blogs={blogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default BlogAdmin;
