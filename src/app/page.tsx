'use client'

import React, { useRef, FormEvent } from 'react';

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const response = await fetch('/login/api', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.href = '/classes'; // replace with your redirect URL
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label>
          Username: 
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password: 
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}