
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, MessageSquare, Twitter, Facebook, Instagram, Github, Linkedin, ThumbsUp, Share2, ExternalLink } from "lucide-react";
import deedyPosts, { DeedyPost } from "@/data/deedyPosts";

const Source = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [consolidatedPosts, setConsolidatedPosts] = useState<Record<string, DeedyPost[]>>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(deedyPosts.map(post => post.category)));
    setCategories(uniqueCategories);

    // Group posts by category
    const groupedPosts: Record<string, DeedyPost[]> = {};
    uniqueCategories.forEach(category => {
      groupedPosts[category] = deedyPosts.filter(post => post.category === category);
    });
    
    setConsolidatedPosts(groupedPosts);
  }, []);

  const filteredPosts = selectedCategory === "all" 
    ? deedyPosts 
    : deedyPosts.filter(post => post.category === selectedCategory);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getConsolidatedContent = (category: string) => {
    if (!consolidatedPosts[category]) return null;
    
    const posts = consolidatedPosts[category];
    const twitterPost = posts.find(p => p.platform === "twitter");
    const linkedinPost = posts.find(p => p.platform === "linkedin");
    const facebookPost = posts.find(p => p.platform === "facebook");
    const instagramPost = posts.find(p => p.platform === "instagram");
    const githubPost = posts.find(p => p.platform === "github");
    
    // Use the LinkedIn post as the base for consolidated content (usually most detailed)
    return linkedinPost ? linkedinPost.content : twitterPost?.content;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "github":
        return <Github className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Source View</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={toggleFilters}>
              <Filter className="h-4 w-4 mr-2" /> 
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/scroll')}>
              Switch to Scroll
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/swipe')}>
              Switch to Swipe
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-2">Filter by Category</h2>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === "all" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Badge>
              {categories.map(category => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <img src="/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png" alt="Deedy" className="rounded-full" />
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Deedy</h2>
            <p className="text-gray-600">Tech enthusiast, builder, fitness buff</p>
            <div className="flex space-x-2 mt-2">
              <Twitter className="h-5 w-5 text-gray-600" />
              <Linkedin className="h-5 w-5 text-gray-600" />
              <Github className="h-5 w-5 text-gray-600" />
              <Facebook className="h-5 w-5 text-gray-600" />
              <Instagram className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="consolidated" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="consolidated" className="flex-1">Consolidated View</TabsTrigger>
            <TabsTrigger value="all-posts" className="flex-1">All Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="consolidated">
            <ScrollArea className="h-[600px]">
              <div className="space-y-6">
                {Object.keys(consolidatedPosts)
                  .filter(category => selectedCategory === "all" || category === selectedCategory)
                  .map(category => (
                    <Card key={category} className="overflow-hidden">
                      <div className="bg-primary text-white p-4">
                        <h3 className="font-semibold">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h3>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-gray-800 mb-4">{getConsolidatedContent(category)}</p>
                        
                        {/* Images */}
                        {consolidatedPosts[category]
                          .filter(post => post.imageUrl)
                          .slice(0, 2)
                          .map((post, idx) => (
                            <div key={idx} className="mt-4">
                              <img 
                                src={post.imageUrl} 
                                alt={`${category} post`} 
                                className="rounded-lg w-full object-cover mb-2 max-h-64"
                              />
                            </div>
                          ))}
                        
                        {/* Code snippet if available */}
                        {consolidatedPosts[category].find(post => post.code) && (
                          <div className="mt-4 bg-gray-100 p-4 rounded-md overflow-x-auto">
                            <pre className="text-sm">
                              <code>{consolidatedPosts[category].find(post => post.code)?.code}</code>
                            </pre>
                          </div>
                        )}
                        
                        {/* Platform badges */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <p className="text-sm text-gray-500 mr-2">Posted on:</p>
                          {Array.from(new Set(consolidatedPosts[category].map(post => post.platform))).map(platform => (
                            <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                              {getPlatformIcon(platform)}
                              <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Engagement metrics */}
                        <div className="flex items-center space-x-4 mt-4 text-gray-500 text-sm">
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{consolidatedPosts[category].reduce((sum, post) => sum + (post.likes || 0), 0)} Likes</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{consolidatedPosts[category].reduce((sum, post) => sum + (post.comments || 0), 0)} Comments</span>
                          </div>
                          <div className="flex items-center">
                            <Share2 className="h-4 w-4 mr-1" />
                            <span>{consolidatedPosts[category].reduce((sum, post) => sum + (post.shares || 0), 0)} Shares</span>
                          </div>
                        </div>
                        
                        <Button variant="link" size="sm" className="mt-2 p-0">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          See all posts in this category
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="all-posts">
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {filteredPosts.map(post => (
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
                          <Badge variant="outline" className="ml-auto">
                            {post.category}
                          </Badge>
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
                        
                        {post.code && (
                          <div className="mt-3 bg-gray-100 p-3 rounded-md overflow-x-auto">
                            <pre className="text-sm">
                              <code>{post.code}</code>
                            </pre>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm text-gray-500">{post.timestamp}</span>
                          <div className="flex space-x-3">
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm text-gray-500">{post.likes || 0}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-sm text-gray-500">{post.comments || 0}</span>
                            </div>
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
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Source;
