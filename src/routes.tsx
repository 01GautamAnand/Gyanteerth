import { RouteObject } from 'react-router';
import HomePage from './pages/index';
import AboutPage from './pages/about';
import VisionMissionPage from './pages/vision-mission';
import GovernancePage from './pages/governance';
import OrgStructurePage from './pages/org-structure';
import InitiativesPage from './pages/initiatives';
import NetworkPage from './pages/network';
import MembershipPage from './pages/membership';
import NewsPage from './pages/news';
import ContactPage from './pages/contact';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/vision-mission',
    element: <VisionMissionPage />,
  },
  {
    path: '/governance',
    element: <GovernancePage />,
  },
  {
    path: '/org-structure',
    element: <OrgStructurePage />,
  },
  {
    path: '/initiatives',
    element: <InitiativesPage />,
  },
  {
    path: '/network',
    element: <NetworkPage />,
  },
  {
    path: '/membership',
    element: <MembershipPage />,
  },
  {
    path: '/news',
    element: <NewsPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    id: 'airo-not-found',
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/about' | '/vision-mission' | '/governance' | '/org-structure' | '/initiatives' | '/network' | '/membership' | '/news' | '/contact';

export type Params = Record<string, string | undefined>;
