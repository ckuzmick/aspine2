import React from "react";
import { cookies } from "next/headers";

export default function Home() {
  const classData = JSON.stringify(cookies().get("classData"), null, 2);

  return (
    <main>
      <pre>{classData}</pre>
    </main>
  );
}
