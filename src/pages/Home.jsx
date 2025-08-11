import React from "react";
import Navbar from "../components/Home/Navbar";
import HeroSection from "../components/Home/HeroSection";
import About from "../components/Home/About";
import SocialLinks from "../components/Home/SocialLinks";
import Footer from "../components/Footer";
import VideoSlider from "../components/Home/VideoSlider";
import BlogSection from "../components/Home/BlogSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <VideoSlider />
      <BlogSection />
      <SocialLinks />
      <Footer />
    </>
  );
};

export default Home; 