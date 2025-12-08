/// <reference types="vite/client" />

import styles from '@/styles/index.css?url'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Receiptfully' },
      {
        name: 'description',
        content: 'Create custom fake receipts for your content. Free to use, no email required.',
      },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
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
      <body className="font-medium antialiased" data-accent-color="orange" data-gray-color="zinc">
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
