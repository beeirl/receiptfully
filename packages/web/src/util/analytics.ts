import posthog from 'posthog-js'

export function logEvent(event: string, properties?: Record<string, unknown>) {
  if (import.meta.env.PUBLIC_STAGE !== 'production') return
  posthog.capture(event, properties)
}
