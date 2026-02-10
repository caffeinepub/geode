import { useParams, Link } from '@tanstack/react-router';
import { useGetMod } from '../hooks/useQueries';
import SaveButton from '../components/mods/SaveButton';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';

export default function ModDetailsPage() {
  const { modId } = useParams({ from: '/mod/$modId' });
  const { data: mod, isLoading } = useGetMod(modId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!mod) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-primary mb-2">Mod Not Found</h2>
        <p className="text-muted-foreground mb-6">The mod you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-all shadow-glow-sm hover:shadow-glow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Explore
      </Link>

      <div className="bg-card border border-border rounded-lg p-8 arcade-border">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary mb-2 arcade-glow">{mod.name}</h1>
            <p className="text-lg text-muted-foreground">
              by {mod.author} • Version {mod.version}
            </p>
          </div>
          <SaveButton modId={mod.id} />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Description</h2>
            <p className="text-foreground/80 leading-relaxed">{mod.longDescription}</p>
          </div>

          {mod.tags.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {mod.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary border border-primary/30 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {mod.externalLinks && mod.externalLinks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">External Links</h2>
              <div className="space-y-2">
                {mod.externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
