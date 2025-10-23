import { useParams } from "@tanstack/react-router";
import KandangAsistenEdit from "@/features/kandang-asisten/edit";

export default function KandangAsistenEditPage() {
  const { idEdit } = useParams({ strict: false });

  return <KandangAsistenEdit id={idEdit as string} />;
}
