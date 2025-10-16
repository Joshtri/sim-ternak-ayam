import {
  Card,
  CardHeader,
  Chip,
  CardBody,
  Progress,
  Button,
} from "@heroui/react";
import { Activity, AlertTriangle, Building2, Users } from "lucide-react";

import { Produktivitas } from "../../types";
import { getPerformanceColor, getProductivityColor } from "../helpers";

function PetugasPerformanceCard({
  petugas,
  onViewDetail,
}: {
  petugas: Produktivitas;
  onViewDetail: (id: string) => void;
}) {
  const ratingColor = getPerformanceColor(petugas.ratingPerforma);
  const scoreColor = getProductivityColor(petugas.skorProduktivitas);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-col gap-2 pb-4">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="text-lg font-bold">{petugas.namaPetugas}</h3>
            <p className="text-sm text-default-500">@{petugas.username}</p>
          </div>
          <Chip color={ratingColor} variant="flat">
            {petugas.ratingPerforma}
          </Chip>
        </div>
      </CardHeader>

      <CardBody className="space-y-4">
        {/* Productivity Score */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Skor Produktivitas</span>
            <span className={`text-sm font-bold text-${scoreColor}`}>
              {petugas.skorProduktivitas.toFixed(0)}
            </span>
          </div>
          <Progress
            className="max-w-full"
            color={scoreColor}
            size="sm"
            value={petugas.skorProduktivitas}
          />
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-divider">
          <div>
            <p className="text-xs text-default-400">Kandang Dikelola</p>
            <p className="font-semibold flex items-center gap-1">
              <Building2 className="text-primary" size={14} />
              {petugas.totalKandang}
            </p>
          </div>
          <div>
            <p className="text-xs text-default-400">Total Operasional</p>
            <p className="font-semibold flex items-center gap-1">
              <Activity className="text-success" size={14} />
              {petugas.totalOperasional}
            </p>
          </div>
          <div>
            <p className="text-xs text-default-400">Ayam Dikelola</p>
            <p className="font-semibold flex items-center gap-1">
              <Users className="text-warning" size={14} />
              {petugas.totalAyamDikelola.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <p className="text-xs text-default-400">Mortalitas</p>
            <p className="font-semibold flex items-center gap-1">
              <AlertTriangle className="text-danger" size={14} />
              {petugas.rataMortalitasPersen.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* View Detail Button */}
        <Button
          fullWidth
          color="primary"
          size="sm"
          variant="flat"
          onPress={() => onViewDetail(petugas.petugasId)}
        >
          Lihat Detail
        </Button>
      </CardBody>
    </Card>
  );
}

export default PetugasPerformanceCard;
