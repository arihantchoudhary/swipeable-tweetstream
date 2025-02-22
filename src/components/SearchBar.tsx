
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <Input
        type="search"
        placeholder="Search tweets..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-3 text-lg border border-twitter-border rounded-full bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-twitter-primary focus:border-transparent transition-all duration-300"
      />
    </div>
  );
}
