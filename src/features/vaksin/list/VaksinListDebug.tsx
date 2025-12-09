import { useState } from "react";
import { Tabs, Tab, Card, CardBody, Spinner, Button } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";

import { useVaksins, useDeleteVaksin } from "../hooks/useVaksin";

import { Badge } from "@/components/ui/Badge";
import { ConfirmDialog } from "@/components/ui/ListGrid/ConfirmDialog";
// import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function VaksinListDebug() {
  const [selectedTab, setSelectedTab] = useState<string>("Vaksin");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const navigate = useNavigate();
  const { data: vaksins, isLoading, error } = useVaksins();
  const deleteVaksin = useDeleteVaksin();

  console.log("🔍 Debug - API Response:", { vaksins, isLoading, error });

  const handleDeleteClick = (id: string, name: string) => {
    setItemToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      deleteVaksin.mutate(itemToDelete.id);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  // Filter berdasarkan tipe yang dipilih
  const filteredData = vaksins?.filter(item => item.tipe === selectedTab) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <p className="text-red-500">Error: {String(error)}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Daftar Vaksin & Vitamin</h1>
          <p className="text-gray-600">Total data: {vaksins?.length || 0}</p>
        </div>
        <Button
          color="primary"
          onPress={() => navigate({ to: "/daftar-vaksin-dan-vitamin/create" })}
        >
          Tambah Data
        </Button>
      </div>

      <Tabs
        aria-label="Vaksin dan Vitamin"
        color="primary"
        selectedKey={selectedTab}
        onSelectionChange={key => setSelectedTab(key as string)}
      >
        <Tab
          key="Vaksin"
          title={`Vaksin (${vaksins?.filter(v => v.tipe === "Vaksin").length || 0})`}
        />
        <Tab
          key="Vitamin"
          title={`Vitamin (${vaksins?.filter(v => v.tipe === "Vitamin").length || 0})`}
        />
      </Tabs>

      <div className="grid gap-4">
        {filteredData.length === 0 ? (
          <Card>
            <CardBody>
              <p className="text-center text-gray-500">
                Tidak ada data {selectedTab.toLowerCase()} yang ditemukan
              </p>
            </CardBody>
          </Card>
        ) : (
          filteredData.map(item => (
            <Card key={item.id}>
              <CardBody>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.namaVaksin}</h3>
                    <div className="flex gap-2 mt-2">
                      <Badge
                        color={item.tipe === "Vaksin" ? "primary" : "secondary"}
                        variant="flat"
                      >
                        {item.tipeNama || item.tipe}
                      </Badge>
                      <Badge
                        color={item.stok < 50 ? "danger" : "success"}
                        variant="flat"
                      >
                        Stok: {item.stok}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Periode: {item.bulan}/{item.tahun}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">ID: {item.id}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      color="primary"
                      size="sm"
                      variant="flat"
                      onPress={() =>
                        navigate({
                          to: "/daftar-vaksin-dan-vitamin/$id",
                          params: { id: item.id },
                        })
                      }
                    >
                      Detail
                    </Button>
                    <Button
                      color="warning"
                      size="sm"
                      variant="flat"
                      onPress={() =>
                        navigate({
                          to: "/daftar-vaksin-dan-vitamin/$idEdit/edit",
                          params: { idEdit: item.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      variant="flat"
                      onPress={() =>
                        handleDeleteClick(item.id, item.namaVaksin)
                      }
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        message={`Apakah Anda yakin ingin menghapus data "${itemToDelete?.name}"?`}
        title={`Hapus Data ${selectedTab}`}
        onClose={() => {
          setDeleteDialogOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
