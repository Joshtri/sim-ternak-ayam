export interface LaporanOperasionalResponse {
  periode: string;
  tanggalMulai: string;
  tanggalSelesai: string;

  totalOperasional: number;
  totalKandang: number;
  totalPetugas: number;

  detailPerJenis: {
    namaJenisKegiatan: string;
    jumlahKegiatan: number;
    totalJumlah: number;
  }[];

  detailPerKandang: {
    namaKandang: string;
    lokasi: string;
    namaPetugas: string;
    jumlahOperasional: number;
  }[];

  detailPerPetugas: {
    namaPetugas: string;
    username: string;
    jumlahOperasional: number;
    kandangDikelola: string[];
  }[];
}
