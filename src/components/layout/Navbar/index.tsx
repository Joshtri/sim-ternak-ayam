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
                  <span className="text-primary font-semibold text-sm">A</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-default-500">Operator</p>
                </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem key="profile" startContent={<User size={16} />}>
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
