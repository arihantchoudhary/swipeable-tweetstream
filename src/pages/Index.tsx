
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SwipeableContainer } from "@/components/SwipeableContainer";

// Temporary mock data until Supabase is connected
const MOCK_TWEETS = [
  {
    id: "1",
    author: {
      name: "John Doe",
      handle: "johndoe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    content: "Just setting up my Twitter clone!",
    timestamp: "2m",
  },
  {
    id: "2",
    author: {
      name: "Jane Smith",
      handle: "janesmith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    content: "This horizontal swipe feature is pretty cool!",
    timestamp: "5m",
  },
  {
    id: "3",
    author: {
      name: "Bob Wilson",
      handle: "bobwilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    content: "Can't wait to see this connected to Supabase!",
    timestamp: "10m",
  },
];

const Index = () => {
  const [tweets, setTweets] = useState(MOCK_TWEETS);

  const handleSearch = (query: string) => {
    if (!query) {
      setTweets(MOCK_TWEETS);
      return;
    }
    
    const filtered = MOCK_TWEETS.filter(tweet => 
      tweet.content.toLowerCase().includes(query.toLowerCase()) ||
      tweet.author.name.toLowerCase().includes(query.toLowerCase()) ||
      tweet.author.handle.toLowerCase().includes(query.toLowerCase())
    );
    setTweets(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Swipeable Tweets</h1>
          <p className="text-center text-twitter-text">Swipe left or right to navigate</p>
        </header>
        
        <SearchBar onSearch={handleSearch} />
        
        {tweets.length > 0 ? (
          <SwipeableContainer tweets={tweets} />
        ) : (
          <div className="text-center text-twitter-text mt-8">
            No tweets found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
