'use client'

import React, { useState } from 'react';

export default function Home() {
  const [sessionId, setSessionId] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/add_session_cookie/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId })
      });
      
      if (response.ok) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      // Handle error here
    }
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