/**
 * Produktivitas Page
 * Show petugas performance & productivity analysis
 */

import { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
  Input,
} from "@heroui/react";
import { TrendingUp } from "lucide-react";

import { useProduktivitas } from "../hooks/useLaporan";

import PetugasPerformanceCard from "./components/PetugasPerformanceCard";
import DetailProduktivitasModal from "./components/DetailProduktivitasModal";

// Main Component
export default function ProduktivitasList() {
  const [sortBy, setSortBy] = useState<string>("productivity");
  const [selectedPetugasId, setSelectedPetugasId] = useState<string | null>(
    null
  );

  // Filter state (YYYY-MM)
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [hasKandang, setHasKandang] = useState<string>("all");

  // Derived filters
  const selectedYear = selectedPeriod
    ? selectedPeriod.split("-")[0]
    : undefined;
  const selectedMonth = selectedPeriod
    ? selectedPeriod.split("-")[1]
    : undefined;

  const filterHasKandang = useMemo(() => {
    if (hasKandang === "all") return undefined;
    return hasKandang === "true";
  }, [hasKandang]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: produktivitasData, isLoading } = useProduktivitas(
    selectedYear,
    selectedMonth,
    filterHasKandang
  );

  // Sort data
  const sortedData = useMemo(() => {
    if (!produktivitasData) return [];

    const data = [...produktivitasData];

    switch (sortBy) {
      case "productivity":
        return data.sort((a, b) => b.skorProduktivitas - a.skorProduktivitas);
      case "mortality":
        return data.sort(
          (a, b) => a.rataMortalitasPersen - b.rataMortalitasPersen
        );
      case "operations":
        return data.sort((a, b) => b.totalOperasional - a.totalOperasional);
      case "kandang":
        return data.sort((a, b) => b.totalKandang - a.totalKandang);
      default:
        return data;
    }
  }, [produktivitasData, sortBy]);

  const handleViewDetail = (petugasId: string) => {
    setSelectedPetugasId(petugasId);
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedPetugasId(null);
  };

  return (
    // <AppLayout>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analisis Produktivitas Petugas</h1>
          <p className="text-default-500">
            Performance dan produktivitas pengelolaan kandang
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-2 w-full md:w-auto">
          <Input
            className="w-full md:w-48"
            // description="Pilih periode laporan"
            label="Periode"
            type="month"
            value={selectedPeriod}
            variant="bordered"
            onChange={e => setSelectedPeriod(e.target.value)}
          />
          <Select
            className="w-full md:w-48"
            label="Status Kandang"
            placeholder="Semua Status"
            selectedKeys={[hasKandang]}
            variant="bordered"
            onChange={e => setHasKandang(e.target.value)}
          >
            <SelectItem key="all">Semua Petugas</SelectItem>
            <SelectItem key="true">Mengelola Kandang</SelectItem>
            <SelectItem key="false">Tanpa Kandang</SelectItem>
          </Select>
        </div>
      </div>

      {/* Sorting Options */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-4">
            <TrendingUp className="text-default-500" size={18} />
            <span className="text-sm font-medium">Urutkan berdasarkan:</span>
            <Select
              className="max-w-xs"
              selectedKeys={[sortBy]}
              size="sm"
              onSelectionChange={keys =>
                setSortBy(Array.from(keys)[0] as string)
              }
            >
              <SelectItem key="productivity">
                Skor Produktivitas (Tertinggi)
              </SelectItem>
              <SelectItem key="mortality">Mortalitas (Terendah)</SelectItem>
              <SelectItem key="operations">
                Jumlah Operasional (Terbanyak)
              </SelectItem>
              <SelectItem key="kandang">Jumlah Kandang (Terbanyak)</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Performance Cards */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : sortedData && sortedData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedData.map(petugas => (
            <PetugasPerformanceCard
              key={petugas.petugasId}
              petugas={petugas}
              onViewDetail={handleViewDetail}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-default-500">
              Belum ada data produktivitas petugas
            </p>
          </CardBody>
        </Card>
      )}

      {/* Detail Modal */}
      {/* <DetailModal
        isOpen={isOpen}
        petugasId={selectedPetugasId}
        onClose={handleCloseModal}
      /> */}
      <DetailProduktivitasModal
        hasKandang={filterHasKandang}
        isOpen={isOpen}
        month={selectedMonth}
        petugasId={selectedPetugasId || ""}
        year={selectedYear}
        onClose={handleCloseModal}
      />
    </div>
  );
}
