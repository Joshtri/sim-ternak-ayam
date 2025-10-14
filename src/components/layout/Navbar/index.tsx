import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@heroui/react";

import { authService } from "@/features/auth/services/authService";
import { showToast } from "@/utils/showToast";

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
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };
  const qc = useQueryClient();
  const navigate = useNavigate();

  // silence unused prop warning if consumer doesn't use it yet
  void isSidebarCollapsed;

  interface CurrentUser {
    id?: string;
    username?: string;
    email?: string;
    fullName?: string;
    noWA?: string;
    role?: string;
    createdAt?: string;
    updateAt?: string;
  }

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

  return (
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

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center gap-2 bg-default-100 rounded-lg px-4 py-2 w-80">
            <Search className="text-default-400" size={18} />
            <input
              className="bg-transparent outline-none flex-1 text-sm"
              placeholder="Cari kandang, ternak, laporan..."
              type="text"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Search (Mobile) */}
          <Button isIconOnly className="md:hidden" variant="light">
            <Search size={20} />
          </Button>

          {/* Theme Toggle */}
          <Button isIconOnly variant="light" onPress={toggleTheme}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {/* Notifications */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <div className="relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Notifications">
              <DropdownItem key="notif1" description="5 menit yang lalu">
                Stok pakan kandang A menipis
              </DropdownItem>
              <DropdownItem key="notif2" description="1 jam yang lalu">
                Laporan harian tersedia
              </DropdownItem>
              <DropdownItem key="notif3" description="2 jam yang lalu">
                Jadwal vaksinasi besok
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

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
  );
}

export default Navbar;
