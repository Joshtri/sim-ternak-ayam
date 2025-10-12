import { ReactNode, useState } from "react";
import { cn } from "@heroui/react";

import { Sidebar } from "../Sidebar";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { Breadcrumbs } from "../Breadcrumbs";

import { UserRole } from "@/types/navigation";

// ============================================
// 📐 APP LAYOUT COMPONENT
// ============================================
// Main layout wrapper dengan Sidebar, Navbar, Breadcrumbs, Footer

interface AppLayoutProps {
  /** Page content */
  children: ReactNode;
  /** User role untuk role-based navigation */
  userRole?: UserRole;
  /** Hide breadcrumbs? */
  hideBreadcrumbs?: boolean;
  /** Custom breadcrumb items */
  customBreadcrumbs?: Array<{ label: string; href?: string }>;
}

export function AppLayout({
  children,
  userRole = "operator",
  hideBreadcrumbs = false,
  customBreadcrumbs,
}: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isSidebarCollapsed} userRole={userRole} />
      </div>

      {/* Sidebar - Mobile (Overlay) */}
      {isMobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={toggleMobileSidebar}
          />

          {/* Sidebar */}
          <div className="lg:hidden">
            <Sidebar userRole={userRole} />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        {/* Navbar */}
        <Navbar
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={toggleMobileSidebar}
        />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            {!hideBreadcrumbs && (
              <Breadcrumbs customItems={customBreadcrumbs} />
            )}

            {/* Page Content */}
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
