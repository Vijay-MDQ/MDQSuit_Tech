import React from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container} from "@mui/material";
import Heading from '../Components/Heading';
import Breadcrumbs from '../Components/Breadcrumbs';
import { financepageControllerView, financepageEmployeeView } from '../Variables/Variables';
import { Outlet, useNavigate } from 'react-router-dom';
import IconBreadcrumbs from '../Components/Breadcrumbs';

export default function FinancePage() {

  const navigate = useNavigate();

  const handleClick = (path) =>{
   navigate(`${path}`)
  }

  const role = JSON.parse(localStorage.getItem('role'));

  const headingTable = role === 'Super Admin' ? financepageControllerView : financepageEmployeeView;

  return (
    <Box>
     <Box>
    <Box py={2} px={1}>

    <IconBreadcrumbs
    previous={'Home'}
    current={'Finance'}
    link1={`/home`}
    link2={'/home/finance'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Finance'}/>
      </Box>
    </Container>


    <Container>
        <Grid container>
        <Grid item sm={12} xs={12} md={12} lg={12} xl={12} display='flex' justifyContent='center'>
        <Box p={4}>
        <Grid container spacing={9} rowGap={5}>
        {
            headingTable.map((i, index)=>{
                return(
                    <Grid item sm={4} xs={4} md={4} lg={4} xl={4} display='flex' justifyContent='center' alignContent='center' >
                    <Box component='div' className="cards" p={3} justifyContent='space-between' display='flex' flexDirection='column' >
                    <Box onClick={()=>{handleClick(i.path)}}>
                    <img src={i.Icon} alt='project-icon' />
                    </Box>
                    <Box textAlign='center'>
                    <Typography fontWeight={600}>{i.name}</Typography>
                    </Box>
                     </Box>
                     </Grid>
                )
            })
        }
         </Grid>
         </Box>
        </Grid>
        </Grid>
     </Container>
     </Box>


   <Box>
    <Outlet />
   </Box>



  </Box>
  )
}
