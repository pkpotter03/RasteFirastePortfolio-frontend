import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[rgba(0,0,0,0.5)] text-white shadow">
      <div className="p-5 flex flex-row items-center w-full ">
        <div className="flex items-center pl-5">
          <img className="" src="/vite.svg" alt="logo" />
        </div>
        {/* Hamburger button for small screens */}
        <button
          className="ml-auto md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Nav links */}
        <div className="hidden md:flex gap-30 justify-center items-center w-full text-lg">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#Latest">Latest Videos</a>
          <a href="#blogs">Blogs</a>
          <a href="#social">Social</a>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-[rgba(0,0,0,0.5)] flex flex-col items-center py-4 md:hidden text-lg gap-6">
            <a href="#hero" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#Latest" onClick={() => setMenuOpen(false)}>Latest Videos</a>
            <a href="#blogs" onClick={() => setMenuOpen(false)}>Blogs</a>
            <a href="#social" onClick={() => setMenuOpen(false)}>Social</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
