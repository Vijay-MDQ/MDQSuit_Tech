import React from 'react'
import { Box } from '@mui/material';


function Statusloader() {
  return (
    <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center',height:'80vh',zIndex: (theme) => theme.zIndex.drawer + 1  }}>
         <img src={require('../Assets/loader.gif')} width='150' height='150' alt="loading..." />
      </Box>
  )
}

export default Statusloader