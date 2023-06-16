import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import { useForm } from 'react-hook-form';
import './Hierarchy.styles.css';
import IconBreadcrumbs from '../Breadcrumbs';



export default function Hierarchy() {


  const { formState: { errors }, handleSubmit } = useForm();
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");

  return (

    <Box>

      <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'HRMS'}
    currentSection={'Hierarchy'}
    link1={`/home`}
    link2={'/home/HRMS'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'View Hierarchy'}/>
      </Box>
    </Container>

    <Container>
   <Box component={Card} p={2} bgcolor='#EDF4F4'>
      <Grid container>
      <Grid item xs={4} sm={4} md={4} lg={4}>
      <Box>
      <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee Name</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeName" 
        label="Employee Name" variant="outlined" 
        required size='small'  
        color='secondary'
        error={errors.EmployeeName ? true : false}
        helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "Employee Name is required" : ""}
        onChange={(e) => setEmployeeName(e.target.value)}
        {...("EmployeeName", { required: true })}
          
      />
        </Box>
        </Box>
         </Grid>

         <Grid item xs={4} sm={4} md={4} lg={4}>
        <Box>
        <Box py={2}>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Employee ID</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeId" 
        label="Employee ID" variant="outlined" 
        required size='small'  
        color='secondary'
        error={errors.EmployeeID ? true : false}
        helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "Employee Name is required" : ""}
        onChange={(e) => setEmployeeName(e.target.value)}
        {...("EmployeeName", { required: true })}
          
      />
        </Box>
        </Box>
        </Grid>

        <Grid item xs={4} sm={4} md={4} lg={4}>
      <Box display='flex' justifyContent='start' alignSelf='center' py={4}>
        <Button variant='contained' sx={{bgcolor:'#7bc54c', ':hover':{bgcolor:'#616e80'}}}>GET HIERARCHY</Button>
      </Box>
      </Grid>

         </Grid>
         </Box>
         </Container>


    <Box className="tree" py={3}>
	<ul>
  <li>
    <a href="#">Employee Name</a>
    <ul>
      <li>
        <a href="#">Team Lead Name</a>
        <ul>
          <li>
            <a href="#">Manager</a>
          </li><li>
            <a href="#">Assistant Manager</a>
            <ul>
              <li>
                <a href="#">President</a>
              </li><li>
                <a href="#">Vice President</a>
              </li>
            </ul>
          </li>
        </ul>
      </li><li>
        <a href="#">Team Lead Name</a>
        <ul>
          <li>
            <a href="#">Senior Manager</a>
            <ul>
              <li>
                <a href="#">Director</a>
              </li>
            </ul>
          </li><li>
            <a href="#">Manager</a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
</Box>

</Box>
  )
}
