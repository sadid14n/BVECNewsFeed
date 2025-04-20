import React from "react";

function ClubBox({ title, description, link }) {
  return (
    <div className="w-full md:w-1/2 px-4 mb-6">
      <h3 className="font-semibold text-lg pl-2 mb-2">{title}</h3>
      <div className="p-4 bg-gray-100 rounded shadow h-80 flex flex-col justify-between">
        <div>
          <p>{description}</p>
        </div>
        <a
          href={link}
          className="text-right text-white bg-blue-600 px-4 py-2 rounded self-end hover:bg-blue-700"
        >
          Visit
        </a>
      </div>
    </div>
  );
}

function Clubs() {
  const clubs = [
    {
      title: "Code Club",
      description:
        "Dive into the world of programming, problem-solving, and tech innovation.",
      link: "/clubs/code",
    },
    {
      title: "Robo Club",
      description:
        "Build, program, and innovate with robots and cutting-edge tech.",
      link: "/clubs/robo",
    },
    {
      title: "Dance Club",
      description: "Express yourself through rhythm, movement, and performances.",
      link: "/clubs/dance",
    },
    {
      title: "Music Club",
      description:
        "Unite through melodies, instruments, and the love for music.",
      link: "/clubs/music",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-4">
      {clubs.map((club, index) => (
        <ClubBox
          key={index}
          title={club.title}
          description={club.description}
          link={club.link}
        />
      ))}
    </div>
  );
}

export default Clubs;
