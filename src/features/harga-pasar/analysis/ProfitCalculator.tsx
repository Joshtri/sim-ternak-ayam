import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
} from "@heroui/react";
import { Calculator } from "lucide-react";
import { useEstimasiKeuntungan } from "@/features/harga-pasar/hooks/useHargaPasarAnalysis";
import { EstimasiKeuntunganParams } from "@/features/harga-pasar/types";

export function ProfitCalculator() {
  const [params, setParams] = useState<EstimasiKeuntunganParams>({
    totalAyam: 0,
    beratRataRata: 0,
    tanggalPanen: new Date().toISOString().split("T")[0],
  });

  const [shouldCalculate, setShouldCalculate] = useState(false);

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useEstimasiKeuntungan(params, shouldCalculate);

  const handleCalculate = () => {
    if (
      params.totalAyam > 0 &&
      params.beratRataRata > 0 &&
      params.tanggalPanen
    ) {
      setShouldCalculate(true);
    }
  };

  const handleInputChange = (
    field: keyof EstimasiKeuntunganParams,
    value: string | number
  ) => {
    setShouldCalculate(false); // Reset calculation when inputs change
    setParams(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold">Kalkulator Estimasi Keuntungan</p>
          <p className="text-small text-default-500">
            Hitung potensi pendapatan berdasarkan harga pasar terkini.
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="number"
            label="Jumlah Ayam"
            placeholder="Contoh: 1000"
            value={params.totalAyam.toString()}
            onValueChange={v => handleInputChange("totalAyam", Number(v))}
            min={0}
          />
          <Input
            type="number"
            label="Berat Rata-rata (kg)"
            placeholder="Contoh: 1.8"
            step={0.1}
            value={params.beratRataRata.toString()}
            onValueChange={v => handleInputChange("beratRataRata", Number(v))}
            min={0}
          />
          <Input
            type="date"
            label="Tanggal Panen"
            value={params.tanggalPanen}
            onValueChange={v => handleInputChange("tanggalPanen", v)}
          />
        </div>

        <Button
          color="primary"
          onClick={handleCalculate}
          isLoading={isLoading}
          className="w-full md:w-auto self-end"
        >
          Hitung Estimasi
        </Button>

        {isError && (
          <div className="p-4 bg-danger-50 text-danger rounded-lg">
            <p className="font-semibold">Terjadi Kesalahan</p>
            <p className="text-sm">
              {(error as any)?.message ||
                "Gagal menghitung estimasi. Pastikan data valid."}
            </p>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-success-50 border border-success-200 rounded-lg space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-success-200">
              <span className="font-semibold text-success-900">
                Hasil Estimasi
              </span>
              <span className="text-xs text-success-700">
                Referensi:{" "}
                {new Date(result.tanggalReferensi).toLocaleDateString("id-ID")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-success-700 uppercase">
                  Total Berat
                </p>
                <p className="text-lg font-semibold text-success-900">
                  {result.totalBerat.toLocaleString()} kg
                </p>
              </div>
              <div>
                <p className="text-xs text-success-700 uppercase">
                  Harga Pasar
                </p>
                <p className="text-lg font-semibold text-success-900">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(result.hargaPerKg)}{" "}
                  /kg
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-success-200">
              <p className="text-sm text-success-700 uppercase mb-1">
                Potensi Pendapatan
              </p>
              <p className="text-3xl font-bold text-success-800">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(result.totalPendapatan)}
              </p>
            </div>

            {result.hargaPasarInfo && (
              <div className="text-xs text-success-700 mt-2 bg-white/50 p-2 rounded">
                <span className="font-semibold">Info Harga:</span>{" "}
                {result.hargaPasarInfo.wilayah
                  ? `${result.hargaPasarInfo.wilayah} - `
                  : ""}
                {result.hargaPasarInfo.keterangan || "Harga Pasar Reguler"}
              </div>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
