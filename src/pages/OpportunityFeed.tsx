import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Share2, ThumbsUp } from 'lucide-react';
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

const OpportunityFeed: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOpportunities();
  }, [filter]);

  const fetchOpportunities = async () => {
    let query = supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('type', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching opportunities:', error);
    } else {
      setOpportunities(data || []);
    }
  };

  const handleShare = (opportunity: Opportunity) => {
    const shareUrl = `${window.location.origin}/opportunity/${opportunity.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Link copied to clipboard!');
    }, () => {
      toast.error('Failed to copy link');
    });
  };

  const handleLike = async (opportunityId: number) => {
    const { data, error } = await supabase
      .from('opportunities')
      .update({ likes: opportunities.find(o => o.id === opportunityId)!.likes + 1 })
      .eq('id', opportunityId);

    if (error) {
      toast.error('Failed to like opportunity');
    } else {
      setOpportunities(opportunities.map(o => 
        o.id === opportunityId ? { ...o, likes: o.likes + 1 } : o
      ));
      toast.success('Opportunity liked!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Opportunity Feed</h2>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="all">All Opportunities</option>
          <option value="need">Needs</option>
          <option value="offering">Offerings</option>
        </select>
      </div>
      <div className="space-y-4">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <Link to={`/opportunity/${opportunity.id}`} className="text-xl font-semibold mb-2 hover:text-blue-600">{opportunity.title}</Link>
                <p className="text-gray-600 mb-2">{opportunity.description}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-sm ${opportunity.type === 'need' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                </span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleLike(opportunity.id)} className="text-gray-500 hover:text-blue-600 flex items-center">
                  <ThumbsUp size={20} className="mr-1" />
                  <span>{opportunity.likes}</span>
                </button>
                <button onClick={() => handleShare(opportunity)} className="text-gray-500 hover:text-blue-600">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunityFeed;