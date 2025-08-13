import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader"; // make sure this exists

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/yt-videos";

const YtVideoAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState({}); // store titles by video _id

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setVideos(res.data);

      // fetch YouTube titles
      res.data.forEach((video) => {
        fetchTitle(video._id, video.link);
      });
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTitle = async (id, videoUrl) => {
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
        videoUrl
      )}&format=json`;
      const res = await axios.get(oembedUrl);
      setTitles((prev) => ({ ...prev, [id]: res.data.title }));
    } catch (err) {
      console.error("Error fetching title:", err);
      setTitles((prev) => ({ ...prev, [id]: "Unknown Title" }));
    }
  };

  const addVideo = async (e) => {
    e.preventDefault();
    if (!link.trim()) return alert("Please enter a YouTube link");

    setLoading(true);
    try {
      const res = await axios.post(API_BASE, { link });
      setLink("");
      setVideos((prev) => [...prev, res.data]);
      fetchTitle(res.data._id, res.data.link); // fetch title for new video
    } catch (err) {
      console.error("Error adding video:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setVideos((prev) => prev.filter((video) => video._id !== id));
    } catch (err) {
      console.error("Error deleting video:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-center text-3xl font-bold mb-6">
        YouTube Video Admin
      </h1>

      {/* Add Video Form */}
      <form onSubmit={addVideo} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter YouTube video link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Video List */}
      {loading && <Loader />}
      {!loading && (
        <div className="space-y-4">
          {videos.length === 0 ? (
            <p className="text-center text-gray-500">No videos added yet.</p>
          ) : (
            videos.map((video) => (
              <div
                key={video._id}
                className="flex items-center justify-between border p-3 rounded shadow-sm"
              >
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate w-4/5"
                >
                  {titles[video._id] || "Loading title..."}
                </a>
                <button
                  onClick={() => deleteVideo(video._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="w-4 h-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default YtVideoAdmin;
