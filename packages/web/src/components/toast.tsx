import { Toast } from '@beeirl/ui/toast'

export const toastManager = Toast.createManager()

export function ToastManager() {
  return <Toast.Manager manager={toastManager} />
}
