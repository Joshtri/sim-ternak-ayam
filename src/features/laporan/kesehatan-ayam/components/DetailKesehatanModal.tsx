"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardBody, Chip } from "@heroui/react";

import { useKesehatanAyamById } from "../../hooks/useLaporan";
import { getHealthStatusColor, getHealthStatusLabel } from "../helpers";

import BaseModal from "@/components/ui/BaseModal";

export default function DetailKesehatanModal({
  kandangId,
  isOpen,
  onClose,
}: {
  kandangId: string | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data: detail, isLoading } = useKesehatanAyamById(
    kandangId || "",
    !!kandangId
  );

  if (!kandangId) return null;

  return (
    <BaseModal
      isEmpty={!isLoading && !detail}
      isLoading={isLoading}
      isOpen={isOpen}
      size="3xl"
      title="Detail Kesehatan Kandang"
      onClose={onClose}
    >
      {detail && (
        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{detail.namaKandang}</h3>
              <p className="text-default-500 flex items-center gap-1 mt-1">
                <MapPin size={16} /> {detail.lokasi}
              </p>
            </div>
            <Chip
              color={getHealthStatusColor(detail.persentaseMortalitas)}
              size="lg"
              variant="flat"
            >
              {getHealthStatusLabel(detail.persentaseMortalitas)}
            </Chip>
          </div>

          {/* Petugas Info */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-2">Petugas Bertanggung Jawab</h4>
              <p className="font-medium">{detail.namaPetugas}</p>
              <p className="text-sm text-default-500">
                @{detail.usernamePetugas}
              </p>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-sm flex items-center gap-2">
                  <Phone size={14} /> {detail.noWAPetugas || "-"}
                </span>
                <span className="text-sm flex items-center gap-2">
                  <Mail size={14} /> {detail.emailPetugas}
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Full Statistics */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-3">Statistik Lengkap</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-default-400">Kapasitas Kandang</p>
                  <p className="text-lg font-bold">
                    {detail.kapasitas.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-default-400">Total Ayam Masuk</p>
                  <p className="text-lg font-bold">
                    {detail.totalAyamMasuk.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-default-400">Ayam Hidup</p>
                  <p className="text-lg font-bold text-success">
                    {detail.ayamHidup.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-default-400">Total Mortalitas</p>
                  <p className="text-lg font-bold text-danger">
                    {detail.totalMortalitas.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-default-400">
                    Persentase Mortalitas
                  </p>
                  <p className="text-lg font-bold text-danger">
                    {detail.persentaseMortalitas.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-default-400">Tingkat Kesehatan</p>
                  <p className="text-lg font-bold text-success">
                    {detail.tingkatKesehatanPersen.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Recent Mortality Events */}
          {detail.mortalitasTerbaru && detail.mortalitasTerbaru.length > 0 && (
            <Card>
              <CardBody>
                <h4 className="font-semibold mb-3">
                  Riwayat Mortalitas Terbaru
                </h4>
                <div className="space-y-2">
                  {detail.mortalitasTerbaru.map((event, idx) => (
                    <div key={idx} className="p-3 bg-default-100 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {event.penyebabKematian}
                          </p>
                          <p className="text-sm text-default-500">
                            {new Date(event.tanggalKematian).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <Chip color="danger" size="sm" variant="flat">
                          {event.jumlahKematian} ekor
                        </Chip>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </BaseModal>
  );
}
