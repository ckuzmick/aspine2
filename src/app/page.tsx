'use client'

import React, { useState } from 'react';

export default function Home() {
  const [sessionId, setSessionId] = useState('');

  const handleLogin = async () => {
    document.cookie = `JSESSIONID=${sessionId}`; // Set the cookie with the sessionId
    window.location.href = '/dashboard';
  };

  return (
    <main>
      <label>
        Session ID:
        <input type="text" name="session_id" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
      </label>
      <br />
      <button type="submit" onClick={handleLogin}>Login</button>
    </main>
  );
}