import { useState } from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, Tooltip } from "@heroui/react";

import {
  NavigationItem,
  NavigationSection,
  UserRole,
} from "@/types/navigation";
import { getNavigationByRole } from "@/config/navigation";
import { authService } from "@/features/auth/services/authService";

// ============================================
// 🎯 SIDEBAR COMPONENT
// ============================================

interface SidebarProps {
  /** User role untuk filter menu */
  userRole?: UserRole;
  /** Collapsed state */
  isCollapsed?: boolean;
  /** Is mobile sidebar open */
  isMobileOpen?: boolean;
  /** Toggle collapse (desktop) */
  onToggleCollapse?: () => void;
  /** Close mobile sidebar */
  onCloseMobile?: () => void;
}

export function Sidebar({
  userRole = "operator",
  isCollapsed = false,
  isMobileOpen = false,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  // Try to fetch current user; fallback to provided userRole prop
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      authService.me<{
        role?: string;
        fullName?: string;
        username?: string;
      }>(),
    staleTime: 1000 * 60 * 5,
  });

  const normalizeRole = (r?: string) => {
    if (!r) return userRole;

    const lower = r.toLowerCase();

    if (lower.includes("pemilik")) return "pemilik" as UserRole;

    if (lower.includes("operator")) return "operator" as UserRole;

    if (lower.includes("petugas")) return "petugas" as UserRole;

    return userRole;
  };

  const effectiveRole = normalizeRole(me?.role);
  const navigation = getNavigationByRole(effectiveRole);

  return (
    <aside
      className={cn(
        "glass-sidebar fixed left-0 top-0 h-screen flex flex-col",
        "transition-all duration-300 z-40",
        // Desktop: show/hide based on isCollapsed
        isCollapsed ? "w-20" : "w-64",
        // Mobile: slide in/out based on isMobileOpen
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Logo/Brand */}
      <div className="p-3.5 border-b border-divider flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🐔</div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg">Ternak Ayam</h1>
              {/* <p className="text-xs text-default-500">Manajemen Broiler</p> */}
            </div>
          )}
        </div>

        {/* Collapse Toggle Button - Desktop only */}
        {onToggleCollapse && (
          <button
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-default-100 transition-colors"
            onClick={onToggleCollapse}
          >
            {isCollapsed ? (
              <ChevronRight className="text-default-500" size={18} />
            ) : (
              <ChevronLeft className="text-default-500" size={18} />
            )}
          </button>
        )}
      </div>

      {/* Navigation Sections - Scrollable area */}
      <nav className="flex-1 overflow-y-auto scrollbar-glass p-4 space-y-6">
        {navigation.map((section, sectionIndex) => (
          <NavigationSectionComponent
            key={sectionIndex}
            isCollapsed={isCollapsed}
            section={section}
            onItemClick={onCloseMobile}
          />
        ))}
      </nav>

      {/* User Info at bottom - Fixed, no scroll */}
      <div className="flex-shrink-0 p-4 border-t border-divider bg-content1/50">
        {isCollapsed ? (
          <Tooltip
            content={me?.fullName ?? me?.username ?? "Admin User"}
            placement="right"
          >
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {(me?.username || "A")[0]?.toUpperCase() ?? "A"}
                </span>
              </div>
            </div>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold">
                {(me?.username || "A")[0]?.toUpperCase() ?? "A"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {me?.fullName ?? me?.username ?? "Admin User"}
              </p>
              <p className="text-xs text-default-500 capitalize">
                {effectiveRole}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

/**
 * Navigation Section Component
 */
function NavigationSectionComponent({
  section,
  isCollapsed,
  onItemClick,
}: {
  section: NavigationSection;
  isCollapsed: boolean;
  onItemClick?: () => void;
}) {
  return (
    <div>
      {section.title && !isCollapsed && (
        <h3 className="text-xs font-semibold text-default-500 uppercase tracking-wider mb-3 px-3">
          {section.title}
        </h3>
      )}
      <ul className="space-y-1">
        {section.items.map(item => (
          <NavigationItemComponent
            key={item.id}
            isCollapsed={isCollapsed}
            item={item}
            onItemClick={onItemClick}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * Navigation Item Component
 */
function NavigationItemComponent({
  item,
  isCollapsed,
  onItemClick,
}: {
  item: NavigationItem;
  isCollapsed: boolean;
  onItemClick?: () => void;
}) {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to: item.href });
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  // Handle click - close mobile sidebar
  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  // Item dengan children (collapsible)
  if (hasChildren && !isCollapsed) {
    return (
      <li>
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
            "transition-all duration-200",
            "hover:bg-default-100",
            isActive && "bg-primary/10 text-primary"
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          <span className="flex-1 text-left font-medium text-sm">
            {item.label}
          </span>
          {item.badge && (
            <span className="px-2 py-0.5 text-xs bg-danger text-danger-foreground rounded-full">
              {item.badge}
            </span>
          )}
          <ChevronDown
            className={cn(
              "transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
            size={16}
          />
        </button>

        {/* Sub-items */}
        {isExpanded && (
          <ul className="ml-6 mt-1 space-y-1 border-l-2 border-default-200 pl-4">
            {item.children!.map(child => (
              <NavigationItemComponent
                key={child.id}
                isCollapsed={false}
                item={child}
                onItemClick={onItemClick}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  // Regular item with tooltip when collapsed
  const linkContent = (
    <Link
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg",
        "transition-all duration-200",
        "hover:bg-default-100",
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-default-700 hover:text-default-900",
        isCollapsed && "justify-center"
      )}
      to={item.href}
      onClick={handleClick}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      {!isCollapsed && (
        <>
          <span className="flex-1 text-sm font-medium">{item.label}</span>
          {item.badge && (
            <span className="px-2 py-0.5 text-xs bg-danger text-danger-foreground rounded-full">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );

  return (
    <li>
      {isCollapsed ? (
        <Tooltip content={item.label} placement="right">
          {linkContent}
        </Tooltip>
      ) : (
        linkContent
      )}
    </li>
  );
}

export default Sidebar;
