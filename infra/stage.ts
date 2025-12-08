export const domain = (() => {
  if ($app.stage === 'production') return 'receiptfully.com'
  if ($app.stage === 'dev') return 'dev.receiptfully.com'
  return `${$app.stage}.dev.receiptfully.com`
})()
