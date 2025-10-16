/**
 * Kesehatan Ayam Page
 * Displays kandang health status with color indicators
 */

import { useState } from "react";
import { Card, CardBody, Input, Spinner, useDisclosure } from "@heroui/react";
import { Search } from "lucide-react";

import { useKesehatanAyam } from "../hooks/useLaporan";

import DetailKesehatanModal from "./components/DetailKesehatanModal";
import KandangHealthCard from "./components/KandangHealthCard";

// Helper function to get health status color

// Helper function to get health status label

// Kandang Health Card Component
// function KandangHealthCard({
//   kandang,
//   onViewDetail,
// }: {
//   kandang: KesehatanAyam;
//   onViewDetail: (id: string) => void;
// }) {
//   const healthStatus = getHealthStatusLabel(kandang.persentaseMortalitas);
//   const healthColor = getHealthStatusColor(kandang.persentaseMortalitas);

//   return (
//     <Card className="hover:shadow-lg transition-shadow">
//       <CardHeader className="flex flex-col gap-2 pb-4">
//         <div className="flex justify-between items-start w-full">
//           <div>
//             <h3 className="text-lg font-bold">{kandang.namaKandang}</h3>
//             <p className="text-sm text-default-500 flex items-center gap-1">
//               <MapPin size={14} /> {kandang.lokasi}
//             </p>
//           </div>
//           <Chip color={healthColor} size="sm" variant="flat">
//             {healthStatus}
//           </Chip>
//         </div>
//       </CardHeader>

//       <CardBody className="space-y-3">
//         {/* Petugas Info */}
//         <div className="pb-3 border-b border-divider">
//           <p className="text-xs text-default-400 mb-1">
//             Petugas Bertanggung Jawab
//           </p>
//           <p className="font-medium">{kandang.namaPetugas}</p>
//           <div className="flex gap-3 mt-1">
//             <span className="text-xs text-default-500 flex items-center gap-1">
//               <Phone size={12} /> {kandang.noWAPetugas || "-"}
//             </span>
//             <span className="text-xs text-default-500 flex items-center gap-1">
//               <Mail size={12} /> {kandang.emailPetugas}
//             </span>
//           </div>
//         </div>

//         {/* Statistics */}
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <p className="text-xs text-default-400">Kapasitas</p>
//             <p className="font-semibold flex items-center gap-1">
//               <Users className="text-primary" size={14} />
//               {kandang.kapasitas.toLocaleString("id-ID")}
//             </p>
//           </div>
//           <div>
//             <p className="text-xs text-default-400">Ayam Hidup</p>
//             <p className="font-semibold flex items-center gap-1">
//               <HeartPulse className="text-success" size={14} />
//               {kandang.ayamHidup.toLocaleString("id-ID")}
//             </p>
//           </div>
//           <div>
//             <p className="text-xs text-default-400">Total Mortalitas</p>
//             <p className="font-semibold flex items-center gap-1">
//               <AlertTriangle className="text-danger" size={14} />
//               {kandang.totalMortalitas.toLocaleString("id-ID")}
//             </p>
//           </div>
//           <div>
//             <p className="text-xs text-default-400">% Mortalitas</p>
//             <p className={`font-semibold text-${healthColor}`}>
//               {kandang.persentaseMortalitas.toFixed(2)}%
//             </p>
//           </div>
//         </div>

//         {/* View Detail Button */}
//         <Button
//           fullWidth
//           color="primary"
//           size="sm"
//           variant="flat"
//           onClick={() => onViewDetail(kandang.kandangId)}
//         >
//           Lihat Detail
//         </Button>
//       </CardBody>
//     </Card>
//   );
// }

// Detail Modal Component
// Main Component
export default function KesehatanAyamList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKandangId, setSelectedKandangId] = useState<string | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: kesehatanData, isLoading } = useKesehatanAyam();

  // Filter data based on search
  const filteredData = kesehatanData?.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    return (
      item.namaKandang.toLowerCase().includes(query) ||
      item.lokasi.toLowerCase().includes(query) ||
      item.namaPetugas.toLowerCase().includes(query)
    );
  });

  const handleViewDetail = (kandangId: string) => {
    setSelectedKandangId(kandangId);
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedKandangId(null);
  };

  return (
    // <AppLayout>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Laporan Kesehatan Ayam</h1>
          <p className="text-default-500">
            Monitoring status kesehatan kandang berdasarkan mortalitas
          </p>
        </div>
      </div>

      {/* Search */}
      <Input
        className="max-w-md"
        placeholder="Cari berdasarkan nama kandang, lokasi, atau petugas..."
        startContent={<Search size={18} />}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Cards Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : filteredData && filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map(kandang => (
            <KandangHealthCard
              key={kandang.kandangId}
              kandang={kandang}
              onViewDetail={handleViewDetail}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-default-500">
              {searchQuery
                ? "Tidak ada data yang sesuai dengan pencarian"
                : "Belum ada data kesehatan ayam"}
            </p>
          </CardBody>
        </Card>
      )}

      {/* Detail Modal */}
      {/* <DetailModal
        isOpen={isOpen}
        kandangId={selectedKandangId}
        onClose={handleCloseModal}
      /> */}

      <DetailKesehatanModal
        isOpen={isOpen}
        kandangId={selectedKandangId}
        onClose={handleCloseModal}
      />
    </div>
    // </AppLayout>
  );
}
