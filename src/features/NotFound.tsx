import { Button } from "@heroui/button";
import { Link } from "@tanstack/react-router";
import { Home, FileQuestion } from "lucide-react";

import { Card } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-md w-full p-8 text-center bg-white/80 dark:bg-black/40 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <FileQuestion className="w-16 h-16 text-primary" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            404
          </h1>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah
              dipindahkan.
            </p>
          </div>

          <div className="pt-4 w-full">
            <Button
              as={Link}
              className="w-full font-medium"
              color="primary"
              size="lg"
              startContent={<Home size={20} />}
              to="/dashboard"
              variant="shadow"
            >
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
