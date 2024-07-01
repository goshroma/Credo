"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = async () => {
    router.push('/auth?mode=login');
  };

  return (
    <div className="hero">
      <div className="hero-image">
        <Image
          src="/hero-image.jpg"
          alt="Volunteers working together"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="hero-content">
        <h1>Find Your Perfect Volunteer Opportunity</h1>
        <p>Connect with causes you care about and make a difference in your community.</p>
        <div className="buttons">
          <Link href="/signup/volunteer" className="button button-primary">
            Sign Up as a Volunteer
          </Link>
          <button onClick={handleLogin} className="button button-secondary">
            Login
          </button>
        </div>
      </div>
      <style jsx>{`
        /* Your existing styles here */
      `}</style>
    </div>
  );
};

export default LandingPage;
