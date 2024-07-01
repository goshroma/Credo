import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Location {
  city: string;
  state: string;
  country: string;
}

interface Preferences {
  skills: string[];
  causes: string[];
}

interface Profile {
  name: string;
  location: Location;
  preferences: Preferences;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth');
        return;
      }
      const response = await axios.get<Profile>('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile. Please try again later.');
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Volunteer Profile</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Location:</strong> {profile.location.city}, {profile.location.state}, {profile.location.country}</p>
        <p><strong>Skills:</strong> {profile.preferences.skills.join(', ')}</p>
        <p><strong>Causes:</strong> {profile.preferences.causes.join(', ')}</p>
      </div>
      <button
        onClick={() => router.push('/recommendations')}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Get Recommendations
      </button>
    </div>
  );
}
