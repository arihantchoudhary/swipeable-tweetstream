
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  selected: boolean;
}

const CategorySelection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([
    { id: "tech", name: "Technology", selected: false },
    { id: "business", name: "Business", selected: false },
    { id: "politics", name: "Politics", selected: false },
    { id: "entertainment", name: "Entertainment", selected: false },
    { id: "sports", name: "Sports", selected: false },
    { id: "science", name: "Science", selected: false },
    { id: "health", name: "Health", selected: false },
    { id: "food", name: "Food", selected: false },
    { id: "travel", name: "Travel", selected: false },
    { id: "fashion", name: "Fashion", selected: false },
    { id: "music", name: "Music", selected: false },
    { id: "gaming", name: "Gaming", selected: false },
    { id: "education", name: "Education", selected: false },
    { id: "finance", name: "Finance", selected: false },
    { id: "art", name: "Art", selected: false },
    { id: "books", name: "Books", selected: false },
    { id: "movies", name: "Movies", selected: false },
    { id: "photography", name: "Photography", selected: false },
    { id: "design", name: "Design", selected: false },
    { id: "crypto", name: "Cryptocurrency", selected: false },
  ]);

  const [newCategory, setNewCategory] = useState("");

  // Load saved categories from localStorage on initial render
  useEffect(() => {
    const savedCategories = localStorage.getItem("userCategories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const toggleCategory = (id: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === id) {
        return { ...category, selected: !category.selected };
      }
      return category;
    });
    setCategories(updatedCategories);
    
    // Save to localStorage
    localStorage.setItem("userCategories", JSON.stringify(updatedCategories));
  };

  const addNewCategory = () => {
    if (!newCategory.trim()) return;
    
    // Generate a simple ID from the category name
    const categoryId = newCategory.toLowerCase().replace(/\s+/g, '-');
    
    // Check if the category already exists
    if (categories.some(c => c.id === categoryId)) {
      toast.error("This category already exists!");
      return;
    }
    
    const updatedCategories = [
      ...categories,
      { id: categoryId, name: newCategory, selected: true }
    ];
    
    setCategories(updatedCategories);
    setNewCategory("");
    
    // Save to localStorage
    localStorage.setItem("userCategories", JSON.stringify(updatedCategories));
    toast.success("Category added successfully!");
  };

  const handleSaveAndContinue = () => {
    const selectedCategories = categories.filter(category => category.selected);
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }
    
    toast.success("Your categories have been saved!");
    navigate("/swipe");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Choose Your Interests</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select categories you're interested in to help us customize your feed.
            We'll show you content based on your selections.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add a custom category..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button onClick={addNewCategory}>Add</Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`p-4 cursor-pointer transition-all ${
                category.selected 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "hover:bg-gray-100"
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{category.name}</span>
                {category.selected && <CheckCircle className="h-5 w-5" />}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center pt-8">
          <Button size="lg" onClick={handleSaveAndContinue}>
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
