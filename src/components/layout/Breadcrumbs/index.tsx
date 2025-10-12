import {
  Breadcrumbs as HeroUIBreadcrumbs,
  BreadcrumbItem,
} from "@heroui/breadcrumbs";
import { useLocation } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { useMemo } from "react";

import { getAllNavigationItems } from "@/config/navigation";

// ============================================
// 🍞 BREADCRUMBS COMPONENT
// ============================================
// Auto-generated breadcrumbs dari current route

interface BreadcrumbsProps {
  /** Custom breadcrumb items (optional) */
  customItems?: Array<{ label: string; href?: string }>;
}

export function Breadcrumbs({ customItems }: BreadcrumbsProps) {
  const location = useLocation();
  const navigationItems = getAllNavigationItems();

  const breadcrumbItems = useMemo(() => {
    // If custom items provided, use them
    if (customItems) {
      return customItems;
    }

    // Auto-generate from pathname
    const pathSegments = location.pathname
      .split("/")
      .filter(segment => segment !== "");

    // Always start with home
    const items: Array<{ label: string; href: string }> = [
      { label: "Home", href: "/dashboard" },
    ];

    // Build breadcrumbs from path segments
    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Try to find label from navigation config
      const navItem = navigationItems.find(item => item.href === currentPath);

      const label =
        navItem?.label ||
        // Fallback: capitalize segment and replace hyphens
        segment
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      items.push({
        label,
        href: currentPath,
      });
    });

    return items;
  }, [location.pathname, customItems, navigationItems]);

  // Don't show breadcrumbs on home/dashboard
  if (location.pathname === "/" || location.pathname === "/dashboard") {
    return null;
  }

  return (
    <div className="mb-6">
      <HeroUIBreadcrumbs separator="/" variant="solid">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <BreadcrumbItem
              key={item.href}
              {...(isLast ? {} : { href: item.href })}
            >
              {index === 0 ? (
                <div className="flex items-center gap-1">
                  <Home size={14} />
                  <span>{item.label}</span>
                </div>
              ) : (
                item.label
              )}
            </BreadcrumbItem>
          );
        })}
      </HeroUIBreadcrumbs>
    </div>
  );
}

export default Breadcrumbs;
