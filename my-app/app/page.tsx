"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = async () => {
    router.push('/auth?mode=login');
  };

  const handleSignup = async () => {
    router.push('/auth?mode=signup');
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Find Your Perfect Volunteer Opportunity</h1>
        <p>Connect with causes you care about and make a difference in your community.</p>
      </div>
      <div className="buttons">
        
          Sign Up as a Volunteer
        
        <button onClick={handleSignup} className="button button-secondary">
          Sign Up
        </button>
        <button onClick={handleLogin} className="button button-tertiary">
          Login
        </button>
      </div>
      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          background-image: url('/bgimage.jpeg'); 
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 0 20px; 
          box-sizing: border-box;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5); 
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
        }

        .hero-content h1 {
          font-size: 3rem;
          font-weight: 700; 
          margin-bottom: 1rem;
          font-family: 'Helvetica', 'Arial', sans-serif; 
        }

        .hero-content p {
          font-size: 1.5rem;
          font-weight: 500;
          max-width: 600px;
          margin: 0 auto; 
          font-family: 'Helvetica', 'Arial', sans-serif; 
        }

        .buttons {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 2;
        }

        .button {
          padding: 0.75rem 1.5rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-radius: 12px; 
        }

        .button-primary {
          background-color: #0070f3;
          color: white;
        }

        .button-secondary {
          background-color: #eaeaea;
          color: black;
        }

        .button-tertiary {
          background-color: #0070f3;
          color: white;
        }

        .button:hover {
          background-color: #005bb5;
        }

        .button-secondary:hover {
          background-color: #cacaca;
        }

        
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }
          .hero-content p {
            font-size: 1.2rem;
          }
          .buttons {
            flex-direction: column;
            bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
