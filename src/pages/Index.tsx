
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Discover Tweets Like Never Before
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience a revolutionary way to browse tweets. Swipe through curated content
          and save your favorites with our intuitive interface.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/auth">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
          </Link>
          <Link to="/likes">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Try Demo
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-white shadow-md">
            <h3 className="text-xl font-semibold mb-4">Intuitive Swiping</h3>
            <p className="text-gray-600">
              Swipe right to like, left to skip. It's that simple and engaging.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow-md">
            <h3 className="text-xl font-semibold mb-4">Smart Filtering</h3>
            <p className="text-gray-600">
              Customize your feed with powerful category and search filters.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow-md">
            <h3 className="text-xl font-semibold mb-4">Save Favorites</h3>
            <p className="text-gray-600">
              Keep track of tweets you love in your personal collection.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Swiping?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of users who have transformed how they browse tweets.
        </p>
        <Link to="/auth">
          <Button size="lg" className="text-lg px-8">
            Sign Up Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
