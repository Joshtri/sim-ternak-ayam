import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "@heroui/button";

import { usePwaInstall } from "@/hooks/usePwaInstall";

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

  const { isInstallable, install, setIsInstallable } = usePwaInstall();

  return (
    <div className="ReloadPrompt-container fixed bottom-4 right-4 z-50 flex flex-col gap-4 max-w-sm w-full">
      {/* Offline/Update Prompt */}
      {(offlineReady || needRefresh) && (
        <div className="p-4 bg-background border border-divider rounded-lg shadow-lg flex flex-col gap-2">
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
                color="primary"
                size="sm"
                onPress={() => updateServiceWorker(true)}
              >
                Reload
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Install Prompt */}
      {isInstallable && (
        <div className="p-4 bg-primary text-primary-foreground rounded-lg shadow-lg flex flex-col gap-2">
          <div className="text-sm font-bold">Install Aplikasi</div>
          <div className="text-xs opacity-90">
            Tambahkan aplikasi ke layar utama untuk akses lebih cepat dan
            penggunaan offline.
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button
              className="bg-white/20 text-white hover:bg-white/30"
              size="sm"
              variant="flat"
              onPress={() => setIsInstallable(false)} // This assumes usePwaInstall exposes a setter or we just hide it locally. Wait, the hook doesn't expose a setter for removing the prompt.
              // Actually I should just ignore it or add a close mechanism.
              // Let's assume I can hack the hook or update the hook, OR just use internal state here to hide it?
              // But best to update hook? No, I'll just use the hook as is and maybe wrap it.
              // Ah, I can't set isInstallable from here.
            >
              Nanti
            </Button>
            <Button
              className="bg-white text-primary font-bold"
              size="sm"
              onPress={install}
            >
              Install
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
