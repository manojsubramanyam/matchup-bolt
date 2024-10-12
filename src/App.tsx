import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateOpportunity from './pages/CreateOpportunity';
import OpportunityFeed from './pages/OpportunityFeed';
import OpportunityDetails from './pages/OpportunityDetails';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<CreateOpportunity />} />
              <Route path="/feed" element={<OpportunityFeed />} />
              <Route path="/opportunity/:id" element={<OpportunityDetails />} />
            </Routes>
          </main>
          <Toaster position="bottom-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;