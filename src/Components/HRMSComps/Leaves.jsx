import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddTab from './OnBoardTabPanels/AddTab';
import EditTab from './OnBoardTabPanels/EditTab';
import DeleteTab from './OnBoardTabPanels/DeleteTab';
import { Outlet} from 'react-router-dom';
import IconBreadcrumbs from '../Breadcrumbs';
import LeaveApproval from './LeaveTabPanels/LeaveApproval';
import ViewLeaves from './LeaveTabPanels/ViewLeaves';



export default function Leaves() {

 
  const [value, setValue] = useState("1");

  // Tab functionality
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

    const role = JSON.parse(localStorage.getItem('role'));

  return (
  <Box>

    <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'HRMS'}
    currentSection={'Leaves'}
    link1={`/home`}
    link2={'/home/HRMS'}
    
    />
    </Box>

    {/* Table Panel */}
  
 <Container>
        {
    role === 'Super Admin' ?
    <Box>
    <TabContext value={value}>
      <Box>
          <TabList
          variant="scrollable"
          scrollButtons='auto'
          onChange={handleChange} aria-label="tabs">
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginRight:5 }} label="Leave Approval" value="1" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft:5}} label="View Leaves" value="2" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
                  <LeaveApproval  />
            </Box>
        </TabPanel>
        <TabPanel value="2">
            <Box>
              <ViewLeaves />
            </Box>
        </TabPanel>
        </TabContext>
      </Box>
      :
          <Box>
    <TabContext value={value}>
      <Box>
          <TabList
          variant="scrollable"
          scrollButtons='auto'
          onChange={handleChange} aria-label="tabs">
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginRight:5 }} label="Leave Application" value="1" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft:5}} label="View Leaves" value="2" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
                  <LeaveApproval  />
            </Box>
        </TabPanel>
        <TabPanel value="2">
            <Box>
              <ViewLeaves />
            </Box>
        </TabPanel>
        </TabContext>
      </Box>
}

    </Container>

  














  </Box>
  )
}
