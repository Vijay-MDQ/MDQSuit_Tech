import React from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container} from "@mui/material";
import {Homepagecardsinfo} from '../Variables/Variables';
import { useNavigate } from 'react-router-dom';
import ProjectManagerDialog from './ProjectManagerDialog';


function HomePage() {

     
  const userName = JSON.parse(localStorage.getItem('user'));
  const role = JSON.parse(localStorage.getItem('role'));
  const navigate = useNavigate();
  const handleClick = (path) =>{
   navigate(`${path}`)
  }

  const showBox = localStorage.getItem("showDialogBox");

  return (
    <Box py={2}>
    <Container>
      <Box textAlign='left'>
      <Typography variant='h6' fontWeight={500} >Welcome, {userName}</Typography>
      </Box>
    </Container>
           {
            showBox &&  <ProjectManagerDialog />
           }

  
     {/* HomePage Cards with Page Link */}

     <Container>
        <Grid container>
        <Grid item sm={12} xs={12} md={12} lg={12} xl={12} display='flex' justifyContent='center'>
        <Box p={1}>
        <Grid container spacing={2} rowGap={2} columnSpacing={5}>
        {
            Homepagecardsinfo.map((i, index)=>{
                return(
                    <Grid className='cardGrid' item sm={4} xs={6} md={4} lg={4} xl={4} display='flex' justifyContent='center' >
                    <Box component='div' className="cards" p={3} justifyContent='center' textAlign='center' display='flex' flexDirection='column' >
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
  )
}

export default HomePage
