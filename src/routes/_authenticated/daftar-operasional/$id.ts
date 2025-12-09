import OperasionalShowPage from '@/pages/operasional/show'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/daftar-operasional/$id')({
  component: OperasionalShowPage,
})
 