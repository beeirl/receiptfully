import { Header } from '@/components/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="isolate min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}
