import { useState, useEffect } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useSaveCallerUserProfile } from '../../hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function ProfileSetupModal() {
  const { isAuthenticated, userProfile, profileLoading, isFetched } = useCurrentUser();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched && userProfile === null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isAuthenticated, profileLoading, isFetched, userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await saveProfile.mutateAsync({ name: name.trim() });
      setIsOpen(false);
      setName('');
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-glow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-primary mb-2 arcade-glow">Welcome to geode+</h2>
        <p className="text-muted-foreground mb-6">
          Before you start exploring mods, please tell us your name.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Display Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-background border border-input rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              required
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || saveProfile.isPending}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow-sm hover:shadow-glow-md flex items-center justify-center gap-2"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
