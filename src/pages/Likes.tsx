
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Likes = () => {
  const [likedTweets, setLikedTweets] = useState<any[]>([]);

  // For demo purposes, let's add some sample tweets
  useEffect(() => {
    const sampleTweets = [
      {
        id: 1,
        content: "Just launched our new AI-powered social media aggregator! #Tech #Innovation",
        author: {
          name: "Tech Innovator",
          handle: "techinnovator",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        },
        timestamp: "2h ago"
      },
      {
        id: 2,
        content: "The future of social media is unified and personalized! Check out our latest research paper.",
        author: {
          name: "Research Lab",
          handle: "researchlab",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
        },
        timestamp: "4h ago"
      }
    ];
    setLikedTweets(sampleTweets);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Demo Feed</h1>
            <Link to="/auth">
              <Button>Sign Up for Full Access</Button>
            </Link>
          </div>
        </header>

        <ScrollArea className="h-[600px] w-full max-w-xl mx-auto rounded-lg border p-4">
          <div className="space-y-4">
            {likedTweets.map((tweet) => (
              <Card key={tweet.id} className="p-4">
                <div className="flex space-x-4">
                  <Avatar className="w-12 h-12">
                    <img src={tweet.author.avatar} alt={tweet.author.name} className="rounded-full" />
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{tweet.author.name}</span>
                      <span className="text-gray-500">@{tweet.author.handle}</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500">{tweet.timestamp}</span>
                    </div>
                    <p className="mt-2">{tweet.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Likes;
