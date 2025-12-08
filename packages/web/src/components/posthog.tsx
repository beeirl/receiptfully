import { PostHogProvider as Provider } from 'posthog-js/react'
import * as React from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (import.meta.env.PUBLIC_STAGE !== 'production') {
    return children
  }

  return (
    <Provider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{ api_host: 'https://eu.i.posthog.com', defaults: '2025-11-30' }}
    >
      {children}
    </Provider>
  )
}
