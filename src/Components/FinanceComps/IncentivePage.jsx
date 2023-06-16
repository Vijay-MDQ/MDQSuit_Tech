import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container,Grow,Snackbar, Alert } from "@mui/material";
import Heading from '../../Components/Heading';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TaskCreationTab from '../../Components/TaskComps/TaskCreationTab';
import AssignedTaskTab from '../../Components/TaskComps/AssignedTaskTab';
import IconBreadcrumbs from '../../Components/Breadcrumbs';
import IncentiveSection from './IncentivePageTab/IncentiveSection';
import CreateIncentive from './IncentivePageTab/CreateIncentive';

export default function IncentivePage() {

  const [value, setValue] = useState("1");
   const [isAddedCartSnackbarOpen, setIsAddedCartSnackbarOpen] = useState(false);
   const [Notification, setNotification] = useState("");
  // Tab functionality
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

         const handleCloseAddedCartSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAddedCartSnackbarOpen(false);
  };

    function GrowTransition(props) {
    return <Grow {...props} direction="up" />;
  }


    const role = JSON.parse(localStorage.getItem('role'));

  return (
    <Box>

    <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'Finance'}
    link1={`/home`}
    link2={'/home/finance'}
    currentSection={value === "1" ? 'Create Incentives' : 'All Incentives'}
    />
    </Box>

          <Snackbar 
          open={isAddedCartSnackbarOpen} 
          autoHideDuration={1500}            
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={GrowTransition}
           onClose={handleCloseAddedCartSnackbar}>
        <Alert onClose={handleCloseAddedCartSnackbar} severity='info' variant="filled" sx={{ width: '100%' }}>
         {Notification}
        </Alert>
         </Snackbar>

    <Container>
        {
    role === 'Super Admin' ?
      <Box py={3}>
      <Heading  title={value === "1" ? 'Create Incentives' : 'All Incentives'}/>
      </Box> 
      :
      <Box py={3}>
      <Heading  title={'Your Incentives'}/>
      </Box> 
     }
    </Container>


    <Container>
        {
    role === 'Super Admin' ?
    <Box sx={{ p: 3 }}>
    <TabContext value={value}>
      <Box>
          <TabList
          variant="scrollable"
          scrollButtons='auto'
          onChange={handleChange} aria-label="tabs">
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginRight:5 }} label="Create Incentive" value="1" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft:5}} label="All Incentives" value="2" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
                  <CreateIncentive setValue={setValue} isAddedCartSnackbarOpen={isAddedCartSnackbarOpen} setIsAddedCartSnackbarOpen={setIsAddedCartSnackbarOpen} setNotification={setNotification}   />
            </Box>
        </TabPanel>
        <TabPanel value="2">
            <Box>
              <IncentiveSection  />
            </Box>
        </TabPanel>
        </TabContext>
      </Box>
            :
          <Box sx={{ p: 3 }}>
    <TabContext value={value}>
      <Box>
          <TabList
          variant="scrollable"
          scrollButtons='auto'
          onChange={handleChange} aria-label="tabs">
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft:5}} label="Your Incentives" value="1" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
             <IncentiveSection  />
            </Box>
        </TabPanel>
        </TabContext>
      </Box>
}

    </Container>







  </Box>
  )
}
