import { ReactNode } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { LogIn } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated } = useCurrentUser();
  const { login } = useInternetIdentity();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-card border border-border rounded-lg p-8 max-w-md arcade-border">
          <LogIn className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2 arcade-glow">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            Please sign in to access your personal library and save mods.
          </p>
          <button
            onClick={login}
            className="px-6 py-3 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-all shadow-glow-sm hover:shadow-glow-md"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
