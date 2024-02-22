'use client'

import React from "react";
import NavBar from "@/components/navBar";

export default function Dashboard() {
  const getGrades = async () => {
    const response = await fetch("/get_grades/api");
    const data = await response.json();
    console.log(data);
  };

  return (
    <main>
      <NavBar />
      <div className="dashboard">
        <div className="gpa-card dashboard-card">
          <div className="gpa-card-main-text">3.79</div>
          <div></div>
        </div>
        <button onClick={getGrades}>Get Data</button>
      </div>
    </main>
  );
}