import { useEffect, useRef, useState } from "react";

const CURSOR_ID = "__custom_chicken_cursor";

function createCursorElement(svgDataUrl: string) {
  const el = document.createElement("div");

  el.id = CURSOR_ID;
  el.className = "custom-cursor";
  el.style.backgroundImage = `url('${svgDataUrl}')`;
  document.body.appendChild(el);

  return el;
}

function removeCursorElement() {
  const existing = document.getElementById(CURSOR_ID);

  if (existing) existing.remove();
}

export default function CursorToggle() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem("cursorChicken") === "1";
    } catch {
      return false;
    }
  });

  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // The SVG data URI from CSS root variable (same content used there).
    // Hardcode the SVG data here to ensure the JS cursor matches the CSS fallback.
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><path fill='%23706d67' fill-rule='evenodd' d='M8.003,25.003v-24h2v2h2%20v2h2v2h2v2h2v2h2v2h2v2h2v2h-6v2h2v4h2v4h-2v2h-4v-2h-2v-4h-2v-4h-2v2h-2v2H8.003z' clip-rule='evenodd'/><path fill='%23e6e5e5' fill-rule='evenodd' d='M10.003,21.003v-16h2v2%20h2v2h2v2h2v2h2v2h2v2h-4v4h2v4h2v4h-4v-4h-2v-4h-2v-2h-2v2H10.003z' clip-rule='evenodd'/></svg>`;
    const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

    function onMouseMove(e: MouseEvent) {
      const el = cursorRef.current || document.getElementById(CURSOR_ID);

      if (!el) return;

      const target = el as HTMLDivElement;

      target.style.left = `${e.clientX}px`;
      target.style.top = `${e.clientY}px`;
    }

    function enableCursor() {
      // create element if missing
      if (!document.getElementById(CURSOR_ID)) {
        cursorRef.current = createCursorElement(svgDataUrl) as any;
      } else {
        cursorRef.current = document.getElementById(
          CURSOR_ID
        ) as HTMLDivElement;
      }
      document.documentElement.classList.add("hide-native-cursor");
      window.addEventListener("mousemove", onMouseMove);
    }

    function disableCursor() {
      removeCursorElement();
      cursorRef.current = null;
      document.documentElement.classList.remove("hide-native-cursor");
      window.removeEventListener("mousemove", onMouseMove);
    }

    if (enabled) {
      enableCursor();
      try {
        localStorage.setItem("cursorChicken", "1");
      } catch {}
    } else {
      disableCursor();
      try {
        localStorage.removeItem("cursorChicken");
      } catch {}
    }

    return () => {
      // cleanup on unmount
      disableCursor();
    };
  }, [enabled]);

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input
        checked={enabled}
        className="accent-primary"
        type="checkbox"
        onChange={e => setEnabled(e.target.checked)}
      />
      <span>Aktifkan kursor ayam</span>
    </label>
  );
}
