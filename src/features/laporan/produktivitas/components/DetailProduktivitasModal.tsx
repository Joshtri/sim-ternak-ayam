"use client";

import { Card, CardBody, Chip } from "@heroui/react";

import { useProduktivitasById } from "../../hooks/useLaporan";
import { getPerformanceColor } from "../helpers";

import BaseModal from "@/components/ui/BaseModal";

interface DetailProduktivitasModalProps {
  petugasId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailProduktivitasModal({
  petugasId,
  isOpen,
  onClose,
}: DetailProduktivitasModalProps) {
  const { data: detail, isLoading } = useProduktivitasById(
    petugasId || "",
    !!petugasId
  );

  if (!petugasId) return null;

  return (
    <BaseModal
      isEmpty={!isLoading && !detail}
      isLoading={isLoading}
      isOpen={isOpen}
      size="3xl"
      title="Detail Produktivitas Petugas"
      onClose={onClose}
    >
      {detail && (
        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{detail.namaPetugas}</h3>
              <p className="text-default-500">@{detail.username}</p>
              <p className="text-sm text-default-400">{detail.email}</p>
            </div>
            <div className="text-right">
              <Chip
                color={getPerformanceColor(detail.ratingPerforma)}
                size="lg"
                variant="flat"
              >
                {detail.ratingPerforma}
              </Chip>
              <p className="text-sm text-default-500 mt-2">
                Skor: {detail.skorProduktivitas.toFixed(0)}
              </p>
            </div>
          </div>

          {/* Summary Statistics */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-3">Ringkasan Produktivitas</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-default-400">Total Kandang</p>
                  <p className="text-xl font-bold">{detail.totalKandang}</p>
                </div>
                <div>
                  <p className="text-sm text-default-400">Total Operasional</p>
                  <p className="text-xl font-bold">{detail.totalOperasional}</p>
                </div>
                <div>
                  <p className="text-sm text-default-400">Ayam Dikelola</p>
                  <p className="text-xl font-bold">
                    {detail.totalAyamDikelola.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-default-400">
                    Rata-rata Mortalitas
                  </p>
                  <p className="text-xl font-bold text-danger">
                    {detail.rataMortalitasPersen.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Kandang Details */}
          <Card>
            <CardBody>
              <h4 className="font-semibold mb-3">Detail Kandang Dikelola</h4>
              <div className="space-y-3">
                {detail.kandangDikelola.map(kandang => (
                  <div
                    key={kandang.kandangId}
                    className="p-4 bg-default-100 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="font-semibold">{kandang.namaKandang}</h5>
                        <p className="text-sm text-default-500">
                          {kandang.lokasi}
                        </p>
                      </div>
                      <Chip
                        color={
                          kandang.persentaseMortalitas < 5
                            ? "success"
                            : kandang.persentaseMortalitas < 10
                              ? "warning"
                              : "danger"
                        }
                        size="sm"
                        variant="flat"
                      >
                        {kandang.persentaseMortalitas.toFixed(2)}% mortalitas
                      </Chip>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-default-400">Kapasitas</p>
                        <p className="text-sm font-semibold">
                          {kandang.kapasitas.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-default-400">Total Ayam</p>
                        <p className="text-sm font-semibold">
                          {kandang.totalAyam.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-default-400">Operasional</p>
                        <p className="text-sm font-semibold">
                          {kandang.totalOperasional}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-default-400">Pengisian</p>
                        <p className="text-sm font-semibold">
                          {kandang.tingkatPengisianPersen.toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    {kandang.tanggalOperasionalTerakhir && (
                      <div className="mt-2 pt-2 border-t border-divider">
                        <p className="text-xs text-default-400">
                          Operasional terakhir: {kandang.jenisKegiatanTerakhir}{" "}
                          •{" "}
                          {new Date(
                            kandang.tanggalOperasionalTerakhir
                          ).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                {detail.kandangDikelola.length === 0 && (
                  <p className="text-center text-default-500 py-4">
                    Belum mengelola kandang
                  </p>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </BaseModal>
  );
}
