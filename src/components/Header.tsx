import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase } from 'lucide-react';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
          <Briefcase className="mr-2" />
          OpportunityHub
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/feed" className="text-gray-600 hover:text-blue-600">Opportunities</Link></li>
            {user ? (
              <>
                <li><Link to="/create" className="text-gray-600 hover:text-blue-600">Create</Link></li>
                <li><button onClick={signOut} className="text-gray-600 hover:text-blue-600">Sign Out</button></li>
              </>
            ) : (
              <li><Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;