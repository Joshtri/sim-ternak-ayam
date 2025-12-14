import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "@heroui/button";

export function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="ReloadPrompt-container">
      {(offlineReady || needRefresh) && (
        <div className="fixed bottom-4 right-4 p-4 bg-background border border-divider rounded-lg shadow-lg z-50 flex flex-col gap-2 max-w-sm">
          <div className="text-sm font-medium">
            {offlineReady ? (
              <span>Aplikasi siap bekerja offline</span>
            ) : (
              <span>Konten baru tersedia, klik reload untuk update.</span>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="light" onPress={close}>
              Tutup
            </Button>
            {needRefresh && (
              <Button
                size="sm"
                color="primary"
                onPress={() => updateServiceWorker(true)}
              >
                Reload
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
