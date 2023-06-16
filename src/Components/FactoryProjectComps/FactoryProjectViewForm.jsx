import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete, Divider} from "@mui/material";
import { Form } from 'react-bootstrap';
import SnackBar from '../SnackBar';
import IconBreadcrumbs from '../Breadcrumbs';
import Heading from '../Heading';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FactoryProjectViewForm() {
 
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state.project;


     const cancelClick = () =>{
      navigate(-1);
     }

return (
    <Box>
    <Box py={2} px={1}>
    <IconBreadcrumbs
    previous={'Home'}
    current={'Factory Project'}
    link1={`/home`}
    link2={'/home/project'}
    currentSection={'View Factory Project'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading title={'View Factory Project'}/>
      </Box>
    </Container>
       <Box p={2} sx={{ height:'90%'}} display="flex" alignItems="center" justifyContent='center'>     
            <Box sx={{ px: 5, backgroundColor: '#EDF4F4', borderRadius: '10px',mx:2, my: 4, boxShadow: 11 }}>
            <Grid container justifyContent='center' sx={{ textAlign:'left' }}  spacing={4}  >
            <Grid item lg={6} xl={6}>
              

               
                         <Box  sx={{height:'100vh', border:"1px solid black" , p:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2} ,mt:5  }} >
                         <Box sx={{ pb: 3 ,textAlign:'left' , color:'#2B878E'}}><h3>CUSTOMER DETAILS</h3></Box>
                        <Grid container justifyContent='space-evenly' spacing={2}  >
                            
                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}>
                            <Typography color='#060606' fontWeight='bold'>Customer Name</Typography>
                            <Typography variant='subtitle1' color='#616e80'>{data.CustomerName}</Typography>
                            </Grid>
                            
                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}>
                            <Typography color='#060606' fontWeight='bold'>Mobile Number</Typography>
                            <Typography variant='subtitle1' color='#616e80'>{data.MobileNum}</Typography>
                            </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <Typography color='#060606' fontWeight='bold'>Email ID</Typography>
                            <Typography variant='subtitle1' color='#616e80'>{data.Email}</Typography>
                            </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}>
                            <Typography color='#060606' fontWeight='bold'>Company Name</Typography>
                            <Typography variant='subtitle1' color='#616e80'>{data.CompanyName}</Typography>
                            </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <Typography color='#060606' fontWeight='bold'>Company Address</Typography>
                            <Typography variant='subtitle1' color='#616e80'>{data.CompanyAddress}</Typography>
                            </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={141} md={4} sx={{ py: 2 }} >
                             <Typography color='#060606' fontWeight='bold'>GST Num</Typography>
                            <Typography variant='subtitle1' color='#616e80'>{data.GST}</Typography>
                            </Grid>
                                           
                            <Grid item lg={6} sm={4} xl={4} xs={141} md={4} sx={{ py: 2 }} >
                            <Typography color='#060606' fontWeight='bold'>Service Domain</Typography>
                            <Typography variant='subtitle1' color='#616e80'>{data.Services}</Typography>
                            </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                         <Typography color='#060606' fontWeight='bold'>Project Budget</Typography>
                        <Typography variant='subtitle1' color='#616e80'>{data.ProjectBudget}</Typography>
                        </Grid>
 

                    </Grid>   
                    </Box>
                    </Grid> 
                   
                                                     {/* (project Enquiries) */}

               
                <Grid item lg={6} xl={6} >
                  
               <Box  sx={{height:'100vh', border:"1px solid black" , px:4 , pb:5 ,pt:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2},mt:5  }}>
               <Box sx={{ pb: 3 ,textAlign:'left',  color:'#2B878E' }}>
                   <h3>PROJECT DETAILS</h3>
               </Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                        <Typography color='#060606' fontWeight='bold'>Project Name</Typography>
                        <Typography variant='subtitle1' color='#616e80'>{data.ProjectName}</Typography>
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                        <Typography color='#060606' fontWeight='bold'>Project Type</Typography>
                        <Typography variant='subtitle1' color='#616e80'>{data.ProjectType}</Typography>
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                        <Typography color='#060606' fontWeight='bold'>Project Code</Typography>
                        <Typography variant='subtitle1' color='#616e80'>{data.ProjectCode}</Typography>
                        </Grid>


                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                        <Typography color='#060606' fontWeight='bold'>Project Documents</Typography>
                        <Typography variant='subtitle1' color='#616e80'>
                        <a
                        rel="noopener noreferrer"
                        href={`https://mdqualityapps.in/API/igreen_cms/UAT/factory_project/${data.ProjectDocuments}`}
                        target="_blank"
                         >
                        {data.ProjectDocuments}
                        </a>
                        </Typography>
                        </Grid>

                        <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 3 }}  >
                        <Typography color='#060606' fontWeight='bold'>Project Description</Typography>
                        <Typography variant='subtitle1' color='#616e80'>{data.ProjectDescp}</Typography>
                        </Grid>

               <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 1 }} >
                <Box sx={{textAlign:'left', color:'#2B878E'}}><h3>ADD TEAM MEMBERS</h3></Box> 
                </Grid>

                <Grid item lg={6} sm={4} xl={4} xs={4} md={4} sx={{ py: 2 }} >
                <Typography color='#060606' fontWeight='bold'>Department</Typography>
                <Typography sx={{wordBreak:'break-word'}} variant='subtitle1' color='#616e80'>{data.Department}</Typography>
                </Grid>

                <Grid item lg={6} sm={4} xl={4} xs={4} md={4} sx={{ py: 2 }} >
                <Typography color='#060606' fontWeight='bold'>Staff Selected</Typography>
                <Typography sx={{wordBreak:'break-word'}} variant='subtitle1' color='#616e80'>{data.ManagerName} ({data.ManagerId})</Typography>
                </Grid>
                    </Grid>
                    </Box>
                </Grid >

                </Grid>      

                                                           {/* {buttons}  */} 

                <Grid container justifyContent='center' sx={{ textAlign: 'center' ,mt:3 }}>
                        <Grid item lg={12} xl={12} xs={12} >
                                <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2 }}>
                                    <Box>
                                        <Button  variant="outlined" onClick={cancelClick}
                                            type='cancel'sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828' , ':hover': {  borderColor: '#c62828', color: '#000000' } }}>Cancel</Button>                                      
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

            </Box >                      

       </Box >
       </Box>
  )
}
