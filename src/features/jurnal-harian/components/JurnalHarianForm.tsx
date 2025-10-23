import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
} from "@heroui/react";

import {
  useCreateJurnalHarian,
  useUpdateJurnalHarian,
} from "../hooks/useJurnalHarian";
import { CreateJurnalHarianDto, JurnalHarian } from "../types";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { CurrentUser } from "@/features/auth/types";

interface JurnalHarianFormProps {
  jurnal?: JurnalHarian;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function JurnalHarianForm({
  jurnal,
  onSuccess,
  onCancel,
}: JurnalHarianFormProps) {
  const isEditMode = !!jurnal;
  const createMutation = useCreateJurnalHarian();
  const updateMutation = useUpdateJurnalHarian();

  // Get current user data (includes kandangId)
  const { data: currentUser } = useCurrentUser<CurrentUser>();

  const [formData, setFormData] = useState<Partial<CreateJurnalHarianDto>>({
    tanggal: jurnal?.tanggal || new Date().toISOString(),
    judulKegiatan: jurnal?.judulKegiatan || "",
    deskripsiKegiatan: jurnal?.deskripsiKegiatan || "",
    waktuMulai: jurnal?.waktuMulai || "",
    waktuSelesai: jurnal?.waktuSelesai || "",
    kandangId: jurnal?.kandangId || "",
    catatan: jurnal?.catatan || "",
    // fotoKegiatan: jurnal?.fotoKegiatan || "", // Commented out due to backend conversion error
  });

  // const [photoFile, setPhotoFile] = useState<File | null>(null); // Commented out due to backend conversion error

  // Auto-fill kandangId from current user (ambil kandang pertama dari array)
  useEffect(() => {
    if (currentUser?.kandangsManaged && currentUser.kandangsManaged.length > 0 && !jurnal) {
      const firstKandang = currentUser.kandangsManaged[0];
      setFormData(prev => ({ ...prev, kandangId: firstKandang.id }));
    }
  }, [currentUser, jurnal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi: kandangId harus terisi
    if (!formData.kandangId || formData.kandangId.trim() === "") {
      alert("Kandang ID tidak terisi. Pastikan Anda sudah di-assign ke kandang.");
      return;
    }

    if (isEditMode) {
      updateMutation.mutate(
        { id: jurnal.id, data: formData },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      // Jika ada foto, gunakan FormData (endpoint with-photo)
      // if (photoFile) { // Commented out due to backend conversion error
      //   const formDataWithPhoto = new FormData();
      //   formDataWithPhoto.append("tanggal", formData.tanggal!);
      //   formDataWithPhoto.append("judulKegiatan", formData.judulKegiatan!);
      //   formDataWithPhoto.append("deskripsiKegiatan", formData.deskripsiKegiatan!);
      //   formDataWithPhoto.append("waktuMulai", formData.waktuMulai!);
      //   formDataWithPhoto.append("waktuSelesai", formData.waktuSelesai!);
      //   formDataWithPhoto.append("kandangId", formData.kandangId!);
      //   if (formData.catatan) formDataWithPhoto.append("catatan", formData.catatan);
      //   // formDataWithPhoto.append("fotoKegiatan", photoFile); // Commented out due to backend conversion error

      //   createMutation.mutate(formDataWithPhoto as any, {
      //     onSuccess: () => {
      //       onSuccess?.();
      //     },
      //   });
      // } else {
        // Tanpa foto, gunakan endpoint biasa
        createMutation.mutate(formData as CreateJurnalHarianDto, {
          onSuccess: () => {
            onSuccess?.();
          },
        });
      // }
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;
  const hasKandangId = !!formData.kandangId;

  // Get kandang info untuk display
  const kandangInfo = currentUser?.kandangsManaged?.[0];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {isEditMode ? "Edit Jurnal Harian" : "Tambah Jurnal Harian"}
        </h3>
      </CardHeader>
      <CardBody>
        {!hasKandangId && !isEditMode && (
          <div className="mb-4 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <p className="text-warning-800 text-sm font-medium">
              ⚠️ Anda belum di-assign ke kandang manapun.
            </p>
            <p className="text-warning-700 text-xs mt-1">
              Silakan hubungi Operator/Pemilik untuk assign Anda ke kandang terlebih dahulu.
            </p>
          </div>
        )}

        {kandangInfo && (
          <div className="mb-4 p-3 bg-success-50 border border-success-200 rounded-lg">
            <p className="text-success-800 text-sm font-medium">
              ✓ Kandang: {kandangInfo.namaKandang}
            </p>
            <p className="text-success-700 text-xs mt-1">
              Lokasi: {kandangInfo.lokasi} | Kapasitas: {kandangInfo.kapasitas.toLocaleString()} ekor
            </p>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Tanggal"
            type="datetime-local"
            value={formData.tanggal}
            onChange={e =>
              setFormData({ ...formData, tanggal: e.target.value })
            }
          />

          <Input
            isRequired
            label="Judul Kegiatan"
            placeholder="Masukkan judul kegiatan"
            value={formData.judulKegiatan}
            onChange={e =>
              setFormData({ ...formData, judulKegiatan: e.target.value })
            }
          />

          <Textarea
            isRequired
            label="Deskripsi Kegiatan"
            minRows={4}
            placeholder="Masukkan deskripsi kegiatan"
            value={formData.deskripsiKegiatan}
            onChange={e =>
              setFormData({ ...formData, deskripsiKegiatan: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              isRequired
              label="Waktu Mulai"
              placeholder="Contoh: 08:00"
              type="time"
              value={formData.waktuMulai}
              onChange={e =>
                setFormData({ ...formData, waktuMulai: e.target.value })
              }
            />

            <Input
              isRequired
              label="Waktu Selesai"
              placeholder="Contoh: 10:00"
              type="time"
              value={formData.waktuSelesai}
              onChange={e =>
                setFormData({ ...formData, waktuSelesai: e.target.value })
              }
            />
          </div>

          <Input
            isReadOnly
            color={hasKandangId ? "success" : "default"}
            description={
              kandangInfo
                ? `Auto-filled: ${kandangInfo.namaKandang}`
                : "Kandang ID akan otomatis terisi"
            }
            label="Kandang ID (Auto)"
            placeholder="Auto-filled dari profil"
            value={formData.kandangId || ""}
          />

          <Textarea
            label="Catatan"
            minRows={3}
            placeholder="Catatan tambahan (opsional)"
            value={formData.catatan || ""}
            onChange={e =>
              setFormData({ ...formData, catatan: e.target.value })
            }
          />

          {/* {!isEditMode && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Foto Kegiatan (opsional)
              </label>
              <input
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-600"
                type="file"
                onChange={e => setPhotoFile(e.target.files?.[0] || null)}
              />
            </div>
          )} */}

          <div className="flex gap-2 justify-end">
            {onCancel && (
              <Button isDisabled={isLoading} variant="light" onPress={onCancel}>
                Batal
              </Button>
            )}
            <Button
              color="primary"
              isDisabled={!hasKandangId || isLoading}
              isLoading={isLoading}
              type="submit"
            >
              {isEditMode ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
