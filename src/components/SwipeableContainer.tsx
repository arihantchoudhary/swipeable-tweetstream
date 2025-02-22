
import { useEffect, useState } from "react";
import { TweetCard } from "./TweetCard";
import { toast } from "sonner";

interface SwipeableContainerProps {
  tweets: Array<{
    id: string;
    author: {
      name: string;
      handle: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  }>;
}

export function SwipeableContainer({ tweets }: SwipeableContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [swipeAmount, setSwipeAmount] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    const diff = touchStart - e.targetTouches[0].clientX;
    setSwipeAmount(-diff);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 100;
    const isRightSwipe = distance < -100;

    if (isLeftSwipe && currentIndex < tweets.length - 1) {
      setCurrentIndex(curr => curr + 1);
      toast.error("Tweet disliked!");
    }
    if (isRightSwipe && currentIndex < tweets.length - 1) {
      setCurrentIndex(curr => curr + 1);
      toast.success("Tweet liked!");
    }

    setTouchStart(0);
    setTouchEnd(0);
    setSwipeAmount(0);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      setCurrentIndex(curr => curr - 1);
    }
    if (e.key === "ArrowRight" && currentIndex < tweets.length - 1) {
      setCurrentIndex(curr => curr + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, tweets.length]);

  return (
    <div
      className="w-full h-[600px] flex items-center justify-center overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full max-w-xl">
        {tweets[currentIndex] && (
          <div className="animate-fade-in">
            <TweetCard tweet={tweets[currentIndex]} swipeAmount={swipeAmount} />
          </div>
        )}
        <div className="absolute bottom-[-60px] left-0 right-0 flex justify-center space-x-2">
          {tweets.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-twitter-primary w-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
