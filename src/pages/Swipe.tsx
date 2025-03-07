
import { useState, useEffect, TouchEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Twitter, Facebook, Instagram, Youtube, Twitch, Linkedin, Github, User } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import deedyPosts, { DeedyPost } from "@/data/deedyPosts";

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
  imageUrl?: string;
}

const PLATFORMS = [
  { id: "twitter", icon: Twitter },
  { id: "facebook", icon: Facebook },
  { id: "instagram", icon: Instagram },
  { id: "youtube", icon: Youtube },
  { id: "twitch", icon: Twitch },
  { id: "linkedin", icon: Linkedin },
  { id: "github", icon: Github }
];

const CATEGORIES = [
  "immigration",
  "ai",
  "tech",
  "india",
  "cricket",
  "fitness",
  "search"
];

const generateMockPosts = (): Post[] => {
  const platforms = ["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"];
  const posts: Post[] = [];

  // First add Deedy's posts
  deedyPosts.forEach(post => {
    posts.push({
      id: post.id,
      content: post.content,
      platform: post.platform,
      author: post.author,
      timestamp: post.timestamp,
      category: post.category,
      imageUrl: post.imageUrl
    });
  });

  // Then add random posts
  for (let i = 0; i < 400; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)] as Post["platform"];
    const id = `random-${i + 1}`;
    const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    
    posts.push({
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
    });
  }

  return posts;
};

const Swipe = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [swipeAnimation, setSwipeAnimation] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setPosts(generateMockPosts());
  }, []);

  const filteredPosts = posts.filter(post => {
    const platformMatch = selectedPlatforms.includes(post.platform);
    const categoryMatch = selectedCategories.length === 0 || (post.category && selectedCategories.includes(post.category));
    const authorMatch = selectedAuthors.length === 0 || selectedAuthors.includes(post.author.name);
    return platformMatch && categoryMatch && authorMatch;
  });

  const handlePlatformToggle = (values: string[]) => {
    setSelectedPlatforms(values.length ? values : ["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"]);
    setCurrentIndex(0);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setCurrentIndex(0);
  };

  const handleAuthorToggle = (author: string) => {
    setSelectedAuthors(prev => {
      if (prev.includes(author)) {
        return prev.filter(a => a !== author);
      } else {
        return [...prev, author];
      }
    });
    setCurrentIndex(0);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeAnimation(direction === 'left' ? 'slide-left' : 'slide-right');
    
    setTimeout(() => {
      if (direction === 'right') {
        toast.success("Post liked!");
        console.log('Liked post:', filteredPosts[currentIndex]);
      } else {
        toast.info("Post skipped");
      }
      
      if (currentIndex < filteredPosts.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
      
      setSwipeAnimation("");
    }, 200);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSwipe('left');
    }
    if (isRightSwipe) {
      handleSwipe('right');
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getPlatformIcon = (platform: string) => {
    const platformObj = PLATFORMS.find(p => p.id === platform);
    if (!platformObj) return null;
    const Icon = platformObj.icon;
    return <Icon className="h-4 w-4" />;
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Swipe Feed</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={toggleFilters}>
              Filters
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/scroll')}>
              Scroll View
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/source')}>
              Source View
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="space-y-4 bg-white p-4 rounded-lg shadow">
            <div>
              <h3 className="font-medium mb-2">Platforms</h3>
              <ToggleGroup type="multiple" value={selectedPlatforms} onValueChange={handlePlatformToggle} className="flex flex-wrap gap-2">
                {PLATFORMS.map(platform => (
                  <ToggleGroupItem key={platform.id} value={platform.id} aria-label={`Toggle ${platform.id}`}>
                    {platform.icon && <platform.icon className="h-4 w-4" />}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => (
                  <Badge 
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Authors</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedAuthors.includes("Deedy") ? "default" : "outline"}
                  className="cursor-pointer flex items-center gap-1"
                  onClick={() => handleAuthorToggle("Deedy")}
                >
                  <User className="h-3 w-3" />
                  Deedy
                </Badge>
              </div>
            </div>
          </div>
        )}

        {filteredPosts.length > 0 ? (
          <div className="relative">
            <Card 
              className={`w-full max-w-xl mx-auto transform transition-transform ${swipeAnimation ? `animate-${swipeAnimation}` : ''}`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
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
                      
                      {filteredPosts[currentIndex].category && (
                        <Badge variant="outline" className="ml-auto">
                          {filteredPosts[currentIndex].category}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-gray-800">
                      {filteredPosts[currentIndex].content}
                    </p>
                    
                    {filteredPosts[currentIndex].imageUrl && (
                      <div className="mt-3">
                        <img 
                          src={filteredPosts[currentIndex].imageUrl} 
                          alt="" 
                          className="rounded-lg w-full object-cover max-h-80"
                        />
                      </div>
                    )}
                    
                    <span className="text-sm text-gray-500 mt-2 block">
                      {filteredPosts[currentIndex].timestamp}
                    </span>
                    
                    {filteredPosts[currentIndex].author.name === "Deedy" && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 mt-2"
                        onClick={() => navigate('/source')}
                      >
                        View all posts from Deedy
                      </Button>
                    )}
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
            <p>No posts available for selected filters.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSelectedPlatforms(["twitter", "facebook", "instagram", "youtube", "twitch", "linkedin", "github"]);
                setSelectedCategories([]);
                setSelectedAuthors([]);
              }}
            >
              Reset all filters
            </Button>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes slide-left {
            0% { transform: translateX(0) rotate(0); }
            100% { transform: translateX(-150%) rotate(-30deg); }
          }
          @keyframes slide-right {
            0% { transform: translateX(0) rotate(0); }
            100% { transform: translateX(150%) rotate(30deg); }
          }
          .animate-slide-left {
            animation: slide-left 0.2s ease-out forwards;
          }
          .animate-slide-right {
            animation: slide-right 0.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Swipe;
