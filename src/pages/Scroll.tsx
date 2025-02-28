
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";
import { Twitter, Facebook, Instagram, ThumbsUp, Youtube, Twitch, Linkedin, Github, Filter } from "lucide-react";
import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  selected: boolean;
}

interface Post {
  id: string;
  content: string;
  platform: "twitter" | "facebook" | "instagram" | "youtube" | "twitch" | "linkedin" | "github";
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  timestamp: string;
  categories: string[];
  liked?: boolean;
}

const Scroll = () => {
  const navigate = useNavigate();
  const { isConnected } = useWeb3Auth();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Fetch posts and categories
  useEffect(() => {
    if (!isConnected) {
      navigate('/auth');
      return;
    }

    // Load categories from localStorage
    const savedCategories = localStorage.getItem("userCategories");
    if (savedCategories) {
      const parsedCategories = JSON.parse(savedCategories);
      setCategories(parsedCategories);
      // Set initially selected categories
      setSelectedCategories(parsedCategories.filter((c: Category) => c.selected).map((c: Category) => c.id));
    }

    // Generate mock posts with categories
    const generateMockPosts = () => {
      const platforms = ["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"];
      const defaultCategories = ["tech", "business", "entertainment", "sports", "politics"];
      const mockPosts: Post[] = [];

      for (let i = 0; i < 500; i++) {
        const platform = platforms[Math.floor(Math.random() * platforms.length)] as Post["platform"];
        const id = (i + 1).toString();
        
        // Assign 1-3 random categories to each post
        const postCategories: string[] = [];
        const numCategories = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numCategories; j++) {
          const category = defaultCategories[Math.floor(Math.random() * defaultCategories.length)];
          if (!postCategories.includes(category)) {
            postCategories.push(category);
          }
        }
        
        mockPosts.push({
          id,
          content: `${platform.charAt(0).toUpperCase() + platform.slice(1)} post #${id}: ${Math.random().toString(36).substring(7)}`,
          platform,
          author: {
            name: `User ${id}`,
            handle: `user${id}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
          },
          timestamp: `${Math.floor(Math.random() * 24)}h ago`,
          categories: postCategories,
          liked: false,
        });
      }

      return mockPosts;
    };

    setPosts(generateMockPosts());
  }, [isConnected, navigate]);

  const handlePlatformToggle = (values: string[]) => {
    setSelectedPlatforms(values.length ? values : ["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"]);
  };

  const toggleCategoryFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
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
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      case "twitch":
        return <Twitch className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "github":
        return <Github className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Filter posts by selected platforms and categories
  const filteredPosts = posts.filter(post => {
    const platformMatch = selectedPlatforms.includes(post.platform);
    const categoryMatch = selectedCategories.length === 0 || 
                         post.categories.some(category => selectedCategories.includes(category));
    return platformMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Scroll Feed</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleCategoryFilter}
            >
              <Filter className="h-4 w-4 mr-2" />
              Categories
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/swipe')}>
              Switch to Swipe View
            </Button>
          </div>
        </div>

        <div className="space-y-4">
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
              <ToggleGroupItem value="youtube" aria-label="Toggle Youtube">
                <Youtube className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="twitch" aria-label="Toggle Twitch">
                <Twitch className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="linkedin" aria-label="Toggle Linkedin">
                <Linkedin className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="github" aria-label="Toggle Github">
                <Github className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {showCategoryFilter && (
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <h3 className="font-medium mb-2">Filter by Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge 
                    key={category.id}
                    variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
                {categories.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No categories selected. <Button variant="link" onClick={() => navigate('/categories')}>Add some here</Button>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Showing {filteredPosts.length} posts</span>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => navigate('/integrations')}>
              Manage Accounts
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/categories')}>
              Manage Interests
            </Button>
          </div>
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
                    
                    {post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.categories.map(category => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
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
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No posts match your current filters.</p>
                <Button variant="link" onClick={() => {
                  setSelectedPlatforms(["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"]);
                  setSelectedCategories([]);
                }}>
                  Reset all filters
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Scroll;
