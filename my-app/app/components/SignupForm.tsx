import React, { useState } from 'react';
import axios from 'axios';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = { username, email, password, dateOfBirth };
      const response = await axios.post('/api/auth/signup', payload);
      console.log('Signup successful:', response.data);
    
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Signup error:', error.response?.data);
        
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
      <style jsx>{`
        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
          margin: 0 auto;
        }
        .signup-form input {
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .signup-form button {
          padding: 0.75rem;
          font-size: 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .signup-form button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </form>
  );
};

export default SignupForm;
