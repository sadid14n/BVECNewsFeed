import React from "react";
import Layout from "../component/Layout";
import SadidProfile from "../assets/sadid-profile.jpg";
import Fajrul from "../assets/fajrul.jpg";
import Kangkan from "../assets/kangkan.jpg";
import Manas from "../assets/manas.jpg";

const Developers = () => {
  const contributors = [
    {
      name: "Manas Seal",
      role: "Contributor",
      image: Manas,
      github: "#",
      linkedin: "#",
    },
    {
      name: "Kangkan Kalita",
      role: "Contributor",
      image: Kangkan,
      github: "#",
      linkedin: "#",
    },
    {
      name: "Rakibul Islam",
      role: "Contributer",
      image: "#",
      github: "#",
      linkedin: "#",
    },
    {
      name: "Fajrul Islam",
      role: "Contributer",
      image: Fajrul,
      github: "#",
      linkedin: "#",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        {/* Developer card */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 text-center mb-12">
          <img
            src={SadidProfile} // Your profile image
            alt="Sadid Alam"
            className="mx-auto rounded-full w-28 h-28 border-4 border-blue-500"
          />
          <h1 className="text-3xl font-bold mt-4">Developed by Sadid Alam</h1>
          <p className="text-gray-600 mt-2">Lead Developer | MERN Stack</p>
          <div className="flex justify-center mt-4 space-x-4 text-xl">
            <a
              href="https://github.com/sadid14n"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-700"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/sadid14n"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/sadid_14"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500"
            >
              Twitter
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 max-w-3xl mx-auto mb-8" />

        {/* Contributors */}
        <h2 className="text-2xl font-bold text-center mb-6">Contributors</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {contributors.map((person, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition"
            >
              <img
                src={person.image}
                alt={person.name}
                className="mx-auto rounded-full w-24 h-24"
              />
              <h3 className="text-lg font-semibold mt-3">{person.name}</h3>
              <p className="text-gray-500 text-sm">{person.role}</p>
              <div className="flex justify-center gap-4 mt-3 text-sm">
                <a href={person.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href={person.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Developers;
