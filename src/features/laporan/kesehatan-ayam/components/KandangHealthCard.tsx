import { Card, CardBody, CardHeader, Chip, Button } from "@heroui/react";
import {
  Phone,
  Mail,
  MapPin,
  Users,
  AlertTriangle,
  HeartPulse,
} from "lucide-react";

import { KesehatanAyam } from "../../types";
import { getHealthStatusColor, getHealthStatusLabel } from "../helpers";
import ExportPDFButton from "../../components/ExportPDFButton";

function KandangHealthCard({
  kandang,
  onViewDetail,
}: {
  kandang: KesehatanAyam;
  onViewDetail: (id: string) => void;
}) {
  const healthStatus = getHealthStatusLabel(kandang.persentaseMortalitas);
  const healthColor = getHealthStatusColor(kandang.persentaseMortalitas);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-col gap-2 pb-4">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="text-lg font-bold">{kandang.namaKandang}</h3>
            <p className="text-sm text-default-500 flex items-center gap-1">
              <MapPin size={14} /> {kandang.lokasi}
            </p>
          </div>
          <Chip color={healthColor} size="sm" variant="flat">
            {healthStatus}
          </Chip>
        </div>
      </CardHeader>

      <CardBody className="space-y-3">
        {/* Petugas Info */}
        <div className="pb-3 border-b border-divider">
          <p className="text-xs text-default-400 mb-1">
            Petugas Bertanggung Jawab
          </p>
          <p className="font-medium">{kandang.namaPetugas}</p>
          <div className="flex gap-3 mt-1">
            <span className="text-xs text-default-500 flex items-center gap-1">
              <Phone size={12} /> {kandang.noWAPetugas || "-"}
            </span>
            <span className="text-xs text-default-500 flex items-center gap-1">
              <Mail size={12} /> {kandang.emailPetugas}
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-default-400">Kapasitas</p>
            <p className="font-semibold flex items-center gap-1">
              <Users className="text-primary" size={14} />
              {kandang.kapasitas.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <p className="text-xs text-default-400">Ayam Hidup</p>
            <p className="font-semibold flex items-center gap-1">
              <HeartPulse className="text-success" size={14} />
              {kandang.ayamHidup.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <p className="text-xs text-default-400">Total Mortalitas</p>
            <p className="font-semibold flex items-center gap-1">
              <AlertTriangle className="text-danger" size={14} />
              {kandang.totalMortalitas.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <p className="text-xs text-default-400">% Mortalitas</p>
            <p className={`font-semibold text-${healthColor}`}>
              {kandang.persentaseMortalitas.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            className="flex-1"
            color="primary"
            size="sm"
            variant="flat"
            onClick={() => onViewDetail(kandang.kandangId)}
          >
            Lihat Detail
          </Button>

          <ExportPDFButton
            kandangId={kandang.kandangId}
            kandangNama={kandang.namaKandang}
            reportType="kesehatan"
            size="sm"
            variant="bordered"
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default KandangHealthCard;
