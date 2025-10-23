import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";

import { useBroadcastNotification } from "../hooks/useNotifikasi";
import {
  BroadcastNotificationDto,
  NotificationType,
  NotificationPriority,
} from "../types";

interface BroadcastFormProps {
  onSuccess?: () => void;
}

export function BroadcastForm({ onSuccess }: BroadcastFormProps) {
  const broadcastMutation = useBroadcastNotification();

  const [formData, setFormData] = useState<BroadcastNotificationDto>({
    title: "",
    message: "",
    type: "info",
    priority: "medium",
    target_role: "all",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    broadcastMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          title: "",
          message: "",
          type: "info",
          priority: "medium",
          target_role: "all",
        });
        onSuccess?.();
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Broadcast Notifikasi</h3>
      </CardHeader>
      <CardBody>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Judul"
            placeholder="Masukkan judul notifikasi"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />

          <Textarea
            isRequired
            label="Pesan"
            minRows={4}
            placeholder="Masukkan pesan notifikasi"
            value={formData.message}
            onChange={e =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <Select
            label="Tipe"
            selectedKeys={[formData.type || "info"]}
            onChange={e =>
              setFormData({
                ...formData,
                type: e.target.value as NotificationType,
              })
            }
          >
            <SelectItem key="info">Info</SelectItem>
            <SelectItem key="warning">Warning</SelectItem>
            <SelectItem key="error">Error</SelectItem>
            <SelectItem key="success">Success</SelectItem>
            <SelectItem key="reminder">Reminder</SelectItem>
            <SelectItem key="system">System</SelectItem>
            <SelectItem key="message">Message</SelectItem>
          </Select>

          <Select
            label="Prioritas"
            selectedKeys={[formData.priority || "medium"]}
            onChange={e =>
              setFormData({
                ...formData,
                priority: e.target.value as NotificationPriority,
              })
            }
          >
            <SelectItem key="low">Low</SelectItem>
            <SelectItem key="medium">Medium</SelectItem>
            <SelectItem key="high">High</SelectItem>
            <SelectItem key="urgent">Urgent</SelectItem>
          </Select>

          <Select
            label="Target Role"
            selectedKeys={[formData.target_role || "all"]}
            onChange={e =>
              setFormData({
                ...formData,
                target_role: e.target.value as any,
              })
            }
          >
            <SelectItem key="all">Semua Pengguna</SelectItem>
            <SelectItem key="Petugas">Petugas</SelectItem>
            <SelectItem key="Operator">Operator</SelectItem>
            <SelectItem key="Pemilik">Pemilik</SelectItem>
          </Select>

          <Button
            className="w-full"
            color="primary"
            isLoading={broadcastMutation.isPending}
            type="submit"
          >
            Kirim Broadcast
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
