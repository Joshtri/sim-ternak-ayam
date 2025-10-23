/**
 * Reusable PDF Export Button Component
 * Handles PDF export for both Operational and Health reports
 */

import { useState } from "react";
import { Button } from "@heroui/react";
import { FileDown } from "lucide-react";

import { laporanService } from "../services/laporanService";

import { showToast } from "@/utils/showToast";

interface ExportPDFButtonProps {
  reportType: "operasional" | "kesehatan";
  kandangId: string;
  kandangNama?: string;
  startDate?: string;
  endDate?: string;
  variant?:
    | "solid"
    | "flat"
    | "bordered"
    | "light"
    | "faded"
    | "shadow"
    | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export default function ExportPDFButton({
  reportType,
  kandangId,
  kandangNama,
  startDate,
  endDate,
  variant = "flat",
  size = "md",
  fullWidth = false,
  className = "",
}: ExportPDFButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPDF = async () => {
    if (!kandangId) {
      showToast({ color: "error", description: "Kandang ID tidak tersedia" });

      return;
    }

    setIsLoading(true);

    try {
      let blob: Blob;
      let filename: string;

      // Call appropriate service based on report type
      if (reportType === "operasional") {
        blob = await laporanService.downloadOperasionalPDF(
          kandangId,
          startDate,
          endDate
        );
        filename = `Laporan_Operasional_${kandangNama || kandangId}_${new Date().toISOString().split("T")[0]}.pdf`;
      } else {
        blob = await laporanService.downloadKesehatanPDF(
          kandangId,
          startDate,
          endDate
        );
        filename = `Laporan_Kesehatan_Ayam_${kandangNama || kandangId}_${new Date().toISOString().split("T")[0]}.pdf`;
      }

      // Create download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showToast({ color: "success", description: "PDF berhasil diunduh!" });
    } catch (_error) {
      // console.error("Error downloading PDF:", error);
      showToast({
        color: "error",
        description: "Gagal mengunduh PDF. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={className}
      color="primary"
      fullWidth={fullWidth}
      isLoading={isLoading}
      size={size}
      startContent={!isLoading && <FileDown size={18} />}
      variant={variant}
      onPress={handleExportPDF}
    >
      {isLoading ? "Mengunduh PDF..." : "Download PDF"}
    </Button>
  );
}
