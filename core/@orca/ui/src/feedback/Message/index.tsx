import { FC, ReactNode, useEffect, useState } from 'react'
import { Snackbar, SnackbarProps } from '@mui/material'
import { Wrapper } from '../../index.ts'
import Alert from '../Alert'
import { Queue } from '@squirrel/queue'

type IMessageProps = Omit<SnackbarProps, 'message'>

interface IMessage {
  message: ReactNode;
  severity: Severity;
  props: IMessageProps;
}

export const MessageSender: FC = () => {
  const queue = new Queue<IMessage>()
  const [open, setOpen] = useState<boolean>()
  const [messageNode, setMessageNode] = useState<ReactNode>('')
  const [messageSeverity, setMessageSeverity] = useState<Severity>('info')
  const [messageProps, setMessageProps] = useState<IMessageProps>({
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    autoHideDuration: 2000
  })

  function send(message: ReactNode, severity: Severity, props: IMessageProps = messageProps) {
    setMessageProps(props)
    setMessageNode(message)
    setMessageSeverity(severity)
    setOpen(true)
  }

  function closeMessage() {
    queue.dequeue()
    setOpen(false)
  }

  useEffect(() => {
    window.message = send
    return () => {
      delete window.message
    }
  }, [])

  return (
    <Wrapper>
      <Snackbar
        open={open}
        onClose={closeMessage}
        {...messageProps}
      >
        {
          <Alert variant="standard"
                 sx={{ width: '100%' }}
                 severity={messageSeverity}>
            {messageNode}
          </Alert>
        }
      </Snackbar>
    </Wrapper>
  )
}