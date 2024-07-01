'use client';

import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

export default function RecommendationsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [recommendations, setRecommendations] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    if (!selectedDate) {
      setError('Please select a date');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Event[]>('/api/recommendations', {
        headers: { Authorization: `Bearer ${token}` },
        params: { date: selectedDate.toISOString() }
      });
      setRecommendations(response.data);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Recommendations</h1>
      <div className="mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          className="p-2 border rounded"
          placeholderText="Select a date"
        />
        <button 
          onClick={fetchRecommendations}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Get Recommendations
        </button>
      </div>

      {loading && <p>Loading recommendations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {recommendations.map((event) => (
        <div key={event._id} className="border p-4 mb-4 rounded">
          <h2 className="text-xl font-semibold">{event.title}</h2>
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
