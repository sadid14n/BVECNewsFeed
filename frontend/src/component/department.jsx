import React from "react";

function DepartmentBox({ title, description, link }) {
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

function Departments() {
  const departments = [
    {
      title: "Computer Science",
      description: "Explore cutting-edge CS projects, events, and research work.",
      link: "/departments/cse",
    },
    {
      title: "Mechanical Engineering",
      description: "Learn about robotics, manufacturing processes, and ME achievements.",
      link: "/departments/me",
    },
    {
      title: "Electrical Engineering",
      description: "Dive into circuits, power systems, and student innovations.",
      link: "/departments/ee",
    },
    {
      title: "Civil Engineering",
      description: "Explore infrastructure projects and student-led civil innovations.",
      link: "/departments/ce",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-4">
      {departments.map((dept, index) => (
        <DepartmentBox
          key={index}
          title={dept.title}
          description={dept.description}
          link={dept.link}
        />
      ))}
    </div>
  );
}

export default Departments;
