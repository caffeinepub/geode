import { useGetMyLibrary } from '../hooks/useQueries';
import ModCard from '../components/mods/ModCard';
import RequireAuth from '../components/auth/RequireAuth';
import { Loader2, BookmarkX } from 'lucide-react';

export default function MyLibraryPage() {
  return (
    <RequireAuth>
      <MyLibraryContent />
    </RequireAuth>
  );
}

function MyLibraryContent() {
  const { data: library = [], isLoading } = useGetMyLibrary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2 arcade-glow">My Library</h1>
        <p className="text-muted-foreground">
          Your saved mods collection ({library.length} {library.length === 1 ? 'mod' : 'mods'})
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : library.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md arcade-border">
            <BookmarkX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">No Saved Mods</h2>
            <p className="text-muted-foreground">
              Start exploring and save your favorite mods to build your collection.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {library.map((mod) => (
            <ModCard key={mod.id} mod={mod} />
          ))}
        </div>
      )}
    </div>
  );
}
