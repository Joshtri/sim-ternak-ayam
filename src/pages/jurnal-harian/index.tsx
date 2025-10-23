import { useState } from "react";
// import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";

import {
  JurnalHarianList,
  JurnalHarianForm,
} from "@/features/jurnal-harian/components";
import { useJurnalHarianDetail } from "@/features/jurnal-harian/hooks/useJurnalHarian";

export default function JurnalHarianPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: editingJurnal } = useJurnalHarianDetail(editingId || "");

  const handleAdd = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Jurnal Harian Petugas</h1>
      </div> */}

      <JurnalHarianList onAdd={handleAdd} onEdit={handleEdit} />

      <Modal
        isOpen={isFormOpen}
        scrollBehavior="inside"
        size="2xl"
        onClose={() => setIsFormOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            {editingId ? "Edit Jurnal Harian" : "Tambah Jurnal Harian"}
          </ModalHeader>
          <ModalBody>
            <JurnalHarianForm
              jurnal={editingJurnal}
              onCancel={() => setIsFormOpen(false)}
              onSuccess={handleFormSuccess}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
