/// <reference types="vite/client" />

import { PostHogProvider } from '@/components/posthog'
import { SnackbarManager } from '@/components/snackbar'
import { ToastManager } from '@/components/toast'
import styles from '@/styles/index.css?url'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Receiptfully - Free Receipt Generator' },
      {
        name: 'description',
        content: 'Create custom receipts for your business. Free to use, no email required.',
      },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&family=Courier+Prime&display=swap',
      },
      { rel: 'stylesheet', href: styles },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-medium antialiased" data-accent-color="blue" data-gray-color="zinc">
        <PostHogProvider>
          <Outlet />
          <SnackbarManager />
          <ToastManager />
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  )
}
