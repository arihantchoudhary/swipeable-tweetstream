
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Twitter, Facebook, Instagram, ThumbsUp } from "lucide-react";

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
  liked?: boolean;
}

const Scroll = () => {
  const navigate = useNavigate();
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
        liked: false,
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
        liked: false,
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
        liked: false,
      },
    ];

    setPosts(mockPosts);
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
    }
  };

  const handlePlatformToggle = (values: string[]) => {
    setSelectedPlatforms(values.length ? values : ["twitter", "facebook", "instagram"]);
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, liked: !post.liked } : post
    ));
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

  const filteredPosts = posts.filter(post => selectedPlatforms.includes(post.platform));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Scroll Feed</h1>
          <Button variant="outline" onClick={() => navigate('/swipe')}>
            Switch to Swipe View
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

        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="rounded-full"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{post.author.name}</span>
                      <span className="text-gray-500">@{post.author.handle}</span>
                      {getPlatformIcon(post.platform)}
                    </div>
                    <p className="mt-2 text-gray-800">{post.content}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                      <Button
                        variant={post.liked ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleLike(post.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {post.liked ? "Liked" : "Like"}
                      </Button>
                    </div>
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

export default Scroll;
