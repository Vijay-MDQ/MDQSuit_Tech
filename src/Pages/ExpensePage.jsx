import React from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container} from "@mui/material";
import Heading from '../Components/Heading';
import Breadcrumbs from '../Components/Breadcrumbs';
import { financepageControllerView, financepageEmployeeView } from '../Variables/Variables';
import { Outlet, useNavigate } from 'react-router-dom';
import IconBreadcrumbs from '../Components/Breadcrumbs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import FuelTable from '../Components/ExpensePageComps/FuelTable';
import RentalTable from '../Components/ExpensePageComps/RentalTable';
import AccomodationTable from '../Components/ExpensePageComps/AccomodationTable';
import FoodTable from '../Components/ExpensePageComps/FoodTable';
import GeneralTable from '../Components/ExpensePageComps/GeneralTable';
import OtherTable from '../Components/ExpensePageComps/OtherTable';
import WageTable from '../Components/ExpensePageComps/WageTable';
import PurchasesTable from '../Components/ExpensePageComps/PurchasesTable';
import TransportTable from '../Components/ExpensePageComps/TransportTable';
import UtilizationTable from '../Components/ExpensePageComps/UtilizationTable';
import MaintenanceTable from '../Components/ExpensePageComps/MaintenanceTable';
import TravelTable from '../Components/ExpensePageComps/TravelTable';
import SummaryTable from '../Components/ExpensePageComps/SummaryTable';
import AccountExpense from '../Components/ExpensePageComps/AccountExpense';


export default function ExpensePage() {

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
    current={'Finance'}
    link1={`/home`}
    link2={'/home/finance'}
    currentSection={'Expense'}
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'EXPENSES'}/>
      </Box>
    </Container>


    
    <Box sx={{ p: 3 }}>
    <TabContext value={value}>
      <Box>
          <TabList
          variant="scrollable"
          scrollButtons='auto'
          onChange={handleChange} aria-label="tabs">
         <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2  }} label="Account" value="1" />
         <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2  }} label="Summary" value="2" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2  }} label="Fuel" value="3" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2 }} label="Rental" value="4" />
           <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2  }} label="Travel" value="5" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2 }} label="Transport" value="6" />
           <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2  }} label="Accomodation" value="7" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2 }} label="Food" value="8" />
           <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2  }} label="Maintenance" value="9" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2 }} label="General" value="10" />
           <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2  }} label="Wages" value="11" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2 }} label="Purchases" value="12" />
           <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2  }} label="Utilization" value="13" />
          <Tab sx={{ fontSize: 17, fontWeight: 700, color: '#040404', m:2 }} label="Other" value="14" />
          </TabList>
          </Box>
         <TabPanel value="1">
            <Box>
                 <AccountExpense setValue={setValue} />
            </Box>
        </TabPanel>
           <TabPanel value="2">
            <Box>
                 <SummaryTable />
            </Box>
        </TabPanel>
          <TabPanel value="3">
            <Box>
                 <FuelTable />
            </Box>
        </TabPanel>
        <TabPanel value="4">
            <Box>
             <RentalTable />
            </Box>
        </TabPanel>
        <TabPanel value="5">
            <Box>
             <TravelTable />
            </Box>
        </TabPanel>
        <TabPanel value="6">
            <Box>
             <TransportTable />
            </Box>
        </TabPanel>
                <TabPanel value="7">
            <Box>
             <AccomodationTable />
            </Box>
        </TabPanel>
                <TabPanel value="8">
            <Box>
             <FoodTable />
            </Box>
        </TabPanel>
                <TabPanel value="9">
            <Box>
             <MaintenanceTable />
            </Box>
        </TabPanel>
                <TabPanel value="10">
            <Box>
             <GeneralTable />
            </Box>
        </TabPanel>
                <TabPanel value="11">
            <Box>
             <WageTable />
            </Box>
        </TabPanel>
                <TabPanel value="12">
            <Box>
             <PurchasesTable />
            </Box>
        </TabPanel>
                <TabPanel value="13">
            <Box>
             <UtilizationTable />
            </Box>
        </TabPanel>
          <TabPanel value="14">
            <Box>
             <OtherTable />
            </Box>
        </TabPanel>
        </TabContext>
      </Box>
  </Box>
  )
}
