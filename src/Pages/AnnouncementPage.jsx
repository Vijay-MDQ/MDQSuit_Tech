import React,{ useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Divider} from "@mui/material";
import Heading from '../Components/Heading';
import Breadcrumbs from '../Components/Breadcrumbs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SeeAllEvent from '../Components/AnnouncementComps/Admin_Announcement/SeeAllEvent';
import CreateEvent from '../Components/AnnouncementComps/Admin_Announcement/CreateEvent';

export default function AnnouncementPage() {

    const userName = JSON.parse(localStorage.getItem('user'));
    const role = JSON.parse(localStorage.getItem('role'));

      const [value, setValue] = useState("1");

  // Tab functionality
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  return (
    <Box>

    <Box py={2} px={1}>
    <Breadcrumbs 
    previous={'Home'}
    current={'Announcement'}
    link1={`/home`}
    link2={'/home/announcement'}
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Announcement'}/>
      </Box>
    </Container>


        {
    role !== 'Super Admin' ?

    <SeeAllEvent />
  :
 <Container>
    {/*Table Panel */}

    <Box >
    <TabContext value={value}>
      <Box>
          <TabList
          variant="scrollable"
          scrollButtons='auto'
          onChange={handleChange} aria-label="tabs">
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginRight:5 }} label="Create Event" value="1" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', marginLeft:5}} label="See All Events" value="2" />
          </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
             <CreateEvent />
            </Box>
        </TabPanel>
        <TabPanel value="2">
            <Box>
            <SeeAllEvent />
            </Box>
        </TabPanel>
        </TabContext>
      </Box>
    </Container>

        }





  </Box>
  )
}
