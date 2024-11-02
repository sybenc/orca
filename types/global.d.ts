import { ReactNode } from 'react'
import { IDialogProps, IDialogSlot } from '@orca/ui'

declare global {
  // message、dialog将被挂载到window上，可以直接调用
  let message: (message: ReactNode, severity: Severity ,props?: IMessageProps) => void
  let dialog: (slot: IDialogSlot, props?: IDialogProps) => void

  interface Window {
    message?:(message: ReactNode, severity: Severity ,props?: IMessageProps) => void
    dialog?: (slot: IDialogSlot, props?: IDialogProps) => void
  }

  type Severity = 'error' | 'info' | 'warning' | 'success'
}