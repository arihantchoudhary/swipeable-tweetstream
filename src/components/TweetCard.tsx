
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface TweetCardProps {
  tweet: {
    id: string;
    author: {
      name: string;
      handle: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  };
  swipeAmount?: number;
}

export function TweetCard({ tweet, swipeAmount = 0 }: TweetCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Calculate opacity and rotation based on swipe amount
  const swipeOpacity = Math.min(Math.abs(swipeAmount) / 100, 1);
  const transform = `translateX(${swipeAmount}px) rotate(${swipeAmount / 20}deg)`;
  
  return (
    <Card 
      className={`w-full max-w-xl bg-white/90 backdrop-blur-sm border-twitter-border transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transform }}
    >
      <div className="p-6 relative">
        {/* Like indicator */}
        {swipeAmount > 0 && (
          <div 
            className="absolute top-4 right-4 text-green-500 flex items-center"
            style={{ opacity: swipeOpacity }}
          >
            <ThumbsUp className="w-8 h-8" />
          </div>
        )}
        
        {/* Dislike indicator */}
        {swipeAmount < 0 && (
          <div 
            className="absolute top-4 left-4 text-red-500 flex items-center"
            style={{ opacity: swipeOpacity }}
          >
            <ThumbsDown className="w-8 h-8" />
          </div>
        )}

        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12 rounded-full">
            <img src={tweet.author.avatar} alt={tweet.author.name} className="w-full h-full object-cover rounded-full" />
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <p className="text-base font-semibold text-gray-900">{tweet.author.name}</p>
              <span className="text-sm text-twitter-text">@{tweet.author.handle}</span>
              <span className="text-sm text-twitter-text">·</span>
              <span className="text-sm text-twitter-text">{tweet.timestamp}</span>
            </div>
            <p className="mt-2 text-gray-900 text-base leading-relaxed">{tweet.content}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
