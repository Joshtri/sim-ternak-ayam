import { Link, useMatchRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@heroui/react";

import {
  NavigationItem,
  NavigationSection,
  UserRole,
} from "@/types/navigation";
import { getNavigationByRole } from "@/config/navigation";

// ============================================
// 🎯 SIDEBAR COMPONENT
// ============================================

interface SidebarProps {
  /** User role untuk filter menu */
  userRole?: UserRole;
  /** Collapsed state */
  isCollapsed?: boolean;
}

export function Sidebar({
  userRole = "operator",
  isCollapsed = false,
}: SidebarProps) {
  const navigation = getNavigationByRole(userRole);

  return (
    <aside
      className={cn(
        "glass-sidebar fixed left-0 top-0 h-screen overflow-y-auto scrollbar-glass",
        "transition-all duration-300 z-40",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo/Brand */}
      <div className="p-3.5 border-b border-divider">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🐔</div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg">Ternak Ayam</h1>
              {/* <p className="text-xs text-default-500">Manajemen Broiler</p> */}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="p-4 space-y-6 pb-24">
        {navigation.map((section, sectionIndex) => (
          <NavigationSectionComponent
            key={sectionIndex}
            isCollapsed={isCollapsed}
            section={section}
          />
        ))}
      </nav>

      {/* User Info di bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-divider bg-content1/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">Admin User</p>
              <p className="text-xs text-default-500 capitalize">{userRole}</p>
            </div>
          )}
        </div>
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
}: {
  section: NavigationSection;
  isCollapsed: boolean;
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
}: {
  item: NavigationItem;
  isCollapsed: boolean;
}) {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to: item.href });
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

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
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  // Regular item
  return (
    <li>
      <Link
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg",
          "transition-all duration-200",
          "hover:bg-default-100",
          isActive
            ? "bg-primary/10 text-primary font-semibold"
            : "text-default-700 hover:text-default-900"
        )}
        to={item.href}
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
    </li>
  );
}

export default Sidebar;
