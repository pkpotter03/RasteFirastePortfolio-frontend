import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const BlogForm = ({ formData, onChange, onSubmit, editId }) => {
  const [errors, setErrors] = useState([]);

  const onDrop = (acceptedFiles, fileRejections) => {
    const newErrors = [];

    // Check if adding will exceed limit
    if (formData.images.length + acceptedFiles.length > MAX_IMAGES) {
      newErrors.push(`You can only upload up to ${MAX_IMAGES} images.`);
    } else {
      const event = {
        target: {
          name: "images",
          files: [...formData.images, ...acceptedFiles],
        },
      };
      onChange(event);
    }

    // Collect errors from rejected files
    fileRejections.forEach((rej) => {
      rej.errors.forEach((err) => {
        newErrors.push(`${rej.file.name} - ${err.message}`);
      });
    });

    setErrors(newErrors);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    const event = {
      target: {
        name: "images",
        files: updatedImages,
      },
    };
    onChange(event);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 mb-4">
      <input
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="Title"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="subtitle"
        value={formData.subtitle}
        onChange={onChange}
        placeholder="Subtitle"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="placeNearBy"
        value={formData.placeNearBy}
        onChange={onChange}
        placeholder="Place Nearby"
        className="border p-2 w-full rounded"
      />
      <input
        name="typeOfLocation"
        value={formData.typeOfLocation}
        onChange={onChange}
        placeholder="Type of Location"
        className="border p-2 w-full rounded"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={onChange}
        placeholder="Content"
        className="border p-2 w-full rounded"
      ></textarea>
      <input
        name="locationLink"
        value={formData.locationLink}
        onChange={onChange}
        placeholder="Location Link"
        className="border p-2 w-full rounded"
      />
      <input
        name="igVideoLink"
        value={formData.igVideoLink}
        onChange={onChange}
        placeholder="Instagram Video Link"
        className="border p-2 w-full rounded"
      />
      <input
        name="ytVideoLink"
        value={formData.ytVideoLink}
        onChange={onChange}
        placeholder="YouTube Video Link"
        className="border p-2 w-full rounded"
      />

      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-4 text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <img src="/Admin/upload-icon.png" alt="Upload Icon" className="w-32 h-32 mx-auto mb-2" />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <p>
            Drag & drop images here, or click to select files (Max: {MAX_IMAGES} images, {MAX_FILE_SIZE / 1024 / 1024}MB each, 16:9 size)
          </p>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="text-red-600 text-sm mt-2">
          {errors.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}

      {/* Preview thumbnails with remove button */}
      {formData.images.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {formData.images.map((file, index) => {
            const src = file instanceof File ? URL.createObjectURL(file) : file;
            return (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      <button
        type="submit"
        className="flex justify-self-center bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
      >
        {editId ? "Update Blog" : "Add Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
