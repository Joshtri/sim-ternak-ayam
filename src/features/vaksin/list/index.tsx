import type { Vaksin } from "../types";

import { useState } from "react";
import { Tabs, Tab } from "@heroui/react";

import { useDeleteVaksin, useVaksins } from "../hooks/useVaksin";

import { ListGrid } from "@/components/ui/ListGrid";
import { Badge } from "@/components/ui/Badge";

export default function VaksinList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("Vaksin"); // "Vaksin" or "Vitamin"

  const { data: vaksins, isLoading } = useVaksins();

  const deleteVaksin = useDeleteVaksin();

  const columns = [
    {
      key: "namaVaksin",
      label: "Nama",
      value: (item: Vaksin) => item.namaVaksin,
    },
    {
      key: "tipe",
      label: "Tipe",
      value: (item: Vaksin) => (
        <Badge
          color={item.tipeNama === "Vaksin" ? "primary" : "secondary"}
          variant="flat"
        >
          {item.tipeNama || "Unknown"}
        </Badge>
      ),
    },
    {
      key: "stokTersisa",
      label: "Sisa Stok",
      value: (item: Vaksin) => {
        const sisa = item.stokTersisa ?? item.stok;
        const status = item.statusStok || "";

        let color: "success" | "warning" | "danger" | "default" = "default";

        // Logic warna berdasarkan Level
        if (status.includes("Level 3")) color = "success";
        else if (status.includes("Level 2")) color = "warning";
        else if (status.includes("Level 1") || status.includes("Level 0"))
          color = "danger";
        // Fallback backward compatibility
        else if (status === "Aman") color = "success";
        else if (status === "Menipis") color = "warning";
        else if (status === "Kritis" || status === "Habis") color = "danger";

        return (
          <Badge color={color} variant="flat">
            {sisa.toLocaleString("id-ID")} unit
          </Badge>
        );
      },
    },
    // {
    //   key: "stokTerpakai",
    //   label: "Terpakai",
    //   value: (item: Vaksin) =>
    //     `${(item.stokTerpakai ?? 0).toLocaleString("id-ID")} unit`,
    // },
    {
      key: "statusStok",
      label: "Status",
      value: (item: Vaksin) => {
        if (!item.statusStok) return "-";

        const status = item.statusStok;
        let color: "success" | "warning" | "danger" | "default" = "default";

        // Logic warna berdasarkan Level
        if (status.includes("Level 3")) color = "success";
        else if (status.includes("Level 2")) color = "warning";
        else if (status.includes("Level 1") || status.includes("Level 0"))
          color = "danger";
        // Fallback backward compatibility
        else if (status === "Aman") color = "success";
        else if (status === "Menipis") color = "warning";
        else if (status === "Kritis" || status === "Habis") color = "danger";

        return (
          <Badge color={color} variant="solid">
            {item.statusStok}
          </Badge>
        );
      },
    },
    {
      key: "periode",
      label: "Periode",
      value: (item: Vaksin) => `${item.bulan}/${item.tahun}`,
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Filter data based on search query and selected tab
  const filteredData =
    vaksins?.filter(item => {
      // Filter by type based on selected tab
      if (item.tipeNama !== selectedTab) return false;

      // Filter by search query
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();

      return (
        item.namaVaksin?.toLowerCase().includes(query) ||
        item.tipeNama?.toLowerCase().includes(query)
      );
    }) || [];

  return (
    <div className="space-y-4">
      <Tabs
        aria-label="Vaksin dan Vitamin"
        color="primary"
        selectedKey={selectedTab}
        onSelectionChange={key => setSelectedTab(key as string)}
      >
        <Tab key="Vaksin" title="Vaksin" />
        <Tab key="Vitamin" title="Vitamin" />
      </Tabs>

      <ListGrid
        actionButtons={{
          show: {
            href: (id: string) => `/daftar-vaksin-dan-vitamin/${id}`,
            label: "Detail",
          },
          edit: {
            href: (id: string) => `/daftar-vaksin-dan-vitamin/${id}/edit`,
            label: "Edit",
          },
          delete: {
            onDelete: (id: string) => deleteVaksin.mutate(id),
            label: "Hapus",
          },
        }}
        addButton={{
          href: "/daftar-vaksin-dan-vitamin/create",
          label: `Tambah Data ${selectedTab}`,
        }}
        columns={columns}
        data={filteredData}
        deleteConfirmMessage={(item: Vaksin) =>
          `Apakah Anda yakin ingin menghapus data "${item.namaVaksin}"?`
        }
        deleteConfirmTitle={`Hapus Data ${selectedTab}`}
        description={`Kelola data ${selectedTab.toLowerCase()} ayam broiler`}
        keyField="id"
        loading={isLoading}
        nameField="namaVaksin"
        pageSize={10}
        searchPlaceholder={`Cari berdasarkan nama ${selectedTab.toLowerCase()}...`}
        showPagination={true}
        title={`Data ${selectedTab}`}
        onSearch={value => setSearchQuery(value)}
      />
    </div>
  );
}
