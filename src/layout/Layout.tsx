import { ReactNode } from 'react'
import { Box } from '@mui/material'
import OrcaMenuList from './navigation/orca-menu-list/OrcaMenuList.tsx'


interface ILayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: ILayoutProps) {

  return (
    <Box sx={{ position: 'absolute', display: 'flex', width: '100vw', height: '100vh', inset: 0 }}>
      <Box sx={{ width: '220px', inset: 0, borderRight: '1px solid black' }}>
        <Box sx={{ height: '40px', backgroundColor: 'skyblue', borderBottom: '1px solid black' }}>

        </Box>
        <Box sx={{ flex: 1, paddingX: '8px' }}>
          <OrcaMenuList/>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', inset: 0 }}>
        <Box sx={{ height: '40px', backgroundColor: 'skyblue', borderBottom: '1px solid black' }}>

        </Box>
        <Box sx={{ flex: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}