import { Link, useNavigate } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import LoginButton from '../auth/LoginButton';
import { useState } from 'react';

export default function AppHeader() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/generated/geodeplus-logo.dim_512x512.png"
                alt="geode+ logo"
                className="h-10 w-10 transition-transform group-hover:scale-110"
              />
              <span className="text-2xl font-bold text-primary arcade-glow">geode+</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary' }}
              >
                Explore
              </Link>
              <Link
                to="/library"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary' }}
              >
                My Library
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary' }}
              >
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <LoginButton />
            <button
              className="md:hidden p-2 text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                to="/library"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Library
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
