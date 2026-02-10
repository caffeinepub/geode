import { AlertCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2 arcade-glow">About geode+</h1>
        <p className="text-lg text-muted-foreground">
          Your companion for discovering Geometry Dash mods
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 space-y-6 arcade-border">
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-3">What is geode+?</h2>
          <p className="text-foreground/80 leading-relaxed">
            geode+ is a web-based mod discovery and management platform for Geometry Dash enthusiasts. 
            Browse through a curated catalog of mods, read detailed descriptions, and save your favorites 
            to your personal library for easy access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-3">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>Browse a comprehensive catalog of Geometry Dash mods</li>
            <li>Search and filter mods by tags and keywords</li>
            <li>Save your favorite mods to a personal library</li>
            <li>View detailed information about each mod</li>
            <li>Secure authentication with Internet Identity</li>
          </ul>
        </section>

        <section className="bg-destructive/10 border border-destructive/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-destructive mb-2">Important Disclaimer</h2>
              <div className="space-y-2 text-foreground/80 text-sm">
                <p>
                  <strong>geode+ is an independent companion application</strong> and is not affiliated with, 
                  endorsed by, or connected to Geometry Dash, RobTop Games, or the official Geode mod loader project.
                </p>
                <p>
                  This application <strong>does not modify, patch, or inject code into Geometry Dash</strong>. 
                  It serves solely as a discovery and organizational tool for mod information. Any actual mod 
                  installation or game modification must be done through appropriate channels and tools.
                </p>
                <p>
                  All mod information displayed is for reference purposes only. Users are responsible for 
                  ensuring they comply with all applicable terms of service and usage policies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-3">Technology</h2>
          <p className="text-foreground/80 leading-relaxed">
            geode+ is built on the Internet Computer blockchain, providing secure, decentralized storage 
            for your mod library and preferences. Your data is protected by Internet Identity authentication, 
            ensuring privacy and security.
          </p>
        </section>
      </div>
    </div>
  );
}
