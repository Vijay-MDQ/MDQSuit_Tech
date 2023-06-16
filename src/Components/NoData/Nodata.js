import React from 'react'
import nodata from './nodata.png'
import { Box, Typography } from '@mui/material';


function Nodata() {
  return (
    <Box sx={{textAlign:'center'}}>
       <Box>
       <img src={nodata} className='h-50 w-50' alt='no data' />
       </Box>
        <Typography variant='p' sx={{fontWeight:600,fontSize:20,color:'primary.main'}}>No Data Found</Typography>
    </Box>
  )
}

export default Nodata