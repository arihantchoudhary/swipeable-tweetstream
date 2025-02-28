
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";
import { Twitter, Facebook, Instagram, ThumbsUp, Youtube, Twitch, Linkedin, Github, Filter, Search, MessageSquare, Share2, User } from "lucide-react";
import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { Badge } from "@/components/ui/badge";
import deedyPosts, { DeedyPost } from "@/data/deedyPosts";
import { Input } from "@/components/ui/input";

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
  category?: string;
  liked?: boolean;
  imageUrl?: string;
  comments?: number;
  shares?: number;
  likes?: number;
}

const CATEGORIES = [
  "immigration",
  "ai",
  "tech",
  "india",
  "cricket",
  "fitness",
  "search"
];

const Scroll = () => {
  const navigate = useNavigate();
  const { isConnected } = useWeb3Auth();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    } else {
      // Create categories from CATEGORIES array if none exist
      setCategories(CATEGORIES.map(cat => ({
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        selected: false
      })));
    }

    // Generate mock posts with categories
    const generateMockPosts = () => {
      const platforms = ["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"];
      const mockPosts: Post[] = [];

      // First add Deedy's posts
      deedyPosts.forEach(post => {
        mockPosts.push({
          id: post.id,
          content: post.content,
          platform: post.platform,
          author: post.author,
          timestamp: post.timestamp,
          category: post.category,
          imageUrl: post.imageUrl,
          likes: post.likes,
          comments: post.comments,
          shares: post.shares,
          liked: false
        });
      });

      // Then add random posts
      for (let i = 0; i < 400; i++) {
        const platform = platforms[Math.floor(Math.random() * platforms.length)] as Post["platform"];
        const id = `random-${i + 1}`;
        const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        
        mockPosts.push({
          id,
          content: `${platform.charAt(0).toUpperCase() + platform.slice(1)} post #${id}: ${Math.random().toString(36).substring(7)}`,
          platform,
          author: {
            name: `User ${i + 1}`,
            handle: `user${i + 1}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`,
          },
          timestamp: `${Math.floor(Math.random() * 24)}h ago`,
          category: randomCategory,
          liked: false,
          likes: Math.floor(Math.random() * 100),
          comments: Math.floor(Math.random() * 20)
        });
      }

      return mockPosts;
    };

    setPosts(generateMockPosts());
  }, [isConnected, navigate]);

  const handlePlatformToggle = (values: string[]) => {
    setSelectedPlatforms(values.length ? values : ["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"]);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  const toggleAuthor = (author: string) => {
    if (selectedAuthors.includes(author)) {
      setSelectedAuthors(selectedAuthors.filter(a => a !== author));
    } else {
      setSelectedAuthors([...selectedAuthors, author]);
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

  // Filter posts by selected platforms, categories, authors, and search query
  const filteredPosts = posts.filter(post => {
    const platformMatch = selectedPlatforms.includes(post.platform);
    const categoryMatch = selectedCategories.length === 0 || (post.category && selectedCategories.includes(post.category));
    const authorMatch = selectedAuthors.length === 0 || selectedAuthors.includes(post.author.name);
    const searchMatch = !searchQuery || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return platformMatch && categoryMatch && authorMatch && searchMatch;
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
              onClick={toggleFilters}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/swipe')}>
              Swipe View
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/source')}>
              Source View
            </Button>
          </div>
        </div>

        <div className="relative">
          <Input
            placeholder="Search posts, categories, or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 p-1"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </Button>
          )}
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

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow mb-4 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Filter by Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(category => (
                    <Badge 
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Filter by Authors</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={selectedAuthors.includes("Deedy") ? "default" : "outline"}
                    className="cursor-pointer flex items-center gap-1"
                    onClick={() => toggleAuthor("Deedy")}
                  >
                    <User className="h-3 w-3" />
                    Deedy
                  </Badge>
                </div>
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
                      
                      {post.category && (
                        <Badge variant="outline" className="ml-auto">
                          {post.category}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="mt-2 text-gray-800">{post.content}</p>
                    
                    {post.imageUrl && (
                      <div className="mt-3">
                        <img 
                          src={post.imageUrl} 
                          alt="" 
                          className="rounded-lg w-full object-cover max-h-96"
                        />
                      </div>
                    )}
                    
                    {post.author.name === "Deedy" && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 mt-2"
                        onClick={() => navigate('/source')}
                      >
                        View all posts from Deedy
                      </Button>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                      <div className="flex space-x-3">
                        <Button
                          variant={post.liked ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleLike(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {post.liked ? "Liked" : "Like"} {post.likes && `(${post.likes})`}
                        </Button>
                        
                        {post.comments && (
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm text-gray-500">{post.comments}</span>
                          </div>
                        )}
                        
                        {post.shares && (
                          <div className="flex items-center">
                            <Share2 className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm text-gray-500">{post.shares}</span>
                          </div>
                        )}
                      </div>
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
                  setSelectedAuthors([]);
                  setSearchQuery("");
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
