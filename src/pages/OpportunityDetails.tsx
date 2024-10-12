import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Share2, ThumbsUp, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface Opportunity {
  id: number;
  title: string;
  description: string;
  type: string;
  created_at: string;
  user_id: string;
  likes: number;
}

const OpportunityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  const fetchOpportunity = async () => {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching opportunity:', error);
    } else {
      setOpportunity(data);
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Link copied to clipboard!');
    }, () => {
      toast.error('Failed to copy link');
    });
  };

  const handleLike = async () => {
    if (!opportunity) return;

    const { data, error } = await supabase
      .from('opportunities')
      .update({ likes: opportunity.likes + 1 })
      .eq('id', opportunity.id);

    if (error) {
      toast.error('Failed to like opportunity');
    } else {
      setOpportunity({ ...opportunity, likes: opportunity.likes + 1 });
      toast.success('Opportunity liked!');
    }
  };

  if (!opportunity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <Link to="/feed" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <ArrowLeft size={20} className="mr-2" />
        Back to Feed
      </Link>
      <h2 className="text-3xl font-bold mb-4">{opportunity.title}</h2>
      <p className="text-gray-600 mb-4">{opportunity.description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm ${opportunity.type === 'need' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
        </span>
        <div className="flex space-x-4">
          <button onClick={handleLike} className="flex items-center text-gray-500 hover:text-blue-600">
            <ThumbsUp size={20} className="mr-2" />
            <span>{opportunity.likes}</span>
          </button>
          <button onClick={handleShare} className="text-gray-500 hover:text-blue-600">
            <Share2 size={20} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Posted on: {new Date(opportunity.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default OpportunityDetails;