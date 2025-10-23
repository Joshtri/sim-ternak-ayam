import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

import {
  useJurnalHarianList,
  useDeleteJurnalHarian,
} from "../hooks/useJurnalHarian";
import { JurnalHarianQueryParams } from "../types";

interface JurnalHarianListProps {
  params?: JurnalHarianQueryParams;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onAdd?: () => void;
}

export function JurnalHarianList({
  params,
  onEdit,
  onView,
  onAdd,
}: JurnalHarianListProps) {
  const { data: jurnals, isLoading, error } = useJurnalHarianList(params);
  const deleteMutation = useDeleteJurnalHarian();

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus jurnal ini?")) {
      deleteMutation.mutate(id);
    }
  };


  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <div className="text-danger">Error loading data</div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Jurnal Harian Petugas</h3>
        {onAdd && (
          <Button color="primary" onPress={onAdd}>
            Tambah Jurnal
          </Button>
        )}
      </CardHeader>
      <CardBody>
        {!jurnals || jurnals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Belum ada jurnal harian
          </div>
        ) : (
          <Table aria-label="Jurnal Harian Table">
            <TableHeader>
              <TableColumn>TANGGAL</TableColumn>
              <TableColumn>JUDUL KEGIATAN</TableColumn>
              <TableColumn>WAKTU</TableColumn>
              <TableColumn>KANDANG</TableColumn>
              <TableColumn>PETUGAS</TableColumn>
              <TableColumn>AKSI</TableColumn>
            </TableHeader>
            <TableBody>
              {jurnals.map(jurnal => (
                <TableRow key={jurnal.id}>
                  <TableCell>
                    {format(new Date(jurnal.tanggal), "dd MMM yyyy", {
                      locale: localeId,
                    })}
                  </TableCell>
                  <TableCell>{jurnal.judulKegiatan}</TableCell>
                  <TableCell>
                    {jurnal.waktuMulai} - {jurnal.waktuSelesai}
                    {jurnal.durasiKegiatan && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({jurnal.durasiKegiatan})
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{jurnal.namaKandang || "-"}</TableCell>
                  <TableCell>{jurnal.namaPetugas}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {onView && (
                        <Button
                          size="sm"
                          variant="light"
                          onPress={() => onView(jurnal.id)}
                        >
                          Lihat
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          color="primary"
                          size="sm"
                          variant="light"
                          onPress={() => onEdit(jurnal.id)}
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        color="danger"
                        isLoading={deleteMutation.isPending}
                        size="sm"
                        variant="light"
                        onPress={() => handleDelete(jurnal.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
}
