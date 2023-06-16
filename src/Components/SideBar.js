import React, { useState } from 'react';
import Logo from '../Assets/Images/logo.png';
import {
  Drawer,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';

import { Link } from 'react-router-dom'
import ResponsiveBd from './ResponsiveBd';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Inventory } from '@mui/icons-material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

function SideBar({ setMobileOpen, mobileOpen }) {

  const [open, setOpen] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);

  // const [openOne, setOpenOne] = useState(false);

  const responsive = ResponsiveBd();
  const drawerWidth = 280;
  const access = JSON.parse(localStorage.getItem('access'));
  const { role } = access;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClickThree = () => {
    setOpenThree(!openThree);
  };

  const handleClickTwo = () => {
    setOpenTwo(!openTwo);
  };

  // const handleClickOne = () => {
  //   setOpenOne(!openOne);
  // };

  
  const drawer = (<Box sx={{ height: '100%' }}>
   
    <Box sx={{ px: 3 }}>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Link to="Employee"> <img src={Logo} width="100%" alt="igreen logo" /></Link>
      </Box>
    </Box>
    <Box >
      <List sx={{ px: 1 }} >
      {role === 'Super Admin' && (
      <Link to="dashboard" className=" text-nowrap text-decoration-none fs-5 ">
          <ListItem sx={{ textAlign: 'left', borderRadius: 2, py: 1, color: '#343434' }}>
            <ListItemIcon sx={{ px: 2, color: '#343434' }}><DashboardIcon /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontWeight: 500 }}>Dashboard</Typography>
            </ListItemText>
          </ListItem>
        </Link>
      )}
        {role === 'Super Admin' && (
        <Link to="customerdetails" className=" text-nowrap text-decoration-none fs-5 ">
          <ListItem sx={{ textAlign: 'left', borderRadius: 2, py: 1, color: '#343434' }}>
            <ListItemIcon sx={{ px: 2, color: '#343434' }}><AssignmentIndIcon /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontWeight: 500 }}>Project Enquiries</Typography>
            </ListItemText>
          </ListItem>
        </Link>
        )}
        {role === 'Super Admin' && (
        <Link to="allorder" className=" text-nowrap text-decoration-none fs-5 ">
          <ListItem sx={{ textAlign: 'left', borderRadius: 2, py: 1, color: '#343434' }}>
            <ListItemIcon sx={{ px: 2, color: '#343434' }}><AssignmentTurnedInIcon /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontWeight: 500 }}>Order List</Typography>
            </ListItemText>
          </ListItem>
        </Link>
        )}
        {role === 'Super Admin' && (
        <Link to="addvendor" className=" text-nowrap text-decoration-none fs-5 ">
          <ListItem sx={{ textAlign: 'left', borderRadius: 2, py: 1, color: '#343434' }}>
            <ListItemIcon sx={{ px: 2, color: '#343434' }}><StorefrontRoundedIcon /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontWeight: 500 }}>Add Vendor</Typography>
            </ListItemText>
          </ListItem>
        </Link>
)}
        {role === 'Super Admin' && (<>
          <ListItem onClick={handleClickThree} button sx={{ textAlign: 'left', borderRadius: 2, py: 1, color: '#343434' }} >
            <ListItemIcon sx={{ px: 2, color: '#343434' }}><Inventory /></ListItemIcon>
            <ListItemText >
              <Typography component={'div'} sx={{ display: 'flex', fontWeight: 500, justifyContent: 'space-between' }} >
                <Box component={'div'} sx={{ whiteSpace: 'nowrap' }}> Inventory</Box><Box>{openThree ? <ExpandLess /> : <ExpandMore />}</Box>
              </Typography>
            </ListItemText>
          </ListItem>
          <Collapse in={openThree} timeout="auto" unmountOnExit>
            <List sx={{ px: 2 }}>
             
              {role === 'Super Admin' && (<Link to="addproduct" className=" text-nowrap text-decoration-none fs-5 ">
                <ListItem button onClick={handleDrawerToggle} sx={{ borderRadius: 2, color: '#343434' }}>
                <ListItemIcon sx={{ px: 2, color: '#343434' }}><AddCircleIcon /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontWeight: 500 }}>Add Product</Typography>
            </ListItemText>
                </ListItem>
              </Link>)}
              {role === 'Super Admin' && (<Link to="producttab" className=" text-nowrap text-decoration-none fs-5 ">
                <ListItem button onClick={handleDrawerToggle} sx={{ borderRadius: 2, color: '#343434' }}>
                <ListItemIcon sx={{ px: 2, color: '#343434' }}><ListAltIcon /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontWeight: 500 }}>Inventory List</Typography>
            </ListItemText>
                </ListItem>
              </Link>)}
              {role === 'Super Admin' && (<Link to="expense" className=" text-nowrap text-decoration-none fs-5 ">
                <ListItem onClick={handleDrawerToggle} button sx={{ borderRadius: 2, color: '#343434' }}>
                  <ListItemIcon sx={{ px: 2, color: '#343434' }}><NoteAltIcon /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontWeight: 500 }}>Expenditure</Typography>
            </ListItemText>
                </ListItem>
              </Link>)}
            </List>
          </Collapse>
        </>)}
        {role === 'Factory' && (<Link to="userorder" className=" text-nowrap text-decoration-none fs-5 ">
          <ListItem sx={{ textAlign: 'left', borderRadius: 2, py: 1, color: '#343434' }}>
            <ListItemIcon sx={{ px: 2, color: '#343434' }}><AssignmentTurnedInIcon /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontWeight: 500 }}>Orders</Typography>
            </ListItemText>
          </ListItem>
        </Link>
         )}

         {role === 'Procurement' && (
            <Link to="emporders" className=" text-nowrap text-decoration-none fs-5">
            <ListItem sx={{ textAlign: 'left', borderRadius: 2, py: 1, color: '#343434' }}>
              <ListItemIcon sx={{ px: 2, color: '#343434' }}><AssignmentTurnedInIcon /></ListItemIcon>
              <ListItemText>
                <Typography sx={{ fontWeight: 500 }}>Orders</Typography>
              </ListItemText>
            </ListItem>
          </Link>
         )}
        <Link to="logout" className=" text-nowrap text-decoration-none fs-5 ">
          <ListItem button onClick={() => localStorage.clear()} sx={{ textAlign: 'left', borderRadius: 2, py: 1, color: '#343434' }}>
            <ListItemIcon sx={{ px: 2, color: '#343434' }}><LogoutIcon /></ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontWeight: 500 }}>Logout</Typography>
            </ListItemText>
          </ListItem>
        </Link>
      </List>
    </Box>
  </Box>)
  return (
    <Box>
      <Drawer
        open={mobileOpen}
        variant={responsive ? 'temporary' : 'permanent'}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: 'block',
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#F9F9FB',
            color: '#4B4B4B'

          },
        }}
        anchor="left"
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default SideBar