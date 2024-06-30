'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

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

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const volunteerId = searchParams.get('volunteerId');

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!volunteerId) return;
      try {
        const response = await axios.get(`/api/recommendations/${volunteerId}`);
        setRecommendations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recommendations');
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [volunteerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Recommended NGO Events</h1>
      {recommendations.map((event) => (
        <div key={event._id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Location: {event.location.city}, {event.location.state}, {event.location.country}</p>
          <p>Required Skills: {event.requiredSkills.join(', ')}</p>
          <p>Causes: {event.cause.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}