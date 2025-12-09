import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Menu, Search, Sun, Moon, LogOut, User, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@heroui/react";

import { NotificationDropdown } from "./NotificationDropdown";
import { CommandPalette } from "./CommandPalette";

import { authService } from "@/features/auth/services/authService";
import { showToast } from "@/utils/showToast";
import { CurrentUser } from "@/features/auth/types";

// ============================================
// 🎯 NAVBAR COMPONENT
// ============================================

interface NavbarProps {
  /** Toggle sidebar collapsed */
  onToggleSidebar?: () => void;
  /** Is sidebar collapsed? */
  isSidebarCollapsed?: boolean;
}

export function Navbar({
  onToggleSidebar,
  isSidebarCollapsed = false,
}: NavbarProps) {
  const [isDark, setIsDark] = useState(() => {
    // 1. Cek localStorage
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }
    // 2. Cek system preference jika tidak ada di localStorage
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true;
    }

    return false;
  });

  // Sync perubahan theme ke DOM & localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };
  const qc = useQueryClient();
  const navigate = useNavigate();

  // silence unused prop warning if consumer doesn't use it yet
  void isSidebarCollapsed;

  const { data: me } = useQuery<CurrentUser>({
    queryKey: ["me"],
    queryFn: () => authService.me<CurrentUser>(),
    staleTime: 1000 * 60 * 5,
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      try {
        qc.invalidateQueries({ queryKey: ["me"] });
      } catch {}

      showToast({
        title: "Logged out",
        description: "Anda berhasil logout.",
        color: "success",
      });
    },
    onError: (err: any) => {
      showToast({
        title: "Logout gagal",
        description: String(err?.message ?? "Gagal logout"),
        color: "error",
      });
    },
  });

  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen(open => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandPalette
        isOpen={isCommandOpen}
        userRole={me?.role}
        onClose={() => setIsCommandOpen(false)}
      />
      <header className="glass-navbar">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left: Toggle Sidebar Button */}
          <div className="flex items-center gap-4">
            <Button
              isIconOnly
              className="lg:hidden"
              variant="light"
              onPress={onToggleSidebar}
            >
              <Menu size={20} />
            </Button>

            {/* Search Bar (Desktop) - Now a Trigger for Command Palette */}
            <button
              className="hidden md:flex items-center gap-2 bg-default-100 hover:bg-default-200 transition-colors rounded-lg px-4 py-2 w-80 text-left cursor-pointer group"
              onClick={() => setIsCommandOpen(true)}
            >
              <Search
                className="text-default-400 group-hover:text-default-500"
                size={18}
              />
              <span className="flex-1 text-sm text-default-400 group-hover:text-default-600">
                Quick search...
              </span>
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-default-200 bg-default-50 px-1.5 font-mono text-[10px] font-medium text-default-500 opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Search (Mobile) */}
            <Button
              isIconOnly
              className="md:hidden"
              variant="light"
              onPress={() => setIsCommandOpen(true)}
            >
              <Search size={20} />
            </Button>

            {/* Theme Toggle */}
            <Button isIconOnly variant="light" onPress={toggleTheme}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Notifications - Realtime with auto-refresh */}
            <NotificationDropdown />

            {/* User Menu */}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button className="gap-2" variant="light">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {me?.username?.[0]?.toUpperCase() ?? "A"}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium">
                      {me?.fullName ?? me?.username ?? "Admin User"}
                    </p>
                    <p className="text-xs text-default-500">
                      {me?.role ?? "Operator"}
                    </p>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User menu"
                onAction={async key => {
                  if (key === "logout") {
                    await logoutMutation.mutateAsync();
                    try {
                      navigate({ to: "/" });
                    } catch {}
                  }
                }}
              >
                <DropdownItem
                  key="profile"
                  as={Link}
                  href={"/profile"}
                  startContent={<User size={16} />}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<Settings size={16} />}
                >
                  Pengaturan
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-danger"
                  color="danger"
                  isDisabled={logoutMutation.status === "pending"}
                  startContent={<LogOut size={16} />}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
