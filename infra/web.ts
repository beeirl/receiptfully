import { allSecrets, secret } from './secret'
import { domain } from './stage'

export const web = new sst.cloudflare.x.SolidStart('Web', {
  path: 'packages/web',
  link: [...allSecrets],
  environment: {
    VITE_PUBLIC_POSTHOG_KEY: secret.POSTHOG_KEY.value,
    VITE_PUBLIC_STAGE: $app.stage,
  },
  domain,
  transform: {
    server: {
      transform: {
        worker: {
          placement: { mode: 'smart' },
        },
      },
    },
  },
})
