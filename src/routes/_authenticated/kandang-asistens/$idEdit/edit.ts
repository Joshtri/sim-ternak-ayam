import { createFileRoute } from '@tanstack/react-router'
import KandangAsistenEditPage from '@/pages/kandang-asistens/edit'

export const Route = createFileRoute(
  '/_authenticated/kandang-asistens/$idEdit/edit',
)({
  component: KandangAsistenEditPage,
})
 