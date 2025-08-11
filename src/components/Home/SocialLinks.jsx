import React from "react";

const SocialLinks = () => {
  const socials = [
    {
      name: "YouTube",
      img: "/socials/youtube.png", // your image path
      link: "https://youtube.com/",
      bg: "bg-red-100",
    },
    {
      name: "Instagram",
      img: "/socials/instagram.png",
      link: "https://instagram.com/",
      bg: "bg-pink-100",
    },
    {
      name: "Facebook",
      img: "/socials/facebook.png",
      link: "https://facebook.com/",
      bg: "bg-blue-100",
    },
    {
      name: "LinkedIn",
      img: "/socials/linkedin.png",
      link: "https://linkedin.com/",
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="bg-zinc-100 w-full h-auto py-20" id="social">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10">Social Section</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 md:w-3/4">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center ${social.bg}`}
            >
              <img
                src={social.img}
                alt={social.name}
                className="w-16 h-16 object-contain"
              />
              <h2 className="text-xl font-semibold mt-3">{social.name}</h2>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
