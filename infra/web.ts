export const web = new sst.cloudflare.x.SolidStart('Web', {
  path: 'packages/web',
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
