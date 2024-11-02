import { FC, ReactNode, useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps, DialogProps,
  DialogTitle,
  DialogTitleProps
} from '@mui/material'
import Wrapper from '../../Wrapper'
import Button from '../../atomic/Button'

export interface IDialogSlot {
  title?: ReactNode
  content?: ReactNode
  actions?: ReactNode
}

export interface IDialogProps {
  boxProps?: DialogProps,
  titleProps?: DialogTitleProps,
  contentProps?: DialogContentProps,
  actionsProps?: DialogActionsProps
  showDefaultActions?: boolean
}

export const DialogSender: FC = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [slot, setSlot] = useState<IDialogSlot>({})
  const [dialogProps, setDialogProps] = useState<IDialogProps>({
    showDefaultActions: true
  })

  function sendDialog(slot: IDialogSlot, props: IDialogProps = dialogProps) {
    setSlot(slot)
    setDialogProps(props)
    setDialogOpen(true)
  }

  useEffect(() => {
    window.dialog = sendDialog
    return () => {
      delete window.dialog
    }
  }, [])

  return (
    <Wrapper>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        {...dialogProps.boxProps}>
        {
          slot?.title &&
          <DialogTitle {...dialogProps.titleProps}>{slot.title}</DialogTitle>
        }
        {
          slot?.content &&
          <DialogContent {...dialogProps.contentProps}>{slot.content}</DialogContent>
        }
        {
          slot?.actions &&
          <DialogActions {...dialogProps.actionsProps}>
            {dialogProps.showDefaultActions &&
              <Button variant="outlined" color="info" onClick={() => setDialogOpen(false)}>取消</Button>}
            {slot.actions}
          </DialogActions>
        }
      </Dialog>
    </Wrapper>
  )
}