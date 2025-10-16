import { createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { routeTree } from "./routeTree.gen.ts";
// import "./styles/tailwind.css";
import "./styles/globals.css";
// import "./common/i18n";

const router = createRouter({ routeTree });

export type TanstackRouter = typeof router;

declare module "@tanstack/react-router" {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: TanstackRouter;
  }
}

const rootElement = document.querySelector("#root") as Element;

// Apply saved theme preference on startup so dark mode applies immediately
try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    // Default to light mode if no preference saved
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
} catch {
  // ignore
}

// Apply saved cursor preference on startup so the chicken cursor appears
// immediately even if the toggle component hasn't mounted yet.
try {
  const pref = localStorage.getItem("cursorChicken");

  if (pref === "1") {
    document.documentElement.classList.add("cursor-chicken");
  }
} catch {
  // ignore
}

// Apply saved auth token (if present) to axios defaults so requests include
// the Authorization header on first load. This supports Bearer-token style
// authentication when the backend returns a token at login.
try {
  const token = localStorage.getItem("authToken");

  if (token) {
    // Importing the api instance dynamically to avoid circular import at top
    // level. Doing this sync here is fine since main.tsx runs once.

    const api = require("./lib/axios").default;

    api.defaults.headers.common = api.defaults.headers.common || {};
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
} catch {
  // ignore
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <React.Suspense fallback="loading">
        <App router={router} />
      </React.Suspense>
    </React.StrictMode>
  );
}
