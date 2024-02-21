'use client'

import React from "react";

export default function Page() {
  return (
    <main>
      <h1>Classes</h1>
      <p>Here are your classes:</p>
      <ul>
        <li>Math</li>
        <li>Science</li>
        <li>History</li>
      </ul>
      <button onClick={() => fetch("/get_classes/api")}>Get Real Classes</button>
    </main>
  );
}