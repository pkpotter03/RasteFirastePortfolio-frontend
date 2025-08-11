import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Loader from "../Loader";
import axios from "axios";

function getYoutubeId(url) {
  const match = url.match(/(?:v=|\.be\/|embed\/)([\w-]{11})/);
  return match ? match[1] : null;
}

const VideoSlider = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [titles, setTitles] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL + "/yt-videos";

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_BASE)
      .then((res) => {
        setVideos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [API_BASE]);

  useEffect(() => {
    if (videos.length === 0) return;
    setTitles(Array(videos.length).fill("Loading title..."));
    videos.forEach((video, idx) => {
      fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(
          video.link
        )}&format=json`
      )
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          setTitles((prev) => {
            const copy = [...prev];
            copy[idx] = data.title;
            return copy;
          });
        })
        .catch(() => {
          setTitles((prev) => {
            const copy = [...prev];
            copy[idx] = "No title found";
            return copy;
          });
        });
    });
  }, [videos]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <section
      className="bg-zinc-100 w-full min-h-auto pt-24 pb-8 px-4 flex flex-col items-center"
      id="Latest"
    >
      <h1 className="text-5xl font-bold mb-8">Latest Videos</h1>

      {loading && <Loader />}

      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && videos.length > 0 && (
        <div className="w-full max-w-3xl px-4 relative">
          <Slider {...settings}>
            {videos.map((video, idx) => {
              const vid = getYoutubeId(video.link);
              const thumb = vid
                ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
                : null;
              return (
                <div key={idx} className="px-2">
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full aspect-video rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={thumb}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </a>
                  <p className="text-center mt-3 text-sm sm:text-base md:text-lg font-medium px-2 truncate">
                    {titles[idx] || "Loading title..."}
                  </p>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default VideoSlider;
