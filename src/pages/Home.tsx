import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to OpportunityHub</h1>
      <p className="text-xl mb-8">Connect, Share, and Grow with Entrepreneurs</p>
      {user ? (
        <div>
          <Link to="/create" className="bg-blue-600 text-white px-6 py-2 rounded-md mr-4 hover:bg-blue-700">Create Opportunity</Link>
          <Link to="/feed" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Browse Opportunities</Link>
        </div>
      ) : (
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Get Started</Link>
      )}
    </div>
  );
};

export default Home;