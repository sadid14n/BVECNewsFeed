import React from "react";
import Layout from "../component/Layout";
import bvecImage from "../assets/bvecback.jpg"; // Make sure this image exists

const About = () => {
  return (
    <Layout>
      {/* Hero Image Section */}
      <div
        className="w-full h-64 md:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${bvecImage})` }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
            About Barak Valley Engineering College
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Barak Valley Engineering College (BVEC), established by the
            Government of Assam, is a premier technical institute located in the
            southern region of Assam. With dedicated faculties, modern
            infrastructure, and a thriving student community, BVEC aims to
            deliver quality technical education and research opportunities.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed text-lg">
            Our mission is to foster innovation, encourage leadership, and
            promote excellence in engineering and technology.
          </p>
        </div>

        {/* Optional: Image on side for larger screens */}
        <div className="hidden md:block">
          <img
            src={bvecImage}
            alt="BVEC Campus"
            className="rounded-lg shadow-lg w-full object-cover h-80"
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;
