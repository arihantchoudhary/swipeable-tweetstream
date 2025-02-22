
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SwipeableContainer } from "@/components/SwipeableContainer";

// Expanded mock data with diverse topics
const MOCK_TWEETS = [
  {
    id: "1",
    author: {
      name: "AI Enthusiast",
      handle: "aifuture",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AI",
    },
    content: "ChatGPT just helped me solve a complex coding problem in seconds! The future of AI is here and it's amazing. #AI #Technology",
    timestamp: "2m",
  },
  {
    id: "2",
    author: {
      name: "Robot Builder",
      handle: "robotmaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robot",
    },
    content: "Just finished building my first autonomous robot! The robotics competition is going to be epic this year. #Robotics #Engineering",
    timestamp: "5m",
  },
  {
    id: "3",
    author: {
      name: "Football Expert",
      handle: "soccerpro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Football",
    },
    content: "What a match! The Champions League final was absolutely incredible. Best football game I've seen this year! #Football #Soccer",
    timestamp: "10m",
  },
  {
    id: "4",
    author: {
      name: "Tech Observer",
      handle: "techwatch",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
    },
    content: "The latest developments in AI and robotics are revolutionizing healthcare. Amazing to see technology saving lives! #AI #Healthcare",
    timestamp: "15m",
  },
  {
    id: "5",
    author: {
      name: "Political Analyst",
      handle: "polanalyst",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Politics",
    },
    content: "Breaking: Major policy changes announced in Congress today. This could reshape the political landscape. #Politics #Congress",
    timestamp: "20m",
  },
  {
    id: "6",
    author: {
      name: "Sports Update",
      handle: "sports247",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sports",
    },
    content: "The football transfer window is heating up! Some massive deals expected this summer. #Football #Transfers",
    timestamp: "25m",
  }
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
