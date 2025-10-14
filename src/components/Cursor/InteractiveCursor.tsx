import { useEffect, useRef } from "react";

const CLICKABLE_SELECTOR =
  'a[href], button, [role="button"], [data-cursor="click"], input[type="submit"], [data-cursor-clickable]';

export default function InteractiveCursor(): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;

    // This component no longer uses a click SVG. Instead we toggle the
    // existing `.cursor-chicken` CSS class on documentElement when the
    // pointer is over clickable elements. The div is kept for the JS
    // follower cursor (empty background).

    let lastX = 0;
    let lastY = 0;

    const onPointerMove = (ev: PointerEvent) => {
      // Only for mouse/pen — don't attempt to hide native cursor for touch.
      if (ev.pointerType === "touch") return;

      pos.current.x = ev.clientX;
      pos.current.y = ev.clientY;

      // kick RAF loop if not running
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const updatePosition = () => {
      rafRef.current = null;
      const { x, y } = pos.current;

      if (el) {
        // Only update if changed — cheap compare to reduce updates
        if (x !== lastX || y !== lastY) {
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          lastX = x;
          lastY = y;
        }
      }
    };

    const isClickable = (node: EventTarget | null): boolean => {
      let n = node as Element | null;

      while (n && n !== document.documentElement) {
        try {
          if (n.matches && n.matches(CLICKABLE_SELECTOR)) return true;
        } catch {
          // ignore
        }
        n = n.parentElement;
      }

      return false;
    };

    const onPointerOver = (ev: PointerEvent) => {
      if (ev.pointerType === "touch") return;

      const clickable = isClickable(ev.target);
      const targetEl = ev.target as Element | null;
      const isInputField = !!(
        targetEl &&
        targetEl.closest &&
        targetEl.closest("input, textarea, [contenteditable=true]")
      );

      if (clickable && !isInputField) {
        // show the CSS chicken cursor when hovering clickable elements
        document.documentElement.classList.add("cursor-chicken");
      } else {
        document.documentElement.classList.remove("cursor-chicken");
      }
    };

    const onPointerOut = (ev: PointerEvent) => {
      if (ev.pointerType === "touch") return;

      // remove the chicken cursor when leaving elements
      document.documentElement.classList.remove("cursor-chicken");
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.classList.remove("cursor-chicken");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="custom-cursor"
      style={{ left: 0, top: 0 }}
    />
  );
}
