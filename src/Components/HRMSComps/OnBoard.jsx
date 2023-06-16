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
import CreateCTCTab from './OnBoardTabPanels/CreateCTCTab';



export default function OnBoard() {

 
  const [value, setValue] = useState("1");

  // Tab functionality
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };


  return (
  <Box>

    <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'HRMS'}
    currentSection={'OnBoard'}
    link1={`/home`}
    link2={'/home/HRMS'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'OnBoard Informations'}/>
      </Box>
    </Container>

    {/* Table Panel */}
  
    <Container>
    <Box sx={{ p: 3 }}>
    <TabContext value={value}>
      <Box>
          <TabList
          variant="scrollable"
          scrollButtons='auto'
          onChange={handleChange} aria-label="tabs">
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#616e80', marginRight:5 }} label="Add Employee " value="1" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#616e80', marginLeft:5}} label="Create CTC " value="2" />
         <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#616e80', marginLeft:5}} label="Edit Employee " value="3" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#616e80', marginLeft:5}} label="Delete Employee " value="4" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
                <AddTab setValue={setValue} />
            </Box>
        </TabPanel>
          <TabPanel value="2">
          <Box>
            <CreateCTCTab  setValue={setValue} />
           </Box>
        </TabPanel>
        <TabPanel id='editTab' value="3">
            <Box>
                <EditTab setValue={setValue} />
                  <Outlet />
            </Box>
        </TabPanel>
        <TabPanel value="4">
            <Box>
                <DeleteTab setValue={setValue} />
            </Box>
        </TabPanel>
        </TabContext>
      </Box>
    </Container>

  














  </Box>
  )
}
