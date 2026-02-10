import { useState, useMemo } from 'react';
import { useGetAllMods } from '../hooks/useQueries';
import ModCard from '../components/mods/ModCard';
import { Search, Loader2 } from 'lucide-react';

export default function ExplorePage() {
  const { data: mods = [], isLoading } = useGetAllMods();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    mods.forEach((mod) => mod.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [mods]);

  const filteredMods = useMemo(() => {
    return mods.filter((mod) => {
      const matchesSearch =
        !searchQuery ||
        mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = !selectedTag || mod.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [mods, searchQuery, selectedTag]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden arcade-border">
        <img
          src="/assets/generated/geodeplus-hero.dim_1600x900.png"
          alt="geode+ hero"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end">
          <div className="p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 arcade-glow">
              Discover Mods
            </h1>
            <p className="text-lg text-foreground/80">
              Browse and save your favorite Geometry Dash mods
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search mods by name, author, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
                selectedTag === null
                  ? 'bg-primary text-primary-foreground shadow-glow-sm'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
                  selectedTag === tag
                    ? 'bg-primary text-primary-foreground shadow-glow-sm'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mods Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredMods.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            {searchQuery || selectedTag ? 'No mods found matching your filters.' : 'No mods available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMods.map((mod) => (
            <ModCard key={mod.id} mod={mod} />
          ))}
        </div>
      )}
    </div>
  );
}
