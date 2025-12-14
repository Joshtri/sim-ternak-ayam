import { useParams } from "@tanstack/react-router";

import HargaPasarEditForm from "@/features/harga-pasar/edit/HargaPasarEditForm";

export default function HargaPasarEditPage() {
  const { id } = useParams({ strict: false });

  if (!id) {
    return null;
  }

  return <HargaPasarEditForm id={id} />;
}
