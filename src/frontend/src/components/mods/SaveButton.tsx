import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useGetMyLibrary, useAddToLibrary, useRemoveFromLibrary } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface SaveButtonProps {
  modId: string;
}

export default function SaveButton({ modId }: SaveButtonProps) {
  const { isAuthenticated } = useCurrentUser();
  const { login } = useInternetIdentity();
  const { data: library = [] } = useGetMyLibrary();
  const addToLibrary = useAddToLibrary();
  const removeFromLibrary = useRemoveFromLibrary();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const isSaved = library.some((mod) => mod.id === modId);
  const isLoading = addToLibrary.isPending || removeFromLibrary.isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    try {
      if (isSaved) {
        await removeFromLibrary.mutateAsync(modId);
      } else {
        await addToLibrary.mutateAsync(modId);
      }
    } catch (error) {
      console.error('Failed to update library:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          p-2 rounded transition-all
          ${
            isSaved
              ? 'bg-primary/20 text-primary hover:bg-primary/30'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        title={isSaved ? 'Remove from library' : 'Add to library'}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isSaved ? (
          <BookmarkCheck className="h-5 w-5" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </button>

      {showLoginPrompt && !isAuthenticated && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-primary rounded-lg p-3 shadow-glow-md z-10">
          <p className="text-xs text-foreground mb-2">Sign in to save mods to your library</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              login();
            }}
            className="w-full px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
