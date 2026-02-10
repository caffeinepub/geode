import { Link } from '@tanstack/react-router';
import type { Mod } from '../../backend';
import SaveButton from './SaveButton';

interface ModCardProps {
  mod: Mod;
}

export default function ModCard({ mod }: ModCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-all arcade-border group">
      <div className="flex items-start justify-between gap-4 mb-3">
        <Link
          to="/mod/$modId"
          params={{ modId: mod.id }}
          className="flex-1 min-w-0"
        >
          <h3 className="text-lg font-bold text-primary group-hover:arcade-glow transition-all">
            {mod.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            by {mod.author} • v{mod.version}
          </p>
        </Link>
        <SaveButton modId={mod.id} />
      </div>

      <p className="text-sm text-foreground/80 mb-3 line-clamp-2">
        {mod.shortDescription}
      </p>

      <div className="flex flex-wrap gap-2">
        {mod.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/30 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
