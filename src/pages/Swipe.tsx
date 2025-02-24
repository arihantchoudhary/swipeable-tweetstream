
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, Twitter, Facebook, Instagram } from "lucide-react";

interface Post {
  id: string;
  content: string;
  platform: "twitter" | "facebook" | "instagram";
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  timestamp: string;
}

const Swipe = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "facebook", "instagram"]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    checkAuth();
    // Mock data - in real implementation, this would fetch from social media APIs
    const mockPosts = [
      {
        id: "1",
        content: "Excited to share our latest AI research! #MachineLearning #Innovation",
        platform: "twitter",
        author: {
          name: "Tech Researcher",
          handle: "techresearcher",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        },
        timestamp: "2h ago",
      },
      {
        id: "2",
        content: "New breakthrough in social media aggregation technology! 🚀",
        platform: "facebook",
        author: {
          name: "Social Media Lab",
          handle: "sociallab",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
        },
        timestamp: "3h ago",
      },
      {
        id: "3",
        content: "Check out our new AI-powered interface! #Innovation",
        platform: "instagram",
        author: {
          name: "AI Developer",
          handle: "aidev",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
        },
        timestamp: "4h ago",
      },
    ] as Post[];

    setPosts(mockPosts);
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
    }
  };

  const filteredPosts = posts.filter(post => selectedPlatforms.includes(post.platform));

  const handlePlatformToggle = (values: string[]) => {
    setSelectedPlatforms(values.length ? values : ["twitter", "facebook", "instagram"]);
    setCurrentIndex(0);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // In a real app, save the like to the database
      console.log('Liked post:', filteredPosts[currentIndex]);
    }
    
    if (currentIndex < filteredPosts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Swipe Feed</h1>
          <Button variant="outline" onClick={() => navigate('/scroll')}>
            Switch to Scroll View
          </Button>
        </div>

        <div className="flex justify-center">
          <ToggleGroup type="multiple" value={selectedPlatforms} onValueChange={handlePlatformToggle}>
            <ToggleGroupItem value="twitter" aria-label="Toggle Twitter">
              <Twitter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="facebook" aria-label="Toggle Facebook">
              <Facebook className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="instagram" aria-label="Toggle Instagram">
              <Instagram className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="relative">
            <Card className="w-full max-w-xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <img 
                      src={filteredPosts[currentIndex].author.avatar} 
                      alt={filteredPosts[currentIndex].author.name} 
                      className="rounded-full"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">
                        {filteredPosts[currentIndex].author.name}
                      </span>
                      <span className="text-gray-500">
                        @{filteredPosts[currentIndex].author.handle}
                      </span>
                      {getPlatformIcon(filteredPosts[currentIndex].platform)}
                    </div>
                    <p className="mt-2 text-gray-800">
                      {filteredPosts[currentIndex].content}
                    </p>
                    <span className="text-sm text-gray-500 mt-2 block">
                      {filteredPosts[currentIndex].timestamp}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center mt-6 space-x-4">
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => handleSwipe('left')}
              >
                <ChevronLeft className="h-6 w-6" />
                Skip
              </Button>
              <Button 
                size="lg" 
                onClick={() => handleSwipe('right')}
              >
                Like
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No posts available for selected platforms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Swipe;
