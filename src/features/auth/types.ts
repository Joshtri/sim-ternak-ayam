export interface LoginDto {
    username: string;
    password: string;
}

export interface KandangManaged {
    id: string;
    namaKandang: string;
    kapasitas: number;
    lokasi: string;
}

export interface CurrentUser {
    id?: string;
    username?: string;
    email?: string;
    fullName?: string;
    noWA?: string;
    role?: string;
    kandangsManaged?: KandangManaged[];
    createdAt?: string;
    updateAt?: string;
}

