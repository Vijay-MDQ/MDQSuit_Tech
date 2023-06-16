import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import Heading from '../Components/Heading';
import Breadcrumbs from '../Components/Breadcrumbs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FactoryProjectAssignTab from '../Components/FactoryProjectComps/FactoryProjectAssignTab';
import AssignedFactoryProjectsTab from '../Components/FactoryProjectComps/AssignedFactoryProjectsTab';
import IconBreadcrumbs from '../Components/Breadcrumbs';
import StoreFactoryProject from '../Components/FactoryProjectComps/StoreFactoryProject';
import PurchaseTable from '../Components/FactoryProjectComps/PurchaseTable';




export default function FactoryProjectsPage() {

 
  const [value, setValue] = useState("1");

  // Tab functionality
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const role = JSON.parse(localStorage.getItem('role'));

  const roles = ['Project Manager', 'Store', 'Purchase'];


  return (
  <Box>

    <Box py={2} px={1}>
    <IconBreadcrumbs 
    previous={'Home'}
    current={'Factory Project'}
    link1={`/home`}
    link2={'/home/project'}
    currentSection={ value !== "1" ? 'Factory Projects Creation' : 'Assigned Factory Projects' }
    
    />
    </Box>

    <Container>
        {
    role === 'Super Admin' ?
      <Box py={3}>
      <Heading  title={ value !== "1" ? 'Factory Projects Creation' : 'Assigned Factory Projects' }/>
      </Box> 
      :
      <Box py={3}>
      <Heading  title={'Your Factory Projects'}/>
      </Box> 
     }
    </Container>

    
      <Container>
        <Box sx={{ p: 3 }}>
          <TabContext value={value}>
            <TabList variant="scrollable" scrollButtons="auto" onChange={handleChange} aria-label="tabs">
              <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginRight: 5 }} label="Assigned Projects" value="1" />
              {role === 'Super Admin' && (
                <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft: 5 }} label="Project Creation" value="2" />
              )}
              {roles.includes(role) && (
                [
                  role === 'Store' && (
                    <Tab key="store" sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft: 5 }} label="Store" value="2" />
                  ),
                  role === 'Purchase' && (
                    <Tab key="purchase" sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft: 5 }} label="Purchase" value="3" />
                  )
                ]
              )}
            </TabList>
            <TabPanel value="1">
              <Box>
                <AssignedFactoryProjectsTab />
              </Box>
            </TabPanel>
            {role === 'Super Admin' && (
              <TabPanel value="2">
                <Box>
                  <FactoryProjectAssignTab setValue={setValue} />
                </Box>
              </TabPanel>
            )}
            {role === 'Store' && (
              <TabPanel value="2">
                <Box>
                  <StoreFactoryProject setValue={setValue} />
                </Box>
              </TabPanel>
            )}
            {role === 'Purchase' && (
              <TabPanel value="3">
                <Box>
                  <PurchaseTable setValue={setValue} />
                </Box>
              </TabPanel>
            )}
          </TabContext>
        </Box>
      </Container>

  </Box>
  )
}
