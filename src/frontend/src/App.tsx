import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import AppLayout from './components/layout/AppLayout';
import ExplorePage from './pages/ExplorePage';
import ModDetailsPage from './pages/ModDetailsPage';
import MyLibraryPage from './pages/MyLibraryPage';
import AboutPage from './pages/AboutPage';
import ProfileSetupModal from './components/auth/ProfileSetupModal';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <ProfileSetupModal />
      <Outlet />
    </AppLayout>
  )
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ExplorePage
});

const modDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mod/$modId',
  component: ModDetailsPage
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: MyLibraryPage
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  modDetailsRoute,
  libraryRoute,
  aboutRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
