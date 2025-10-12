import { cn } from "@heroui/react";
import { type ReactNode } from "react";

// import { cn } from "@/lib/utils";

// ============================================
// 🪟 GLASS COMPONENT
// ============================================
// Reusable glassmorphism component untuk UI modern

export interface GlassProps {
  children: ReactNode;
  className?: string;
  variant?: "sm" | "md" | "lg" | "xl" | "default";
  as?: "div" | "section" | "aside" | "header" | "footer" | "nav";
  hover?: boolean;
}

/**
 * Glass component dengan glassmorphism effect
 *
 * @example
 * // Basic usage
 * <Glass>Content here</Glass>
 *
 * // With variant
 * <Glass variant="lg">
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </Glass>
 *
 * // As different element
 * <Glass as="nav" variant="lg">
 *   <NavContent />
 * </Glass>
 *
 * // With hover effect
 * <Glass hover>
 *   <InteractiveContent />
 * </Glass>
 */
export function Glass({
  children,
  className,
  variant = "default",
  as: Component = "div",
  hover = false,
}: GlassProps) {
  const glassVariants = {
    default: "glass",
    sm: "glass-sm",
    md: "glass-md",
    lg: "glass-lg",
    xl: "glass-xl",
  };

  return (
    <Component
      className={cn(
        glassVariants[variant],
        "rounded-xl",
        hover &&
          "transition-all duration-300 hover:shadow-glass-lg hover:backdrop-blur-lg",
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * GlassCard - Pre-styled glass card with padding
 */
export function GlassCard({
  children,
  className,
  hover = true,
}: Omit<GlassProps, "variant" | "as">) {
  return (
    <Glass className={cn("p-6", className)} hover={hover}>
      {children}
    </Glass>
  );
}

/**
 * GlassNavbar - Pre-styled glass navbar
 */
export function GlassNavbar({
  children,
  className,
}: Omit<GlassProps, "variant" | "as" | "hover">) {
  return (
    <Glass
      as="nav"
      className={cn("sticky top-0 z-50 rounded-none border-b", className)}
      variant="lg"
    >
      {children}
    </Glass>
  );
}

/**
 * GlassSidebar - Pre-styled glass sidebar
 */
export function GlassSidebar({
  children,
  className,
}: Omit<GlassProps, "variant" | "as" | "hover">) {
  return (
    <Glass as="aside" className={cn("h-full border-r", className)} variant="md">
      {children}
    </Glass>
  );
}

/**
 * GlassModal - Pre-styled glass modal
 */
export function GlassModal({
  children,
  className,
}: Omit<GlassProps, "variant" | "as" | "hover">) {
  return (
    <Glass
      className={cn("rounded-2xl p-8 max-w-2xl mx-auto", className)}
      variant="xl"
    >
      {children}
    </Glass>
  );
}

// Export all components
export default Glass;
