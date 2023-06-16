import React, { useState } from 'react'
import { Outlet } from "react-router-dom"
import { Box } from '@mui/material';

//component
import Navbar from './Components/NavBar';
import SideBar from './Components/SideBar';
import SnackBar from './Components/SnackBar';


function Layout({ access, successOpen, successMessage, successStatus, successColor, setsuccessOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    //#F9F9FB
    <Box variant="div" >
      <Box className='layout' sx={{ display: 'flex',minHeight:'100vh', overFlow: 'hidden', color: '#353935',fontFamily:'poppins' }}>
        <SnackBar open={successOpen} message={successMessage} setOpen={setsuccessOpen} status={successStatus} color={successColor} />
        <Box sx={{ flexGrow: 1, minWidth: '' }}>
          <Box className='sticky-top'>
            <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          </Box>
          <Box className ='backgroundforall'>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout