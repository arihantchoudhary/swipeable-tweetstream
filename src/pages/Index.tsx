
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SwipeableContainer } from "@/components/SwipeableContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Expanded mock data with 100 tweets
const MOCK_TWEETS = [
  // ... Original 6 tweets stay the same
  
  // Adding more tweets for each category
  ...[...Array(24)].map((_, i) => ({
    id: `ai-${i + 7}`,
    author: {
      name: `AI Expert ${i + 1}`,
      handle: `aiexpert${i + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=AI${i}`,
    },
    content: `Exploring new developments in artificial intelligence and machine learning. The possibilities are endless! #AI #Tech ${i + 1}`,
    timestamp: `${i + 30}m`,
    category: "AI"
  })),
  
  ...[...Array(24)].map((_, i) => ({
    id: `robotics-${i + 7}`,
    author: {
      name: `Robotics Engineer ${i + 1}`,
      handle: `robotics${i + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Robot${i}`,
    },
    content: `Building the next generation of robots for sustainable manufacturing. Amazing progress today! #Robotics #Engineering ${i + 1}`,
    timestamp: `${i + 60}m`,
    category: "Robotics"
  })),
  
  ...[...Array(23)].map((_, i) => ({
    id: `football-${i + 7}`,
    author: {
      name: `Football Analyst ${i + 1}`,
      handle: `football${i + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Football${i}`,
    },
    content: `Match analysis: The tactical breakdown of today's game shows some interesting patterns. #Football #Sports ${i + 1}`,
    timestamp: `${i + 90}m`,
    category: "Football"
  })),
  
  ...[...Array(23)].map((_, i) => ({
    id: `politics-${i + 7}`,
    author: {
      name: `Political Reporter ${i + 1}`,
      handle: `politics${i + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Politics${i}`,
    },
    content: `Breaking news from the capital: New legislation proposed that could change everything. #Politics #News ${i + 1}`,
    timestamp: `${i + 120}m`,
    category: "Politics"
  }))
];

const Index = () => {
  const [tweets, setTweets] = useState(MOCK_TWEETS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [likedTweets, setLikedTweets] = useState<typeof MOCK_TWEETS>([]);

  const handleSearch = (query: string) => {
    const filteredTweets = MOCK_TWEETS.filter(tweet => {
      const matchesSearch = tweet.content.toLowerCase().includes(query.toLowerCase()) ||
        tweet.author.name.toLowerCase().includes(query.toLowerCase()) ||
        tweet.author.handle.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || tweet.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    setTweets(filteredTweets);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setTweets(MOCK_TWEETS);
    } else {
      const filteredTweets = MOCK_TWEETS.filter(tweet => tweet.category === category);
      setTweets(filteredTweets);
    }
  };

  const handleLike = (tweet: typeof MOCK_TWEETS[0]) => {
    setLikedTweets(prev => [...prev, tweet]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Swipeable Tweets</h1>
          <p className="text-center text-twitter-text mb-4">Swipe left or right to navigate</p>
          <div className="flex justify-center space-x-4">
            <Link to="/likes">
              <Button variant="outline">View Liked Tweets</Button>
            </Link>
          </div>
        </header>
        
        <div className="max-w-xl mx-auto mb-8 flex gap-4">
          <SearchBar onSearch={handleSearch} />
          <Select onValueChange={handleCategoryChange} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="Robotics">Robotics</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
              <SelectItem value="Politics">Politics</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {tweets.length > 0 ? (
          <SwipeableContainer tweets={tweets} onLike={handleLike} />
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
