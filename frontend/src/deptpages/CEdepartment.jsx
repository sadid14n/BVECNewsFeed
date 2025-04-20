// src/pages/CEDepartment.jsx
import React from "react";

function CEDepartment() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CIVIL engineering Department</h1>
      <p className="mb-2">
        Welcome to the CE Department. Here you'll find details about:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Faculty members and their research</li>
        <li>Student achievements and projects</li>
        <li>Department events and workshops</li>
        <li>Course curriculum</li>
      </ul>
    </div>
  );
}

export default CEDepartment;
