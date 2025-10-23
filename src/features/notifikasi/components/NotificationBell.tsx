import {
  Badge,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { Bell } from "lucide-react";

import { useUnreadCount } from "../hooks/useNotifikasi";

import { NotificationList } from "./NotificationList";

export function NotificationBell() {
  const { data: unreadData } = useUnreadCount();

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          isIconOnly
          aria-label="Notifications"
          className="relative"
          variant="light"
        >
          <Bell className="h-6 w-6" />
          {unreadData && unreadData.count > 0 && (
            <Badge
              className="absolute -top-1 -right-1"
              color="danger"
              content={unreadData.count > 99 ? "99+" : unreadData.count}
              size="sm"
            >
              <span />
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-80">
        <NotificationList compact maxItems={5} />
      </PopoverContent>
    </Popover>
  );
}
