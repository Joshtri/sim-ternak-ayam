/**
 * Kandang Asisten Edit Page
 * Wrapper component for editing kandang assistant assignments
 */

import { KandangAsistenForm } from "../create";

interface KandangAsistenEditProps {
  id: string;
}

export function KandangAsistenEdit({ id }: KandangAsistenEditProps) {
  return <KandangAsistenForm id={id} />;
}

export default KandangAsistenEdit;
