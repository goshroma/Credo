'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  requiredSkills: string[];
  cause: string[];
}

export default function HomePage() {
  const [volunteerId, setVolunteerId] = useState('');
  const [topRecommendations, setTopRecommendations] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopRecommendations = async () => {
    if (!volunteerId) {
      setError('Please enter a Volunteer ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/recommendations/${volunteerId}?limit=3`);
      setTopRecommendations(response.data);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">NGO Event Recommendation System</h1>
      
      <div className="mb-6">
        <input
          type="text"
          value={volunteerId}
          onChange={(e) => setVolunteerId(e.target.value)}
          placeholder="Enter Volunteer ID"
          className="border p-2 mr-2"
        />
        <button 
          onClick={fetchTopRecommendations}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Get Top Recommendations
        </button>
      </div>

      {loading && <p>Loading recommendations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {topRecommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Top 3 Recommended Events</h2>
          {topRecommendations.map((event) => (
            <div key={event._id} className="border p-4 mb-4 rounded">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p>{event.description.substring(0, 100)}...</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location.city}, {event.location.state}</p>
            </div>
          ))}
          <Link href={`/recommendations?volunteerId=${volunteerId}`}>
            <a className="text-blue-500 hover:underline">View All Recommendations</a>
          </Link>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p>Our recommendation system uses advanced algorithms to match volunteers with NGO events based on:</p>
        <ul className="list-disc list-inside">
          <li>Volunteer's skills and interests</li>
          <li>Event causes and required skills</li>
          <li>Location preferences</li>
          <li>Availability</li>
        </ul>
        <p className="mt-4">Enter your Volunteer ID above to see personalized event recommendations!</p>
      </div>
    </div>
  );
}
