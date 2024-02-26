import React from "react";
import { cookies } from "next/headers";
import NavBar from "@/components/navBar";

export default function Home() {
  const classData = JSON.parse(cookies().get("classData").value);
  console.log(classData);

  return (
    <main>
      <NavBar />
      <table>
        <tbody>
          {classData.map((data, index) => (
            <tr key={index}>
              <td>{data.className}</td>
              <td>{data.teacherName}</td>
              <td>{data.grade}</td>
              <td>{data.room}</td>
              {/* Add more table cells for other properties */}
            </tr>
          ))}
        </tbody>
      </table>
      
    </main>
  );
}
