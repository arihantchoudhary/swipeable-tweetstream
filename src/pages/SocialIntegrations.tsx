
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin, Github, Youtube, Twitch } from "lucide-react";
import { toast } from "sonner";

interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  configured: boolean;
  credentials: {
    username?: string;
    password?: string;
    apiKey?: string;
    apiSecret?: string;
  };
}

const SocialIntegrations = () => {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>([
    { 
      id: "twitter", 
      name: "Twitter", 
      icon: <Twitter className="h-5 w-5" />, 
      configured: false,
      credentials: {}
    },
    { 
      id: "facebook", 
      name: "Facebook", 
      icon: <Facebook className="h-5 w-5" />, 
      configured: false,
      credentials: {}
    },
    { 
      id: "instagram", 
      name: "Instagram", 
      icon: <Instagram className="h-5 w-5" />, 
      configured: false,
      credentials: {}
    },
    { 
      id: "linkedin", 
      name: "LinkedIn", 
      icon: <Linkedin className="h-5 w-5" />, 
      configured: false,
      credentials: {}
    },
    { 
      id: "github", 
      name: "GitHub", 
      icon: <Github className="h-5 w-5" />, 
      configured: false,
      credentials: {}
    },
    { 
      id: "youtube", 
      name: "YouTube", 
      icon: <Youtube className="h-5 w-5" />, 
      configured: false,
      credentials: {}
    },
    { 
      id: "twitch", 
      name: "Twitch", 
      icon: <Twitch className="h-5 w-5" />, 
      configured: false,
      credentials: {}
    }
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState<SocialMediaPlatform | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const handleConfigureClick = (platform: SocialMediaPlatform) => {
    setSelectedPlatform(platform);
    setUsername(platform.credentials.username || "");
    setPassword(platform.credentials.password || "");
    setApiKey(platform.credentials.apiKey || "");
    setApiSecret(platform.credentials.apiSecret || "");
  };

  const handleSaveCredentials = () => {
    if (!selectedPlatform) return;
    
    const updatedPlatforms = platforms.map(platform => {
      if (platform.id === selectedPlatform.id) {
        return {
          ...platform,
          configured: true,
          credentials: {
            username,
            password,
            apiKey,
            apiSecret
          }
        };
      }
      return platform;
    });
    
    setPlatforms(updatedPlatforms);
    setSelectedPlatform(null);
    
    // In a real app, we would save these credentials securely
    // For now, we'll just show a success toast
    toast.success(`${selectedPlatform.name} configured successfully`);
    
    // Save to localStorage for this demo
    localStorage.setItem("socialPlatforms", JSON.stringify(updatedPlatforms));
  };

  const handleCancelConfiguration = () => {
    setSelectedPlatform(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Social Media Integrations</h1>
          <Button onClick={() => navigate("/swipe")}>
            Go to Feed
          </Button>
        </div>
        
        <p className="text-gray-600">
          Connect your social media accounts to view all your content in one place.
        </p>
        
        {selectedPlatform ? (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              {selectedPlatform.icon}
              <span className="ml-2">Configure {selectedPlatform.name}</span>
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder={`Your ${selectedPlatform.name} username`} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Your password" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">API Key (if applicable)</label>
                <Input 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                  placeholder="API Key" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">API Secret (if applicable)</label>
                <Input 
                  value={apiSecret} 
                  onChange={(e) => setApiSecret(e.target.value)} 
                  placeholder="API Secret" 
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button onClick={handleSaveCredentials}>
                  Save Configuration
                </Button>
                <Button variant="outline" onClick={handleCancelConfiguration}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {platforms.map((platform) => (
              <Card key={platform.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{platform.name}</h3>
                    <p className="text-sm text-gray-500">
                      {platform.configured ? "Configured" : "Not configured"}
                    </p>
                  </div>
                </div>
                
                <Button 
                  variant={platform.configured ? "outline" : "default"} 
                  onClick={() => handleConfigureClick(platform)}
                >
                  {platform.configured ? "Reconfigure" : "Configure"}
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialIntegrations;
