import { AppBar, Box, Grid, IconButton, InputAdornment, TextField, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import ResponsiveBd from './ResponsiveBd';
import FindInPageIcon from '@mui/icons-material/FindInPage'; 
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Form, Image } from "react-bootstrap";
import logo from '../Assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';

function NavBar({ mobileOpen, setMobileOpen }) {

const navigate = useNavigate();
 const user = JSON.parse(localStorage.getItem('user'));
 const { username } = user;
 const responsive = ResponsiveBd()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 const logout = () =>{
    navigate('logout');
    localStorage.clear()
 }

 const openProfile = () =>{
    navigate('HRMS/profile');
 }

  const openTask = () =>{
    navigate('Task');
 }

  const openAnnounce = () =>{
    navigate('announcement');
 }

  return (
    //#e6ffe6
    <Box sx={{ width: '100%' }}>
      <AppBar position="sticky" sx={{ py: 1, width: '100%', bgcolor: '#F9F9FB',color:'black' , boxShadow:1 }}>
        <Toolbar>
      <Grid container rowSpacing={{xs:4}}>
      <Grid item sm={5} xs={12} md={3} lg={3} xl={3} display='flex' justifyContent={{xl:'start', lg:'start', md:'start', sm:'start', xs:'center'}}>
              <img src='https://www.mdqualityapps.com/logos/MDQualityapps.png'  style={{objectFit:'contain', height:'15vh'}} alt="igreen logo"/>
      </Grid>

      <Grid item sm={4} xs={6} md={6} lg={6} xl={6} display='flex' alignItems='center' justifyContent={{xl:'center', lg:'center', md:'center', sm:'center', xs:'start'}}>
        <Box>
        <Typography variant='h4' fontWeight={600}>MDSuit</Typography>
        </Box>
      </Grid>

      <Grid item sm={3} xs={6} md={3} lg={3} xl={3}  justifyContent='end' display='flex' flexDirection='row' alignItems='center'>
        <AddCircleIcon  sx={{color:'#616e80', verticalAlign:'middle', mr:2 , cursor:'pointer'}} onClick={openTask}  />
        <NotificationsIcon sx={{color:'#616e80', verticalAlign:'middle', mr:2 , cursor:'pointer'}} onClick={openAnnounce}  />
        <PersonIcon sx={{color:'#616e80', verticalAlign:'middle', mr:2 , cursor:'pointer'}} onClick={openProfile} />
        <PowerSettingsNewIcon  sx={{color:'#616e80', verticalAlign:'middle', mr:2 , cursor:'pointer'}} onClick={logout} />
      </Grid>
    
     </Grid>
          
        </Toolbar>
      
        </AppBar>
    </Box>
  )
}

export default NavBar