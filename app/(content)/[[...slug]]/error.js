'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function ErrorPage({ error, reset }) {
  const router = useRouter(); // Initialize the router

  const handleRedirect = () => {
    router.push('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212', // Dark background
        color: '#f5f5f5', // Light text for contrast
        padding: '20px',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#ff6b6b' }}>
        Oops! Something went wrong
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#cccccc' }}>
        {'An unexpected error occurred. Please try again later.'}
      </p>
      <button
        onClick={handleRedirect}
        style={{
          backgroundColor: '#0070f3',
          color: '#fff',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'background-color 0.3s ease',
          boxShadow: '0 4px 12px rgba(0, 112, 243, 0.3)',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#005bb5')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#0070f3')}
      >
        Go to Home
      </button>
      <div style={{ marginTop: '40px', fontSize: '0.9rem', color: '#888' }}>
        If the issue persists, please contact{' '}
        <a
          href="mailto:support@example.com"
          style={{ color: '#0070f3', textDecoration: 'underline' }}
        >
          support@example.com
        </a>
      </div>
    </div>
  );
}
