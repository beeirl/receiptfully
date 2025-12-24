import { Header } from '@/components/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="isolate">
      <Header />
      <div className="mx-auto flex w-full max-w-5xl flex-col justify-between px-8 pt-16 md:px-12 lg:px-16">
        <Outlet />
      </div>
    </div>
  )
}
