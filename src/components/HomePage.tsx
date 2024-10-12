import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Home, Search, PlusCircle, User } from 'lucide-react';

const HomePage: React.FC = () => {
  const { getColor } = useTheme();

  const OpportunityCard: React.FC<{
    type: 'Opportunity Type' | 'Need',
    title: string,
    author: string,
    date: string,
    description: string,
    category: string,
    likes: number,
    comments: number,
    shares: number
  }> = ({ type, title, author, date, description, category, likes, comments, shares }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full mr-2" />
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{type}</span>
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-blue-600 mb-2">{category}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>❤️ {likes}</span>
        <span>🔁 {comments}</span>
        <span>🔗 {shares}</span>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill={getColor('brandColor')} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
          <h1 className="text-2xl font-bold">Matchup</h1>
        </div>
        <div>Hey Manoj!</div>
      </header>

      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-6 py-2 bg-gray-200 rounded-full font-semibold">Offers</button>
        <button className="px-6 py-2 bg-gray-200 rounded-full font-semibold">Needs</button>
      </div>

      <OpportunityCard
        type="Opportunity Type"
        title="Opportunity Title"
        author="@kritik_krishnan"
        date="date or days ago"
        description="Opportunity Description of 2 lines. Opportunity Description of 2 lines. Opportunity Description of 2 lines. Opportunity Description of 2 lines."
        category="Category"
        likes={15}
        comments={15}
        shares={15}
      />

      <OpportunityCard
        type="Need"
        title="Help needed in Studio setup!"
        author="@kritik_krishnan"
        date="2 days ago"
        description="I'm setting up my physics online classroom & podcast setup. Needed help in guiding on equipment, setup & guidance on how-tos."
        category="Technology"
        likes={15}
        comments={15}
        shares={15}
      />

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        <button className="p-2"><Home size={24} /></button>
        <button className="p-2"><Search size={24} /></button>
        <button className="p-2"><PlusCircle size={24} /></button>
        <button className="p-2"><User size={24} /></button>
      </nav>
    </div>
  );
};

export default HomePage;
