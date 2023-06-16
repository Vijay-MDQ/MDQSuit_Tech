import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import Heading from '../Components/Heading';
import Breadcrumbs from '../Components/Breadcrumbs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProjectSiteAssignTab from '../Components/SiteProjectComps/ProjectSiteAssignTab';
import AssignedSiteProjectsTab from '../Components/SiteProjectComps/AssignedSiteProjectsTab';




export default function SiteProjectsPage() {

 
  const [value, setValue] = useState("1");

  // Tab functionality
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

   const role = JSON.parse(localStorage.getItem('role'));

  return (
  <Box>

    <Box py={2} px={1}>
    <Breadcrumbs 
    previous={'Home'}
    current={'Site Project'}
    link1={`/home`}
    link2={'/home/siteproject'}
    currentSection={ value !== "1" ? 'Site Project Creation' : 'Assigned Site Projects'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={ value !== "1" ? 'Site Project Creation' : 'Assigned Site Projects'}/>
      </Box>
    </Container>
    

    {/* Table Panel */}
  
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
          <Tab
           sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginRight:5, }} label="Assigned Projects" value="1" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft:5}} label="Create Project"  value="2" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
                <AssignedSiteProjectsTab  />
            </Box>
        </TabPanel>
        <TabPanel value="2">
            <Box>
                <ProjectSiteAssignTab setValue={setValue} />
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
          <Tab sx={{ fontSize: 17, fontWeight: 700, color:'#040404', marginRight:5 }} label="Assigned Site Projects" value="1" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
                <AssignedSiteProjectsTab  />
            </Box>
        </TabPanel>
        </TabContext>
      </Box>
}
    </Container>

  














  </Box>
  )
}
