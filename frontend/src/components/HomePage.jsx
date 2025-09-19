import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { Box } from '@mui/material'

const HomePage = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh',
      width: '100vw',
      backgroundColor: 'background.paper',
      overflow: 'hidden'
    }}>
      <Sidebar/>
      <MessageContainer/>
    </Box>
  )
}

export default HomePage