import React, { useContext } from "react";
import Layout from "../component/Layout";
import { useData } from "../Context/DataContext";

const Dept = () => {
  const [departmenstProfile] = useData();
  return (
    <Layout>
      <h1 className="text-center text-5xl font-semibold mt-5">Departments</h1>
      {departmenstProfile.map((dept, i) => (
        <h2>{dept.name}</h2>
      ))}
    </Layout>
  );
};

export default Dept;
