export const secret = {
  DISCORD_FEEDBACK_BOT_TOKEN: new sst.Secret('DISCORD_FEEDBACK_BOT_TOKEN', process.env.DISCORD_FEEDBACK_BOT_TOKEN),
  POSTHOG_KEY: new sst.Secret('POSTHOG_KEY', process.env.POSTHOG_KEY),
}

export const allSecrets = [...Object.values(secret)]
