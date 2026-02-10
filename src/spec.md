# Specification

## Summary
**Goal:** Build “geode+”, a Geode-like mod discovery and library web app for Geometry Dash, focused on browsing mod metadata and saving favorites (without modifying the game client).

**Planned changes:**
- Implement backend (single Motoko actor) data models and APIs for a public mod catalog (list + details by id/slug) and per-user saved library entries.
- Seed the backend with a curated set of at least 8 sample mods (varied tags/descriptions) so the catalog is non-empty on fresh deploy.
- Add Internet Identity authentication for sign-in/sign-out and private, persistent “My Library” per user.
- Build frontend pages: Explore/Home (mod list with search + tag filtering), Mod Details (full fields + save/unsave), My Library (saved mods), and About/Disclaimer (independent companion app, not affiliated).
- Apply a consistent “arcade terminal” theme (dark charcoal base with lime/green accents) across navigation, cards, buttons, and inputs.
- Add and display generated static assets (logo + hero/banner) from `frontend/public/assets/generated` in the header and Explore/Home page.

**User-visible outcome:** Users can browse and search/filter a mod catalog, open mod detail pages, sign in with Internet Identity to save/unsave mods to a private “My Library,” and view an About/Disclaimer page; the app presents a distinct geode+ theme with a visible logo and hero banner.
