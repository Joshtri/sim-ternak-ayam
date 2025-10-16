import type { FunctionComponent } from "./common/types";
import type { TanstackRouter } from "./main";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/react";

import { ThemeProvider } from "./contexts/ThemeContext";
import InteractiveCursor from "./components/Cursor/InteractiveCursor";

// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

const queryClient = new QueryClient();

type AppProps = { router: TanstackRouter };

const App = ({ router }: AppProps): FunctionComponent => {
  return (
    <ThemeProvider>
      <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
          {/* <InteractiveCursor /> */}
          <RouterProvider router={router} />
          <ToastProvider maxVisibleToasts={3000} placement="top-right" />

          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
};

export default App;
