import { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";

import {
  NotificationList,
  BroadcastForm,
} from "@/features/notifikasi/components";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";

interface User {
  role: string;
}

export default function NotifikasiPage() {
  const { data: user } = useCurrentUser<User>();
  const [selectedTab, setSelectedTab] = useState("all");

  const isPemilik = user?.role === "Pemilik";

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Notifikasi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={key => setSelectedTab(key as string)}
              >
                <Tab key="all" title="Semua">
                  <div className="mt-4">
                    <NotificationList />
                  </div>
                </Tab>
                <Tab key="unread" title="Belum Dibaca">
                  <div className="mt-4">
                    <NotificationList />
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>

        {isPemilik && (
          <div>
            <BroadcastForm />
          </div>
        )}
      </div>
    </div>
  );
}
