import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Raste.Firaste . All rights reserved.
          </p>
          <p className="text-sm mt-2">
            made by 
            <a
              href="https://www.linkedin.com/in/pkpotter03/"
              className="text-blue-400 hover:underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            > @pkpotter03 
            </a>
            &nbsp;with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 