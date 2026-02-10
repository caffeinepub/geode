import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, LogIn, LogOut } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={isLoggingIn}
      className={`
        px-4 py-2 rounded text-sm font-medium transition-all
        flex items-center gap-2
        ${
          isAuthenticated
            ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-sm hover:shadow-glow-md'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {isLoggingIn ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Logging in...</span>
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </>
      )}
    </button>
  );
}
