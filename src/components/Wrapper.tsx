import { ReactNode } from "react"

interface IWrapperProps {
  children?: ReactNode
}

export default function Wrapper({ children }: IWrapperProps) {
  return <>{children}</>
}