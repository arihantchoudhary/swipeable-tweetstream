
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Likes = () => {
  const [likedTweets, setLikedTweets] = useState<any[]>([]);

  // In a real app, this would fetch from a backend
  // For now, we'll use localStorage
  useEffect(() => {
    const savedTweets = localStorage.getItem('likedTweets');
    if (savedTweets) {
      setLikedTweets(JSON.parse(savedTweets));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Liked Tweets</h1>
            <Link to="/">
              <Button variant="outline">Back to Swipe</Button>
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
                      <span className="text-twitter-text">@{tweet.author.handle}</span>
                      <span className="text-twitter-text">·</span>
                      <span className="text-twitter-text">{tweet.timestamp}</span>
                    </div>
                    <p className="mt-2">{tweet.content}</p>
                  </div>
                </div>
              </Card>
            ))}

            {likedTweets.length === 0 && (
              <div className="text-center text-twitter-text py-8">
                No liked tweets yet. Start swiping to like some tweets!
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Likes;
