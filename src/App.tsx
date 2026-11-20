import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, type RouteObject } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import CookieBannerErrorBoundary from '@/components/CookieBannerErrorBoundary';
import RootLayout from './layouts/RootLayout';
import Spinner from './components/Spinner';
import { routes } from './routes';

const CookieBanner = lazy(() =>
  import('@/components/CookieBanner').catch((error) => {
    console.warn('Failed to load CookieBanner:', error);
    return { default: () => null };
  })
);

const SpinnerFallback = () => (
  <div className="flex justify-center py-8 h-screen items-center">
    <Spinner />
  </div>
);

const rootElement = (
  <Suspense fallback={<SpinnerFallback />}>
    <RootLayout>
      <Outlet />
    </RootLayout>
  </Suspense>
);

// Keep shared site chrome and scroll restoration above every page.
const routeTree: RouteObject[] = [
  {
    element: rootElement,
    children: routes,
  },
];

const router = createBrowserRouter(routeTree);

const _virtualPageState = { lastPath: null as string | null };
router.subscribe((state) => {
  if (state.navigation.state !== 'idle') return;
  if (!window._allowCT) return;
  const { pathname } = state.location;
  if (pathname === _virtualPageState.lastPath) return;
  _virtualPageState.lastPath = pathname;
  window._signalsDataLayer = window._signalsDataLayer || [];
  window._signalsDataLayer.push({
    schema: 'add_virtual_page_view',
    version: 'v1',
    data: { virtualPath: pathname },
  });
});

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/*
        CookieBanner reads document.cookie and subscribes to browser events.
        App.tsx is client-only (entry-server.tsx renders the route tree
        directly without importing App), so no SSR gate is needed here.
      */}
      <CookieBannerErrorBoundary>
        <Suspense fallback={null}>
          <CookieBanner />
        </Suspense>
      </CookieBannerErrorBoundary>
    </>
  );
}
