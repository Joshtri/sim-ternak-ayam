interface ProfilePetugasProps {
  user: any;
}

export default function ProfilePetugas({ user }: ProfilePetugasProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Petugas</h2>

      <div>
        <p className="text-sm text-default-500">No. WA</p>
        <p className="font-medium">{user?.noWA ?? "-"}</p>
      </div>

      <div>
        <p className="text-sm text-default-500">Role</p>
        <p className="font-medium">{user?.role ?? "-"}</p>
      </div>

      {/* Placeholder for assigned kandangs or other petugas-specific data */}
      <div>
        <p className="text-sm text-default-500">Kandang</p>
        <p className="font-medium">Belum tersedia</p>
      </div>
    </div>
  );
}
