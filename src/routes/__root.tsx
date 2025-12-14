import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorBoundary,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </>
  );
}

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-red-800">
          Oops! Terjadi Kesalahan
        </h2>
        <p className="mb-4 text-red-700">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba refresh
          halaman atau hubungi administrator.
        </p>
        {import.meta.env.DEV && (
          <details className="mt-4 rounded bg-white p-4">
            <summary className="cursor-pointer font-semibold text-red-800">
              Detail Error (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-red-600">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        <button
          className="mt-4 w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Refresh Halaman
        </button>
      </div>
    </div>
  );
}
