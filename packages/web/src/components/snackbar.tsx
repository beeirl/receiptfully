import { Snackbar } from '@beeirl/ui/snackbar'

export const snackbarManager = Snackbar.createManager()

export function SnackbarManager() {
  return <Snackbar.Manager manager={snackbarManager} />
}
