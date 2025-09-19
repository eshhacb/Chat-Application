import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { Box } from '@mui/material'

const HomePage = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      height: { xs: '450px', md: '550px' },
      borderRadius: 2,
      overflow: 'hidden',
      backgroundColor: 'background.paper',
      boxShadow: 3
    }}>
      <Sidebar/>
      <MessageContainer/>
    </Box>
  )
}

export default HomePage