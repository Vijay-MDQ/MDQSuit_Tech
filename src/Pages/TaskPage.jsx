import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container,Grow,Snackbar, Alert } from "@mui/material";
import Heading from '../Components/Heading';
import Breadcrumbs from '../Components/Breadcrumbs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TaskCreationTab from '../Components/TaskComps/TaskCreationTab';
import AssignedTaskTab from '../Components/TaskComps/AssignedTaskTab';

export default function TaskPage() {

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
    <Breadcrumbs 
    previous={'Home'}
    current={'Task'}
    link1={`/home`}
    link2={'/home/task'}
    currentSection={value !== "1" ? 'Tasks Creation' : 'Assigned Tasks'}
    
    />
    </Box>

              <Snackbar 
          open={isAddedCartSnackbarOpen} 
          autoHideDuration={1500}            
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={GrowTransition}
           onClose={handleCloseAddedCartSnackbar}>
        <Alert onClose={handleCloseAddedCartSnackbar} severity='secondary.main' variant="filled" sx={{ width: '100%' }}>
         {Notification}
        </Alert>
         </Snackbar>

    <Container>
        {
    role === 'Super Admin' ?
      <Box py={3}>
      <Heading  title={value !== "1" ? 'Tasks Creation' : 'Assigned Tasks'}/>
      </Box> 
      :
      <Box py={3}>
      <Heading  title={'Your Tasks'}/>
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
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginRight:5 }} label="Assigned Task" value="1" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft:5}} label="CREATE Task" value="2" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
                  <AssignedTaskTab setValue={setValue} setNotification={setNotification}   />
            </Box>
        </TabPanel>
        <TabPanel value="2">
            <Box>
              <TaskCreationTab setValue={setValue} isAddedCartSnackbarOpen={isAddedCartSnackbarOpen} setIsAddedCartSnackbarOpen={setIsAddedCartSnackbarOpen} setNotification={setNotification}  />
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
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft:5}} label="Assigned Task" value="1" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
             <AssignedTaskTab  />
            </Box>
        </TabPanel>
        </TabContext>
      </Box>
}

    </Container>







  </Box>
  )
}
